const KidProgramming = ({ src }: any) => {
  const url = src + "/embed";
  return <iframe src={url} className="w-screen h-screen p-10 bg-white"></iframe>;
};
export default KidProgramming;
