"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isLeftSideBar?: boolean;
}

const SideContent = ({ isLeftSideBar = false }: Props) => {
  const pathname = usePathname();
  return sidebarLinks.map((item) => {
    const isActive =
      (pathname.includes(item.route) && item.route.length > 1) ||
      pathname === item.route;
    return (
      <Link
        key={item.route}
        href={item.route}
        className={cn(
          "flex items-center justify-start gap-4 bg-transparent p-4 ",
          isActive
            ? "primary-gradient rounded-lg text-light-900"
            : "text-dark300_light900",
        )}
      >
        <Image
          src={item.imgURL}
          alt={item.label}
          width={20}
          height={20}
          className={cn(isActive && "invert-colors")}
        />
        <p
          className={cn(
            isActive ? "base-bold" : "base-medium",
            isLeftSideBar && "max-lg:hidden",
          )}
        >
          {item.label}
        </p>
      </Link>
    );
  });
};

export default SideContent;
