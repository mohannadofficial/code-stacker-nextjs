import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
