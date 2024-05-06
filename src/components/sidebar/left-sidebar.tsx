import Link from "next/link";
import SideContent from "../side-content";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 hidden h-screen shrink-0 flex-col justify-between overflow-y-auto border-r p-6 pt-36  shadow-light-300 dark:shadow-none md:flex lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-1">
        <SideContent isLeftSideBar={true} />
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3 ">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/sign-up">
              <Button className="mall-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign up"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className=" max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
