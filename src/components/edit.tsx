"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Edit = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  return (
    <Image
      src="/assets/icons/edit.svg"
      alt="Edit"
      width={14}
      height={14}
      className="cursor-pointer object-contain"
      onClick={handleEdit}
    />
  );
};

export default Edit;
