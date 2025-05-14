"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@heroui/react";
import { Form } from "@heroui/react";
import { Input } from "@heroui/react";
import { GoogleIcon, AppleIcon } from "./icons";
import { getAccessToken, handleSignIn, handleSocialLogin } from "@/lib/authHandlers";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { getUserInfo } from "@/lib/accessHandler";
import { fetchUserInfo } from "@/services/api/apiService";
import { useInviteStore } from "@/stores/useInviteStore";
import { returnErrorMessage } from "@/utils/returnErrorMessage";
import { useAmbassadorStore } from "@/stores/useAmbassadorStore";

const formSchema = z.object({
    email: z.string().min(1, { message: "Can't be empty!" }).email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, { message: "Can't be empty!" })
        .max(32, { message: "Must be 32 or fewer characters long" }),
});

export default function Login({ cookieInvitedToken }: { cookieInvitedToken?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>("Role");
    const [loading, setLoading] = useState(false);
    const [isTransiting, setIsTransiting] = useState(true);
    const router = useRouter();
    const { inviteToken, invitedEmail } = useInviteStore();
    const { setUser } = useAmbassadorStore();

    const handleSelect = (key) => {
        setSelectedRole(key);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: invitedEmail || "",
            password: "",
        },
    });

    const handleSignOut = useCallback(async () => {
        try {
            await signOut({ global: false, oauth: { redirectUrl: "#" } });
        } catch (error) {
            console.warn("Ignore Warning: Sign out failed", error);
        }
    }, []);

    const getUser = useCallback(async () => {
        try {
            const user = await fetchUserInfo();
            const token = await getAccessToken();
            let connectDBInfo = {};
            if(selectedRole === "Ambassador"){
                connectDBInfo = await getUserInfo(user.data.id, "ambassador");
            } else if (selectedRole === "Admin") {
                connectDBInfo = await getUserInfo(user.data.id , "admin");
            }
            if (connectDBInfo?.id === "") {
                await handleSignOut();
                setIsTransiting(false);
                throw new Error("You are not allowed to access this portal. Contact info@coltie.com");
            }
            setUser({ ...connectDBInfo })
            if (token) {
                router.push(`/dashboard?userId=${user.data.id}&role=ambassador`);
            }
        } catch (error) {
            await handleSignOut();
            setIsTransiting(false);
            setServerError(returnErrorMessage(error));
            setLoading(false);
        }
    }, [handleSignOut, inviteToken, cookieInvitedToken, router]);

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            setLoading(true);
            setIsTransiting(true);
            setServerError(null);
            try {
                await handleSignIn(values);
                await getUser();
                form.reset();
            } catch (error) {
                setServerError(returnErrorMessage(error));
                setIsTransiting(false);
                setLoading(false);
            }
        },
        [getUser]
    );

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            if (payload.event === "signedIn") {
                setIsTransiting(true)
                getUser()
            }
        })
        return () => unsubscribe()
    }, [getUser])

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <div className="container w-full max-w-xl p-6 bg-white rounded-lg shadow-md transform -translate-y-10">
                <div className="flex items-center justify-center w-full p-5 relative">
                    <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
                        Campus Connect
                    </h1>
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                </div>
                <div className="flex justify-end w-full">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered">{selectedRole}</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" onAction={handleSelect} align="end">
                            <DropdownItem key="Ambassador">Ambassador</DropdownItem>
                            <DropdownItem key="Admin">Admin</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Form
                    className="w-full max-w-xl flex flex-col gap-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Input
                        isRequired
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter your email"
                        type="email"
                        {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                    )}

                    <Input
                        isRequired
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        type="password"
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                    )}

                    <div className="flex gap-2 w-full">
                        <Button className="bg-black text-white px-6 py-3 w-full hover:bg-gray-800" type="submit" isLoading={loading}>
                            Login
                        </Button>
                    </div>
                    {/* Social login options */}
                    <div className="flex flex-col gap-4 py-3">
                        <h3 className="font-bold">Sign in using Google or Apple</h3>
                        <div className="flex gap-6">
                            <Button
                                onClick={() => {
                                    handleSocialLogin("Google")
                                    setIsTransiting(true)
                                }}
                                      isIconOnly
                                      aria-label="Like"
                                    className="size-10 cursor-pointer rounded-full bg-transparent p-0"
                                    >
                                      <GoogleIcon />
                                    </Button>
                        
                            <Button
                                onClick={() => {
                                    handleSocialLogin("Apple")
                                    setIsTransiting(true)
                                }}
                                isIconOnly
                                aria-label="Like"
                                className="size-10 cursor-pointer rounded-full bg-transparent p-0"
                            >
                                <AppleIcon size={40} />
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}