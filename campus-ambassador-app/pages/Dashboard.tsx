"use client"
import React, { useEffect, useState } from "react";

import ColtieConnect from "@/components/ColtieConnect";
import ScoreCard from "@/components/ScoreCard";
import ActivityGraph from "@/components/ActivityGraph";
import TopScorers from "@/components/TopScorers";
import OnGoingTasks from "@/components/OnGoingTasks";
import { TaskInfo } from "@/types/taskInfoTypes";
import { UserInfoData } from "@/types/userInfoTypes";
import { useAmbassadorStore } from "@/stores/useAmbassadorStore";
import { AmbassadorInfo } from "@/types/userInfoTypes";


export default function Dashboard({ taskState, userInfo, ambassadorInfo, topPerformers }: { taskState: TaskInfo[], userInfo: UserInfoData, ambassadorInfo: AmbassadorInfo, topPerformers: AmbassadorInfo[] }) {
    const [completionRate, setCompletionRate] = useState<number>(0);
    const [onGoingTasks, setOnGoingTasks] = useState<TaskInfo[] | []>([]);
    const { pointsEarned, completedTasks, currentTasks } = ambassadorInfo || {};
    console.log("wah taj",topPerformers)
    useEffect(() => { 
        setCompletionRate((completedTasks?.length || 0) / (taskState.length || 0) * 100) 
        setOnGoingTasks(taskState.filter(task=> currentTasks?.includes(task?.taskId)))
    },[taskState, completedTasks, currentTasks])

  return (
      <section className="flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 h-full sm:h-[15rem]">
              <ColtieConnect />
                <ScoreCard
                pointsEarned={pointsEarned || 0}
                completedTaskLen={completedTasks?.length || 0}
                completionRate={completionRate}
            />
              <ActivityGraph completedTasksInfo={completedTasks}/>
          </div>
          <TopScorers topPerformers={topPerformers} />
          <OnGoingTasks onGoingTasks={onGoingTasks}/>
      </section>
  );
}
