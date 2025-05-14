"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import EventDetails from "@/components/userComponents/EventDetails";
import Dashboard from "@/pages/Dashboard";
import { UserInfoData } from "@/types/userInfoTypes";
import { TaskInfo } from "@/types/taskInfoTypes";
import { fetchUserInfo } from "@/services/api/apiService";
import { PersonInfo } from "@/types/userInfoTypes";
import { getTaskInfo, getUserInfo, getTopPerformers, validateUserInfo } from "@/lib/accessHandler";
import clsx from "clsx";

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<UserInfoData | {}>({});
  const [personInfo, setPersonInfo] = useState<PersonInfo>();
  const [topPerformers, setTopPerformers] = useState<PersonInfo[] | []>([]);
  const [taskState, setTaskInfo] = useState<TaskInfo[] | []>([]);
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
      const taskDetails = await getTaskInfo();
      const personDetails = await getUserInfo(userId, role)
      const topPerformersDetails = await getTopPerformers();
      setUserInfo(user);
      setTaskInfo(taskDetails);
      setPersonInfo(personDetails)
      setTopPerformers(topPerformersDetails)
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
          <Dashboard role={role} userInfo={userInfo} taskState={taskState} personInfo={personInfo} topPerformers={topPerformers} />
        </main>
      </div>

      {/* Second Column (1/3 of the screen) */}
      {role === "ambassador" && (
        <div className="w-full sm:w-[30%] bg-gray-100 p-6">
          <EventDetails taskState={taskState} />
        </div>)}
    </div>
  );
}

