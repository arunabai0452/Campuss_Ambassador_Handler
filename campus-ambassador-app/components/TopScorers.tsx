"use client";
import React,{useRef} from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { StarIcon, TaskIcon } from "./icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function TopScorers() {
    const swiperRef = useRef<any>(null);

    const topScorersInfo = [{
        "name": "Anuj Sharma",
        "imageURL": "https://www.engineering.iastate.edu/people/files/2024/11/Anuj_photo_square_1.jpg",
        "points": 100,
        "role": "Frontend Developer",
        "tasks": 80,
    }, {
        "name": "Zoey Lang",
        "imageURL": "/",
        "points": 80,
        "role": "ML Developer",
        "tasks": 80,
    }, {
        "name": "Arun kumar",
        "imageURL": "https://media.licdn.com/dms/image/v2/D5635AQG__Q5i8zZ6nw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1723666217203?e=1742140800&v=beta&t=FCJv1fvnrsGE6_ZSbdYRcCFFWeBqJLsdVRyqcADR9Iw",
        "points": 70,
        "role": "UI Developer",
        "tasks": 60,
        }, {
            "name": "Elon musk",
           "imageURL": "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcS2CHe7B3Ca4IP1HBjFALkqkeU43BjeDYAtGuP32PxP2XPSZWnByb0xArOAOEdP5lcykP_lUkxAM4HUkK8",
            "points": 0,
            "role": "Rocket Engineer",
            "tasks": 0,
        }];

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl py-6 font-semibold">Top Scorers</h2>
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
                breakpoints= {{
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
                className="w-full h-[10rem] flex-row"
                slidesPerView={3}
                navigation
            >
                {topScorersInfo.map((scorer, index) => (
                    <SwiperSlide key={index} className="bg-white mt-2 mb-2 shadow-none">
                        <Card key={index} className="max-w-[340px] px-4 py-4 pr-20 shadow-sm border">
                            <CardHeader className="justify-between">
                                <div className="flex gap-2">
                                    <Image
                                        alt="Profile"
                                        className="!rounded-full object-cover"
                                        height={40}
                                        src={scorer.imageURL}
                                        width={40}
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-sm font-semibold leading-none text-default-600">{scorer.name}</h4>
                                        <h5 className="text-xs tracking-tight text-default-400">{scorer.role}</h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400 flex-row gap-6 py-4">
                                <div className="flex justify-between gap-1">
                                    <TaskIcon size={20} />
                                    <p>{`${scorer.tasks} Tasks`}</p>
                                </div>
                                <div className="flex justify-between gap-1">
                                    <StarIcon size={20} />
                                    <p>{`${scorer.points} Points`}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );

}
