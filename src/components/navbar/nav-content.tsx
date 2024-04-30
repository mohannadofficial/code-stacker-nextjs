import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import SideContent from "../side-content";

const NavContent = () => {
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      <SheetClose asChild>
        <SideContent />
      </SheetClose>
    </section>
  );
};

export default NavContent;
