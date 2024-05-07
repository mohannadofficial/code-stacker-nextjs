import { getUserById } from "@/actions/user";
import ProfileForm from "@/components/form/profile-form";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const EditProfilePage = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById(userId);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <ProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
    </>
  );
};

export default EditProfilePage;
