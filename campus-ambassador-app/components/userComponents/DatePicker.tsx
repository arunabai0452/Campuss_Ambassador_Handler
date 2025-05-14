"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay } from "date-fns";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WeekDatePicker = ({ selectedDate, setSelectedDate } : {selectedDate: Date, setSelectedDate: (date: Date) => void}) => {

    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 })); // Sunday as start

    const generateWeekDays = () => {
        return Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
    };

    return (
        <Card className="w-full max-w-sm p-4 shadow-md">
            <CardHeader className="flex justify-between items-center">
                <Button
                    isIconOnly
                    variant="light"
                    onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                >
                    <ChevronLeft />
                </Button>
                <h2 className="text-sm font-semibold">{format(currentWeek, "MMMM yyyy")}</h2>
                <Button isIconOnly variant="light" onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
                    <ChevronRight />
                </Button>
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    {generateWeekDays().map((day, index) => {
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                            <button
                                key={index}
                                className="flex flex-col items-center p-2 w-12"
                                onClick={() => setSelectedDate(day)}
                            >
                                <div
                                    className={`w-12 px-2 py-1 flex flex-col items-center justify-center gap-3
                    ${isSelected ? "bg-black text-white rounded-t-3xl rounded-b-3xl" : "text-black"}`}
                                >
                                    <span className="text-sm">{format(day, "E").charAt(0)}</span>
                                    <span
                                        className={`text-sm ${isSelected ? "text-white" : "text-black"
                                            } ${isSelected ? "bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full" : "bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center"}`}
                                    >
                                        {format(day, "d")}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </CardBody>
        </Card>
    );
};

export default WeekDatePicker;
