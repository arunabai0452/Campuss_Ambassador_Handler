import React from "react";
import LoginComponent from "@/components/Login";
import { Navbar } from "@/components/navbar";


export default function DashboardPage() {
  return (
    <div className="relative flex flex-grow h-full flex-col sm:flex-row">
        {/* First Column (2/3 of the screen) */}
        <div className="relative flex flex-col w-full sm:w-[100%]">
            <Navbar />
            <main className="container flex-grow">
                <LoginComponent />
            </main>
        </div>
    </div>
  );
}

