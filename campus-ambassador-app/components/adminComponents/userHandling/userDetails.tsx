"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { getUsersInfo, getTaskInfo } from "@/lib/accessHandler";
import { PersonInfo } from "@/types/userInfoTypes";
import { TaskInfo } from "@/types/taskInfoTypes";
import ColtieConnect from "@/components/userComponents/ColtieConnect";
import ScoreCard from "@/components/userComponents/ScoreCard";
import ActivityGraph from "@/components/userComponents/ActivityGraph";
import OnGoingTasks from "@/components/userComponents/OnGoingTasks";

export default function UserInfo() {
    const [selectedUser, setSelectedUser] = useState<string>("Select a User");
    const [selectedPerson, setSelectedPerson] = useState<PersonInfo | null>(null);
    const [taskState, setTaskInfo] = useState<TaskInfo[]>([]);
    const [usersInfo, setUsersInfo] = useState<PersonInfo[]>([]);
    const [onGoingTasks, setOnGoingTasks] = useState<TaskInfo[]>([]);
    const [completionRate, setCompletionRate] = useState<number>(0);

    const fetchData = async () => {
        try {
            const usersDetails = await getUsersInfo();
            const taskDetails = await getTaskInfo();
            setUsersInfo(usersDetails);
            setTaskInfo(taskDetails);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedPerson) return;
        const completedCount = selectedPerson.completedTasks?.length || 0;
        const totalTasks = taskState.length || 1; // Avoid division by zero
        setCompletionRate((completedCount / totalTasks) * 100);

        setOnGoingTasks(taskState.filter(task => selectedPerson.currentTasks?.includes(task.taskId)));
    }, [taskState, selectedPerson]);

    const handleNav = (userId: string) => {
        const foundUser = usersInfo.find(user => user.userId === userId);
        if (foundUser) {
            setSelectedUser(`${foundUser.firstName} ${foundUser.lastName}`);
            setSelectedPerson(foundUser);
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-4xl p-6 bg-white h-full rounded-lg shadow-md">
                {/* Dropdown for User Selection */}
                <div className="flex items-start w-full p-5 relative">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" className="w-64 text-left">
                                {selectedUser}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Select User" onAction={(key) => handleNav(key as string)} align="end">
                            {usersInfo.length > 0 && usersInfo.map((user) => (
                                <DropdownItem key={user.userId}>{user.firstName} {user.lastName}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* User Details Section */}
                {selectedPerson && (
                    <section className="flex flex-col mt-6">
                        <div className="flex flex-col sm:flex-row gap-6 h-full sm:h-[15rem]">
                            <ColtieConnect />
                            <ScoreCard
                                pointsEarned={selectedPerson.pointsEarned || 0}
                                completedTaskLen={selectedPerson.completedTasks?.length || 0}
                                completionRate={completionRate}
                            />
                            <ActivityGraph completedTasksInfo={selectedPerson.completedTasks} />
                        </div>
                        <OnGoingTasks onGoingTasks={onGoingTasks} />
                    </section>
                )}
            </div>
        </div>
    );
}
