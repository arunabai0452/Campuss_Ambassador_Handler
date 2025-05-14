import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { TimerIcon } from "@/components/icons";
import { TaskInfo } from "@/types/taskInfoTypes";
import TimeDifference from "../TimeDifference";

export default function EventDetails({ taskState }: { taskState: TaskInfo[]}) {
    const [taskInDate, setTaskInDate] = useState<TaskInfo[]>();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDateToYYYYMMDD = (date : any) => {
        return date.toISOString().split('T')[0];
    }
    useEffect(()=>{
        const filteredTask = taskState?.filter(task => {
            const apiFormattedDate = formatDateToYYYYMMDD(new Date(task.addedDate));
            return apiFormattedDate === formatDateToYYYYMMDD(selectedDate);
        })
        setTaskInDate(filteredTask)
    },[selectedDate]);
    return (
        <div className="flex flex-col gap-8">
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <Card className="w-full max-w-xl sm:max-w-sm p-4 shadow-md">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-sm">Task today</p>
                </CardHeader>
                {taskInDate?.map((task) => (
                <CardBody key={task.taskId} className="overflow-visible">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={task?.image}
                        width={400}
                        isZoomed
                        height={150}
                    />
                    <p className="text-sm py-8">{task.taskName}</p>
                    <div className="flex items-center gap-1">
                        <TimerIcon size={14} />
                        <TimeDifference addedTime={task.addedDate} expiryTime={task.taskExpiry}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-md font-bold">Task Details</h2>
                        <ol>
                            {task?.taskDetails?.map((task, index) => (
                            <div className="flex gap-1 items-center" key={index + 'div'}>
                                <span className="text-sm bg-gray-300 rounded-t-3xl rounded-b-3xl w-8 h-12 flex justify-center items-center px-4" key={index + 1}>{index + 1}</span>
                                <li className="text-sm py-2" key={index}>{task}</li>
                            </div>
                        ))}
                        </ol>

                    </div>
                </CardBody>
                ))}
              
            </Card>
        </div>
    );
}