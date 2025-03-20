import React, { useState, useEffect } from "react";

interface TimeDifferenceProps {
    addedTime: string;
    expiryTime: string;
}

const TimeDifference: React.FC<TimeDifferenceProps> = ({ addedTime, expiryTime }) => {
    const [timeLeft, setTimeLeft] = useState<string>("");

    const calculateTimeLeft = () => {
        const now = new Date();
        const added = new Date(addedTime);
        const expiry = new Date(expiryTime);
        // Check if expiryTime is in the past or if any component exceeds current time
        if (
            expiry <= now
        ) {
            setTimeLeft("Completed");
            return;
        }

        const difference = expiry.getTime() - now.getTime();
        if (difference <= 0) {
            setTimeLeft("Completed");
            return;
        }

        const days = Math.floor(difference / (1000 * 3600 * 24));
        const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        let result = "";
        if (days > 0) result += `${days} day${days > 1 ? "s" : ""}, `;
        if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""}, `;
        if (minutes > 0) result += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
        if (seconds >= 0) result += `${seconds} second${seconds > 1 ? "s" : ""}`;

        setTimeLeft(result.trim().replace(/,\s*$/, ""));
    };

    useEffect(() => {
        calculateTimeLeft(); // Initial calculation when the component mounts
        const interval = setInterval(() => {
            calculateTimeLeft(); // Update every second
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [addedTime, expiryTime]); // Recalculate if addedTime or expiryTime changes

    return <p className="text-sm py-8">{timeLeft}</p>;
};

export default TimeDifference;
