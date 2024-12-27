import DefaultLayout from "@/layouts/default";
import AuthFrom from "@/components/auth";

const signup = () => {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center w-full p-5">
        <AuthFrom load="signup" />
      </div>
    </DefaultLayout>
  );
};

export default signup;
