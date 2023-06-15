// file

const checkLink = async () => {
  const reuslt = await new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle("true ? false");
    }, 3000);
  });
  return reuslt;
};

const validateLink = (name: string) => ({
  project_thumbnail: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  subject_id: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_description: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_link: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_title: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
});

const validateFile = (name: string) => ({
  subject_id: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_thumbnail: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_description: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_title: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
  project_source: { required: `Lỗi: ${name} ơi, bạn hãy điền thông tin còn thiếu trước khi đăng tải dự án nhé` },
});

export const getValidation = (type: string, name: string) => {
  return type === "LINK" ? validateLink(name) : validateFile(name);
};
