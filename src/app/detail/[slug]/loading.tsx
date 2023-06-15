const Loading = () => {
  return (
    <div className="min-h-screen px-3 md:px-0 md:flex justify-center bg-background">
      <main className="py-10 animate-page">
        <div className="w-full md:min-w-[1144px] min-h-32 md:mx-auto">
          <div className="flex items-center">
            <div className="">
              <div className="w-10 h-10 animate-pulse rounded-full bg-gray-100 overflow-hidden"></div>
              <div className="w-60 h-[50px] mt-6 animate-pulse rounded-md bg-gray-100"></div>
            </div>
            <div className="body-15 ml-2 flex bg-gray-100  animate-pulse "></div>
          </div>
          <div className="flex items-center mt-6"></div>
          <div className="bg-white p-5 mt-6 rounded-lg w-full">
            <div className="md:flex">
              <div className="md:w-6/12">
                <div className="relative w-full pt-[100%] md:pt-0 md:mt-0 md:w-[546px] md:h-[366px] overflow-hidden bg-gray-100 animate-pulse rounded-lg"></div>
              </div>
              <div className="md:w-6/12 md:pl-6 flex flex-col">
                <div className="rounded-md text-blue h-8 bg-[#fafafa] animate-pulse"></div>
                <div className="h-[268px] mt-2 rounded-md bg-[#fafafa] animate-pulse"></div>
                <div className="h-10 w-full mt-4 rounded-md bg-[#fafafa] animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="mt-[54px] max-w-[754px] mx-auto">
            <div className="h-60 bg-[#fafafa] animate-pulse rounded-md"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Loading;
