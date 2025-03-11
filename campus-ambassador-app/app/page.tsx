import React from "react";
import ColtieConnect from "@/components/ColtieConnect";
import ScoreCard from "@/components/ScoreCard";
import ActivityGraph from "@/components/ActivityGraph";
import TopScorers from "@/components/TopScorers";
import OnGoingTasks from "@/components/OnGoingTasks";


export default function Home() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-6 h-full sm:h-[15rem]">
        <ColtieConnect />
        <ScoreCard />
        <ActivityGraph />
      </div>
      <TopScorers />
      <OnGoingTasks/>
    </section>
  );
}
