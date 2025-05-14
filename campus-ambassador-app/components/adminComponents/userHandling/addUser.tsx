"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button, Input, Form } from "@heroui/react";

const formSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required!" }),
    firstName: z.string().min(1, { message: "First Name is required!" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required!" }),
});

export default function UserForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setServerError(null);

        try {
            console.log("Form submitted with values:", values);
            form.reset();
        } catch (error) {
            setServerError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-1/2 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center w-full p-5 relative">
                    <h1 className="text-2xl font-bold">User Registration</h1>
                    {serverError && <p className="text-red-500 text-sm absolute top-14">{serverError}</p>}
                </div>

                <Form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <Input label="User ID" placeholder="Enter User ID" {...form.register("userId")} isRequired />
                    {form.formState.errors.userId && (
                        <p className="text-red-500 text-sm">{form.formState.errors.userId.message}</p>
                    )}

                    <Input label="First Name" placeholder="Enter First Name" {...form.register("firstName")} isRequired />
                    {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>
                    )}

                    <Input label="Middle Name" placeholder="Enter Middle Name (Optional)" {...form.register("middleName")} />

                    <Input label="Last Name" placeholder="Enter Last Name" {...form.register("lastName")} isRequired />
                    {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>
                    )}

                    <Input label="Email" placeholder="Enter Email" type="email" {...form.register("email")} isRequired />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                    )}

                    <Button className="bg-black text-white px-6 py-3 w-full hover:bg-gray-800" type="submit" isLoading={loading}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
