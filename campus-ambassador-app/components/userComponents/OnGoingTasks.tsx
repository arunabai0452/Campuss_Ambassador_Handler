"use client";
import React, { useRef } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { StarIcon, TaskIcon } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TaskInfo } from "@/types/taskInfoTypes";
import TimeDifference from "../TimeDifference";
import { TimerIcon } from "../icons";
import "swiper/css";
import "swiper/css/navigation";

export default function OnGoingTasks({onGoingTasks}:{ onGoingTasks: TaskInfo[]}) {
    const swiperRef = useRef<any>(null);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl py-6 font-semibold">Ongoing Tasks</h2>
                <div className="flex flex-end gap-2">
                    <Button
                        isIconOnly
                        variant="light"
                        onClick={() => swiperRef.current.swiper.slidePrev()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button isIconOnly variant="light" onClick={() => swiperRef.current.swiper.slideNext()}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <Swiper
                modules={[Navigation]}
                ref={swiperRef}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 40
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    }
                }}
                spaceBetween={10}
                className="w-full overflow-visible h-[23rem]"
                slidesPerView={3}
                navigation
            >
                {onGoingTasks.map((task, index) => (
                    <SwiperSlide key={index} className="bg-white mt-2 mb-2 shadow-none">
                        <Card key={index} className="max-w-[350px] px-4 py-4 pr-20 shadow-sm border">
                            <CardHeader className="flex flex-col gap-2 items-start w-[250px]">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={task.image}
                                    width={500}
                                    isZoomed
                                    height={150}
                                />
                                <p className="text-sm">{task.taskName}</p>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400 flex-row gap-6 py-4">
                                <div className="flex items-center gap-1">
                                    <TimerIcon size={14} />
                                    <TimeDifference addedTime={task.addedDate} expiryTime={task.taskExpiry}/>
                                </div>
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );

}
