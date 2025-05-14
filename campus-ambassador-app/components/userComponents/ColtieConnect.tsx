import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { CopyIcon, ShareIcon } from "../icons";
import { Button } from "@heroui/button";


export default function ColtieConnect() {
    return (
        <Card className="py-4 w-full sm:w-[25%]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny font-bold">Your Coltie Connect Code</p>
            </CardHeader>
            <CardBody className="py-4 px-8">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={270}
                />
            </CardBody>
            <div className="flex mr-8 justify-end gap-4">
                <Button isIconOnly variant="light">
                    <CopyIcon className="rounded-none" />
                </Button>
                <Button isIconOnly variant="light">
                    <ShareIcon size={20} className="rounded-none" />
                </Button>
            </div>
        </Card>
    );
}
