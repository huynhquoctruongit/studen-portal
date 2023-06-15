import { Button } from "../button";

const PythonPro = ({ src }: any) => {
  const exist = src.includes("?");
  const url = src + (exist ? "&embed=true" : "?embed=true");
  return <iframe src={url} height="600" width="900"></iframe>;
};
export default PythonPro;
