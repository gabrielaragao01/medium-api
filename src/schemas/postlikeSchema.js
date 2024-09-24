import * as yup from "yup";

const postlikeSchema = {
    like: {
        params: yup
        .object({
            id: yup.number().integer().required(),
        })
        .noUnknown(),
    },
    dislike: {
        params: yup
        .object({
            id: yup.number().integer().required(),
        })
        .noUnknown(),
    },
    };
export default postlikeSchema;
