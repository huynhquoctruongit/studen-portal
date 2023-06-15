const Loading = () => {
  return (
    <div className="w-full h-full mt-6 xl:mt-0">
      <main className="animate-page">
        <div className="w-full px-3 xl:w-[1146px] mx-auto">
          <div className="min-h-[50px] aspect-auto block animate-pulse rounded-md bg-gray-100 w-full xl:w-[400px]"></div>
        </div>
        <div className="mt-[20px] scale-x-[1.3] translate-x-[20px] hidden xl:flex py-7">
          <div className="min-h-[390px] flex-1 animate-pulse bg-gray-100 w-[357px] mr-[20px] rounded-2xl"></div>
          <div className="min-h-[390px] flex-1 animate-pulse bg-gray-100 w-[357px] mr-[20px] rounded-2xl"></div>
          <div className="min-h-[390px] flex-1 animate-pulse bg-gray-100 w-[357px] mr-[20px] rounded-2xl"></div>
          <div className="min-h-[390px] flex-1 animate-pulse bg-gray-100 w-[357px] mr-[20px] rounded-2xl"></div>
          <div className="min-h-[390px] flex-1 animate-pulse bg-gray-100 w-[357px] mr-[20px] rounded-2xl"></div>
        </div>

        <div className="w-sreen overflow-hidden xl:hidden py-5">
          <div className="mt-[20px] flex w-[calc(247.2vw+48px)] md:w-[1026px] -translate-x-[calc((147.2vw+48px)/2)] md:-translate-x-[calc((1026px-100vw)/2)]">
            <div className="animate-pulse bg-gray-100 w-[82.4vw] md:w-[326px] mx-2 rounded-2xl" style={{ aspectRatio: 309 / 349 }}></div>
            <div className="animate-pulse bg-gray-100 w-[82.4vw] md:w-[326px] mx-2 rounded-2xl" style={{ aspectRatio: 309 / 349 }}></div>
            <div className="animate-pulse bg-gray-100 w-[82.4vw] md:w-[326px] mx-2 rounded-2xl" style={{ aspectRatio: 309 / 349 }}></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
