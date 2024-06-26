import LeftSideBar from "@/components/sidebar/left-sidebar";
import NavBar from "@/components/navbar/navbar";
import RightSideBar from "@/components/sidebar/right-sidebar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative  dark:bg-dark-200">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36  dark:bg-dark-200 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full  max-w-4xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
