const Scratch = ({ src }: any) => {
  const urlFormat = src.replace("editor/", "").replace("editor", "");
  const url = urlFormat[urlFormat?.length - 1] === "/" ? urlFormat + "embed" : urlFormat + "/embed";
  return <iframe src={url} width="1000" height="700" allowFullScreen></iframe>;
};
export default Scratch;
