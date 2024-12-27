import DefaultLayout from "@/layouts/default";
import AuthFrom from "@/components/auth";

const signin = () => {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center w-full flex-grow bg-transperent h-full">
        <AuthFrom load="signin" />
      </div>
    </DefaultLayout>
  );
};

export default signin;
