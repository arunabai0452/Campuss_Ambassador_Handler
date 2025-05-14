"use client"
import React, { useEffect, useState } from "react";
import ColtieConnect from "@/components/userComponents/ColtieConnect";
import ScoreCard from "@/components/userComponents/ScoreCard";
import ActivityGraph from "@/components/userComponents/ActivityGraph";
import TopScorers from "@/components/userComponents/TopScorers";
import OnGoingTasks from "@/components/userComponents/OnGoingTasks";
import { TaskInfo } from "@/types/taskInfoTypes";
import { PersonInfo } from "@/types/userInfoTypes";


export default function Dashboard({ role, taskState, personInfo, topPerformers }: { role: string, taskState: TaskInfo[], personInfo: PersonInfo, topPerformers: PersonInfo[] }) {
    const [completionRate, setCompletionRate] = useState<number>(0);
    const [onGoingTasks, setOnGoingTasks] = useState<TaskInfo[] | []>([]);
  const { pointsEarned, completedTasks, currentTasks } = personInfo || {};
    useEffect(() => { 
        setCompletionRate((completedTasks?.length || 0) / (taskState.length || 0) * 100) 
        if(role==="admin"){
          setOnGoingTasks(taskState);
        } else {
        setOnGoingTasks(taskState.filter(task=> currentTasks?.includes(task?.taskId)))
        }
    },[taskState, completedTasks, currentTasks])

  return (
      <section className="flex flex-col">
        <>
        {role === "ambassador" && (
        <div className="flex flex-col sm:flex-row gap-6 h-full sm:h-[15rem]">
            <ColtieConnect />
                <ScoreCard
                pointsEarned={pointsEarned || 0}
                completedTaskLen={completedTasks?.length || 0}
                completionRate={completionRate}
            />
            <ActivityGraph completedTasksInfo={completedTasks}/>
        </div>
        )}
        <TopScorers topPerformers={topPerformers} />
        <OnGoingTasks onGoingTasks={onGoingTasks}/>
      </>
      </section>
  );
}
