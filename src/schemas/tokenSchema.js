import * as yup from 'yup'

const TokenSchema = {
    login: {
        body: yup
        .object ({
            email: yup.string().required(),
            password: yup.string().required()
        })
        .noUnknown(),
    },
}

export default {
    login: TokenSchema.login,
}
