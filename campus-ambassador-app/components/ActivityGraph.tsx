"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from "@heroui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot, CartesianGrid } from 'recharts';
import { Select, SelectItem } from "@heroui/select";

interface CompletedTaskInfo {
    taskId: string | null;
    completionTime: string | null;
}

const groupTasksByWeek = (tasks: CompletedTaskInfo[]) => {
    const weeklyData = { S: 0, M: 0, T: 0, W: 0, T2: 0, F: 0, S2: 0 };

    tasks?.forEach(task => {
        if (task.completionTime) {
            const date = new Date(task.completionTime);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
            if (weeklyData[day] !== undefined) weeklyData[day] += 1;
        }
    });

    return Object.entries(weeklyData).map(([day, tasks]) => ({ day, tasks }));
};

const groupTasksByMonth = (tasks: CompletedTaskInfo[]) => {
    const monthlyData = { 'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0 };

    tasks?.forEach(task => {
        if (task.completionTime) {
            const date = new Date(task.completionTime);
            const week = `Week ${Math.ceil(date.getDate() / 7)}`;
            if (monthlyData[week] !== undefined) monthlyData[week] += 1;
        }
    });

    return Object.entries(monthlyData).map(([week, tasks]) => ({ day: week, tasks }));
};

function CustomDot({ cx, cy, payload, onClick }) {
    return (
        <Dot
            cx={cx}
            cy={cy}
            r={5}
            stroke="#3b82f6"
            strokeWidth={2}
            fill="white"
            onClick={() => onClick(payload.tasks)}
        />
    );
}

export default function ActivityGraph({ completedTasksInfo }: { completedTasksInfo: CompletedTaskInfo[] }) {
    const [timeframe, setTimeframe] = useState('weekly');

    const data = {
        weekly: groupTasksByWeek(completedTasksInfo),
        monthly: groupTasksByMonth(completedTasksInfo)
    };

    const handleDotClick = (tasks) => {
        alert(`${tasks} Task`);
    };

    return (
        <Card className="rounded-xl shadow-lg bg-white w-full sm:w-[50%] bg-[#F5F5F7]">
            <CardHeader className="flex justify-between">
                <h2 className="text-lg font-semibold">Activity</h2>
                <Select className="w-[40%] sm:w-[30%] h-10" placeholder={timeframe === "weekly" ? "This Week" : "This Month"} onChange={(e) => setTimeframe(e.target.value)}>
                    <SelectItem key="weekly">This Week</SelectItem>
                    <SelectItem key="monthly">This Month</SelectItem>
                </Select>
            </CardHeader>
            <CardBody className="overflow-visible">
                <ResponsiveContainer className="pr-10 pt-2 bg-white rounded-lg" width="100%" height={150}>
                    <LineChart data={data[timeframe]}>
                        <XAxis dataKey="day" />
                        <YAxis allowDecimals={false} />
                        <CartesianGrid />
                        <Tooltip content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-black text-white text-sm px-2 py-1 rounded">
                                        {`${payload[0].value} Task${payload[0].value > 1 ? 's' : ''}`}
                                    </div>
                                );
                            }
                            return null;
                        }} />
                        <Line
                            type="monotone"
                            dataKey="tasks"
                            stroke="#000"
                            strokeWidth={2}
                            dot={<CustomDot cx payload cy onClick={handleDotClick} />}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
}
