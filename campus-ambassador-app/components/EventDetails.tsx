import React from "react";
import DatePicker from "./DatePicker";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { TimerIcon } from "@/components/icons";

export default function EventDetails() {

    const taskDetails = ["Discuss Coltie’s mission, goals, and future expansion", "Recognize top ambassadors and announce incentives.", "Open discussions, Q&A, and idea sharing."];

    return (
     <div className="flex flex-col gap-8">
        <DatePicker />
            <Card className="w-full max-w-xl sm:max-w-sm p-4 shadow-md">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-sm">Task today</p>
            </CardHeader>
            <CardBody className="overflow-visible">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://static.wixstatic.com/media/6196da_de1d2447e2c94d8fba9c6944ef5726c4~mv2.jpg/v1/fill/w_420,h_194,fp_0.48_0.30,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Faculty2.jpg"
                    width={400}
                    isZoomed
                    height={150}
                />
                <p className="text-sm py-8">Attend Coltie Meeting</p>
                <div className="flex items-center gap-1">
                    <TimerIcon size={14} />
                    <p className="text-sm py-8">1 Hour</p>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-md font-bold">Task Details</h2>
                    <ol>
                        {taskDetails.map((task, index) => (
                            <div className="flex gap-1 items-center" key={index+'div'}>
                                <span className="text-sm bg-gray-300 rounded-t-3xl rounded-b-3xl w-8 h-12 flex justify-center items-center px-4" key={index+1}>{index+1}</span>
                                <li className="text-sm py-2" key={index}>{task}</li>
                            </div>
                        ))}
                    </ol>

                </div>
            </CardBody>
        </Card>
     </div>
    );
}