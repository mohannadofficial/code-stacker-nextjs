import { UserButton } from "@clerk/nextjs";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="h1-bold">Hello Next.js</h1>
    </div>
  );
};

export default HomePage;
