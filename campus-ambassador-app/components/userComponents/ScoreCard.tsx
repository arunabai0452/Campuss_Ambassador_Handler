import { Card, CardHeader, CardBody } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";


export default function ScoreCard({ pointsEarned, completedTaskLen, completionRate }: { pointsEarned: number, completedTaskLen: number, completionRate: number }) {
    return (
        <Card className="py-4 w-full sm:w-[25%] bg-black">
            <CardHeader className="pb-0 pt-2 px-4 py-2 flex-col gap-2 items-start">
                <p className="text-lg px-4 py-2 text-white ">Current Score</p>
                <p className="text-3xl font-bold px-4 text-white">{pointsEarned}</p>
            </CardHeader>
            <div className="border-t border-white w-full" />
            <CardBody className="overflow-visible py-4 px-8 flex-row">
                <CircularProgress
                    classNames={{
                        svg: "w-20 h-20 drop-shadow-md",
                        indicator: "stroke-blue-500",
                        track: "stroke-white/10",
                        value: "text-lg font-semibold text-white",
                    }}
                    showValueLabel={true}
                    strokeWidth={4}
                    value={completionRate}
                />
                <div className="flex flex-col gap-2 ml-4">
                    <p className="text-3xl sm:text-lg px-8 sm:px-4 py-2 text-white ">{completedTaskLen}</p>
                    <p className="text-lg sm:text-xs px-8 sm:px-4 text-white">Tasks</p>
                </div>
            </CardBody>
        </Card>
    );
}
