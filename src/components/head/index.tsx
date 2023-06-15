import { domain } from "@/lib/helper";

interface Meta {
  description?: string;
  title?: string;
  image?: string;
  content?: string;
  url?: string;
}
const defaultMeta: Meta = {
  description: "",
  title: "",
  image: "",
  content: "",
  url: "",
};

const defaults = {
  title: "ICANTECH CLUB | Dạy học lập trình cho trẻ",
  description:
    "Sân chơi dành cho các bạn lập trình viên nhí, giúp học viên rèn luyện vững chắc kĩ năng lập trình thông qua việc thực hành tạo ra sản phẩm & thi đấu cọ sát với bạn bè.",
  content: "lập trình, trẻ em, học, code, web, game, app, scratch, python, roblox, code combat, minecraft, học lập trình online, online, trực tuyến",
  url: "/",
  image: domain + "/images/meta-image.png",
};
const HeadMeta = ({ data = defaultMeta }: any) => {
  return (
    <>
      <title>{data.title}</title>
      <meta name="description" content={data.description || defaults.description} />
      <meta name="keywords" content={data.content || defaults.content} />
      <meta property="og:url" content={domain + data.url} />
      <link rel="canonical" href={domain + data.url} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description || defaults.description} />
      <meta property="og:image" content={data.image || defaults.image} />
    </>
  );
};

export default HeadMeta;
