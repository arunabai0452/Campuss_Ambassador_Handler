"use client"
import React, {useEffect, useState} from "react";
import { Navbar } from "@/components/navbar";
import EventDetails from "@/components/EventDetails";
import Dashboard from "@/pages/Dashboard";
import { UserInfoData } from "@/types/userInfoTypes";
import { TaskInfo } from "@/types/taskInfoTypes";
import { fetchUserInfo } from "@/services/api/apiService";
import { AmbassadorInfo } from "@/types/userInfoTypes";
import { getTaskInfo, getUserInfo, getTopPerformers } from "@/lib/accessHandler";

export default function DashboardPage() {
    const [userInfo, setUserInfo] = useState<UserInfoData | {}>({});
    const [ambassadorInfo, setAmbassadorInfo] = useState<AmbassadorInfo>();
    const [topPerformers, setTopPerformers] = useState<AmbassadorInfo[] | []>([]);
    const [taskState, setTaskInfo] = useState<TaskInfo[] | [] >([]);

    const fetchData = async () => {
        const user = await fetchUserInfo();
        const taskDetails = await getTaskInfo();
        const ambassadorDetails = await getUserInfo(user.data.email)
        const topPerformersDetails = await getTopPerformers();
        setUserInfo(user);
        setTaskInfo(taskDetails);
        setAmbassadorInfo(ambassadorDetails)
        setTopPerformers(topPerformersDetails)
    };
    
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="relative flex flex-grow h-full flex-col sm:flex-row">
            {/* First Column (2/3 of the screen) */}
            <div className="relative flex flex-col w-full sm:w-[70%]">
        <Navbar
          firstName={ambassadorInfo?.firstName || ""}
          lastName={ambassadorInfo?.lastName || ""}
          profileImageURL={userInfo?.data?.profileImage || null}
          />
                <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                    <Dashboard userInfo={userInfo} taskState={taskState} ambassadorInfo={ambassadorInfo} topPerformers={topPerformers}/>
                </main>
            </div>

            {/* Second Column (1/3 of the screen) */}
            <div className="w-full sm:w-[30%] bg-gray-100 p-6">
              <EventDetails taskState={taskState}/>
            </div>
        </div>
  );
}

