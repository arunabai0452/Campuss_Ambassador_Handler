"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from "@heroui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot, CartesianGrid } from 'recharts';
import { Select, SelectItem } from "@heroui/select";

const data = {
    weekly: [
        { day: 'S', tasks: 1 },
        { day: 'M', tasks: 2 },
        { day: 'T', tasks: 0 },
        { day: 'W', tasks: 2 },
        { day: 'T', tasks: 1 },
        { day: 'F', tasks: 2 },
        { day: 'S', tasks: 2 },
    ],
    monthly: [
        { day: 'Week 1', tasks: 10 },
        { day: 'Week 2', tasks: 15 },
        { day: 'Week 3', tasks: 20 },
        { day: 'Week 4', tasks: 18 },
    ]
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

export default function ActivityGraph() {
    const [timeframe, setTimeframe] = useState('weekly');

    const handleDotClick = (tasks) => {
        alert(`${tasks} Task`);
    };

    return (
        <Card className= "rounded-xl shadow-lg bg-white w-full sm:w-[50%] bg-[#F5F5F7]" >
            <CardHeader className="flex justify-between">
                <h2 className="text-lg font-semibold">Activity</h2>
                <Select className="w-[40%] sm:w-[30%] h-10" placeholder={timeframe==="weekly" ? "This Week" : "This Month"} onChange={(e) => setTimeframe(e.target.value)}>
                    <SelectItem key={"weekly"}>This Week</SelectItem>
                    <SelectItem key={"monthly"}>This Month</SelectItem>
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
        </Card >

    );
}
