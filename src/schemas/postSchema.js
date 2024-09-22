import * as yup from "yup";

const findById = {
  params: yup
    .object()
    .shape({
      id: yup.number().required(),
    })
    .noUnknown(),
};

const postSchema = {
  create: {
    body: yup
      .object({
        title: yup.text().required(),
        content: yup.text().required(),
        sumary: yup.text().required(),
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
  list_bt_id: {
    body: yup
      .object({
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
        title: yup.text(),
        summary: yup.text(),
        content: yup.text(),
      })
      .noUnknown(),
  },
  like: findById,
};

export default postSchema;
