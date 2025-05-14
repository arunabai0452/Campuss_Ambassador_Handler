"use client"
import React,{useState} from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import NextLink from "next/link";
import { DropDownIcon } from "./icons";
import { Image } from "@heroui/image";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

import {
  GithubIcon,
  NotificationIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = (props: { firstName: string, lastName: string, profileImageURL: string}) => {
  const { firstName, lastName, profileImageURL } = props;
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const pathName = usePathname() || "";
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLogin = pathName.includes("login");
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
 const handleNav=(key: string) => {
   setSelectedPage(key);
   const userId = searchParams?.get("userId");
   const role = searchParams?.get("role");
   router.push(`/${key}?userId=${userId}&role=${role}`)
 }
  return (
    <HeroUINavbar isBordered height={"6rem"} maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full gap-16" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="https://www.coltie.com/"
          >
            <Logo />
            <p className="font-bold text-3xl text-inherit">Coltie</p>
          </NextLink>
        </NavbarBrand>
        { !isLogin && (
        <NavbarItem className="hidden sm:flex flex-col justify-center items-start gap-3">
          <p className="font-bold text-xl text-inherit">{`Hi ${firstName} ${lastName}`}</p>
          <p className="font-bold text-xs text-custom-gray">
            Let&apos;s View Your Contributions
          </p>
        </NavbarItem>
        )}
      </NavbarContent>
      { !isLogin && (
      <>
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full gap-5" justify="end">
        <Button
          isIconOnly
          aria-label="Like"
          className="bg-[#F5F5F7] rounded-full"
        >
          <NotificationIcon />
        </Button>
        <Image
          alt="Profile"
          className="rounded-full"
          height={40}
          src={profileImageURL}
          width={40}
        />
        <div>
        <Dropdown>
          <DropdownTrigger>
              <Button
                startContent={<DropDownIcon className="rounded-none" />}
                variant="bordered"
              >
                  {selectedPage}
              </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select Role" onAction={handleNav} align="end">
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
            <DropdownItem key="userdetails">User Details</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Button
          isIconOnly
          aria-label="Like"
          className="bg-[#F5F5F7] rounded-full"
        >
          <NotificationIcon />
        </Button>
        <ThemeSwitch />
        <Image
          alt="Profile"
          className="rounded-full"
          height={35}
          src="/assets/profile.png"
          width={35}
        />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
      </>
      )}
    </HeroUINavbar>
  );
};
