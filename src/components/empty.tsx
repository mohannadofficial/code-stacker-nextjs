import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const Empty = ({ description, link, linkTitle, title }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button variant="primary">{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default Empty;
