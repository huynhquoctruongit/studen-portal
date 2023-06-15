const Loading = () => {
  return (
    <div className="w-full px-5 md:px-[30px] xl:px-0 h-full mb-[100px] mt-[103px] max-w-[1140px] mx-auto">
      <main className="animate-page">
        <div className="w-full xl:mx-auto">
          <div className="min-h-[50px] aspect-auto block animate-pulse bg-gray-100 w-full xl:w-[400px]"></div>
          <div className="w-full flex mt-[20px] w-sreen overflow-hidden">
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
            <div className="h-[30px] rounded aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px]"></div>
          </div>
          <div className="flex mt-[20px]">
            <div className="h-[30px] aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px] rounded-full"></div>
            <div className="h-[30px] aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px] rounded-full"></div>
            <div className="h-[30px] aspect-auto block animate-pulse bg-gray-100 w-[100px] mr-[20px] rounded-full"></div>
          </div>
        </div>
        {/* <div className="flex xl:gap-8 mt-5 gap-8">
          <div className="aspect-auto block animate-pulse bg-gray-100 w-[357px] rounded-2xl" style={{ aspectRatio: 309 / 349 }}></div>
          <div className="hidden min-h-[390px] aspect-auto  animate-pulse md:block bg-gray-100 w-[357px] rounded-2xl"></div>
          <div className="hidden xl:block min-h-[390px] aspect-auto animate-pulse bg-gray-100 w-[357px] rounded-2xl"></div>
        </div> */}
      </main>
    </div>
  );
};

export default Loading;
