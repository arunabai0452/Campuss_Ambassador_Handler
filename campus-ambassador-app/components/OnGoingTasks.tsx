"use client";
import React, { useRef } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { StarIcon, TaskIcon } from "./icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TimerIcon } from "./icons";
import "swiper/css";
import "swiper/css/navigation";

export default function OnGoingTasks() {
    const swiperRef = useRef<any>(null);

    const taskInfo = [{
        "name": "Refer Three Friends",
        "imageURL": "https://www.engineering.iastate.edu/people/files/2024/11/Anuj_photo_square_1.jpg",
        "Deadline": 3,
    }, {
        "name": "Post a video about any topic",
        "imageURL": "https://www.engineering.iastate.edu/people/files/2024/11/Anuj_photo_square_1.jpg",
        "Deadline": 2,
    }, {
        "name": "Conduct survive about Coltie app",
        "imageURL": "https://www.engineering.iastate.edu/people/files/2024/11/Anuj_photo_square_1.jpg",
        "Deadline": 1,
    }, {
        "name": "One Medium Post",
        "imageURL": "https://www.engineering.iastate.edu/people/files/2024/11/Anuj_photo_square_1.jpg",
        "Deadline": 2,
    }];

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
                {taskInfo.map((task, index) => (
                    <SwiperSlide key={index} className="bg-white mt-2 mb-2 shadow-none">
                        <Card key={index} className="max-w-[600px] px-4 py-4 pr-20 shadow-sm border">
                            <CardHeader className="flex flex-col gap-2 items-start w-[280px]">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="https://static.wixstatic.com/media/6196da_de1d2447e2c94d8fba9c6944ef5726c4~mv2.jpg/v1/fill/w_420,h_194,fp_0.48_0.30,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Faculty2.jpg"
                                    width={500}
                                    isZoomed
                                    height={150}
                                />
                                <p className="text-sm">{task.name}</p>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400 flex-row gap-6 py-4">
                                <div className="flex items-center gap-1">
                                    <TimerIcon size={14} />
                                    <p className="text-sm py-8">1 Hour</p>
                                </div>
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );

}
