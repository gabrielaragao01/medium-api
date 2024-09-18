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
    update: {
		body: yup
			.object()
			.shape({
				name: yup.string().optional(),
				email: yup.string().email().optional(),
				password: yup.string().optional(),
			})
			.noUnknown(),
	},
}

export default userSchema;
