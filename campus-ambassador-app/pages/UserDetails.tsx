"use client"
import React, { useEffect, useState } from "react";
import UserForm from "@/components/adminComponents/userHandling/addUser";
import UserInfo from "@/components/adminComponents/userHandling/userDetails";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { DropDownIcon } from "@/components/icons";

export default function UserDetails() {
    const [subPage, setSubPage] = useState<string>("userInfo");
    const handleNav = (key: string) => {
        setSubPage(key);
    }
    return (
        <section className="flex flex-col">
            <>
            <div className="flex justify-end">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            startContent={<DropDownIcon className="rounded-none" />}
                            variant="bordered"
                        >
                            {subPage}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Select Role" onAction={handleNav} align="end">
                        <DropdownItem key="addUser">Add User</DropdownItem>
                        <DropdownItem key="userInfo">User Info</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
                {subPage==="addUser" && (<UserForm />)}
                {subPage == "userInfo" && (<UserInfo/>)}
            </>
        </section>
    );
}
