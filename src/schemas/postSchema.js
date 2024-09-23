import * as yup from "yup";

const postSchema = {
  create: {
    body: yup
      .object({
        title: yup.string().required(),
        content: yup.string().required(),
        sumary: yup.string().required(),
      })
      .noUnknown(),
  },
  list: {
    body: yup
      .object({
        page: yup.number().integer().min(),
      })
      .noUnknown(),
  },
  list_by_id: {
    body: yup.object({
        id: yup.number().integer().required(),
      })
      .noUnknown(),
  },
  delete: {
    body: yup.object({
      id: yup.number().integer().required(),
    }),
  },
  update: {
    params: yup.object({
      id: yup.number().integer().required(),
    }),
    body: yup
      .object({
        title: yup.string(),
        summary: yup.string(),
        content: yup.string(),
      })
      .noUnknown(),
  },
};

export default postSchema;
