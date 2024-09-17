import * as yup from 'yup';

const userSchema = {
    create: {
        body: yup
        .object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        })
        .noUnknown(),
    },
    login: {
        body: yup
        .object ({
            email: yup.string().required(),
            password: yup.string().required()
        })
        .noUnknown(),
    },
}

export default userSchema;