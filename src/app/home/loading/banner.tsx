const Loading = () => {
  return (
    <div className="w-full h-full">
      <div className="animate-page">
        <div
          className="xl:min-h-[520px] aspect-auto block  rounded-xl xl:rounded-[36px] animate-pulse bg-gray-100 w-full"
          style={{ aspectRatio: 338 / 152 }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
