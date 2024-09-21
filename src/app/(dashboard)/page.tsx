import SignOut from "@/src/components/sign-out";

export default function Home() {

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex md:flex-row flex-col gap-8">
      {/* <div className="w-full lg:w-2/3">
        <div className="w-full h-[100px] bg-[#cdd5da] dark:bg-[#444444] rounded-2xl">

        </div>
        <div className="flex gap-4 justify-between flex-wrap mt-5">
          <DashboardCard/>
          <DashboardCard/>
          <DashboardCard/>
          <DashboardCard/>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 h-[500px] bg-[#cdd5da] dark:bg-[#444444] mt-5 rounded-2xl">

          </div>
          <div className="w-1/2 h-[500px] bg-[#cdd5da] dark:bg-[#444444] mt-5 rounded-2xl">

          </div>
        </div>
        <div className="h-[300px] bg-[#cdd5da] dark:bg-[#444444] mt-5 rounded-2xl w-full"></div>
      </div>
      <div className="w-full lg:w-1/3 flex-col">
        <div className="w-full bg-[#cdd5da] dark:bg-[#444444] ">

        </div>
      </div> */}
      <SignOut/>
    </div>
  );
};
