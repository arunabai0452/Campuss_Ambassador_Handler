"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import EventDetails from "@/components/userComponents/EventDetails";
import Dashboard from "@/pages/Dashboard";
import { UserInfoData } from "@/types/userInfoTypes";
import { fetchUserInfo } from "@/services/api/apiService";
import { PersonInfo } from "@/types/userInfoTypes";
import { getUserInfo, validateUserInfo } from "@/lib/accessHandler";
import clsx from "clsx";
import UserDetails from "@/pages/UserDetails";

export default function AddUserPage() {
    const [userInfo, setUserInfo] = useState<UserInfoData | {}>({});
    const [personInfo, setPersonInfo] = useState<PersonInfo>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams?.get("userId");
    const role = searchParams?.get("role");
    const fetchData = async () => {
        const validUser = await validateUserInfo(userId, role);
        if (!validUser) {
            router.push('/auth/login');
        } else {
            const user = await fetchUserInfo();
            const personDetails = await getUserInfo(userId, role)
            setUserInfo(user);
            setPersonInfo(personDetails)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="relative flex flex-grow h-full flex-col sm:flex-row">
            {/* First Column (2/3 of the screen) */}
            <div className={clsx("relative flex flex-col w-full", `sm:w-[${role === 'admin' ? '100%' : '70%'}]`)}>
                <Navbar
                    firstName={personInfo?.firstName || ""}
                    lastName={personInfo?.lastName || ""}
                    profileImageURL={userInfo?.data?.profileImage || null}
                />
                <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                    <UserDetails/>
                </main>
            </div>
        </div>
    );
}

