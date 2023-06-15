const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full animate-pulse bg-gray-100 pt-[34%] md:pt-0 shadow-sm md:h-[300px]"></div>
      <main className="animate-page px-5 xl: 0">
        <div className="w-[1146px] mx-auto flex">
          <div className="px-3 md:px-0">
            <div className="block rounded-full translate-y-[-40px] md:translate-y-[-50px] animate-pulse bg-gray-100 w-[100px] h-[100px] md:w-[214px] md:h-[214px]"></div>
          </div>
          <div className="ml-[32px] mt-4 hidden md:block">
            <div className="flex">
              <div className="block rounded-md animate-pulse bg-gray-100 w-[200px] h-[70px]"></div>
              <div className="flex">
                <div className=" ml-[22px] hidden md:flex">
                  <div className="block rounded-md animate-pulse bg-gray-100 w-[110px] h-[40px]"></div>
                  <div className="block rounded-md animate-pulse bg-gray-100 w-[110px] h-[40px] ml-6"></div>
                </div>
              </div>
            </div>
            <div className="rounded-md animate-pulse bg-gray-100 w-full h-[48px] mt-5"></div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div className="block rounded-md animate-pulse bg-gray-100 h-[37px]"></div>
              <div className="block rounded-md animate-pulse bg-gray-100 h-[37px]"></div>
              <div className="block rounded-md animate-pulse bg-gray-100 h-[37px]"></div>
              <div className="block rounded-md animate-pulse bg-gray-100 h-[37px]"></div>
            </div>
          </div>
          <div className="mt-3 flex-1 w-full ml-10 relative h-[170px] rounded-md animate-pulse bg-gray-100 hidden xl:block"></div>
        </div>
        <div className="w-full xl:w-[1146px] mx-auto mb-40 hidden md:block">
          <div className="mt-40 ">
            <div className="rounded-md animate-pulse bg-gray-100 w-[500px] h-[48px] "></div>
            <div className="rounded-md animate-pulse bg-gray-100 w-full h-[48px]  mt-10"></div>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[30px] mt-6">
            <div className="rounded-md animate-pulse bg-gray-100 w-[362px] h-[390px]"></div>
            <div className="rounded-md animate-pulse bg-gray-100 w-[362px] h-[390px]"></div>
            <div className="rounded-md animate-pulse bg-gray-100 w-[362px] hidden xl:block h-[390px]"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
