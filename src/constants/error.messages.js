const EXPECTED_TYPE_NAME = {
	number: 'Número',
	string: 'texto'
};

export default {
	typeError: (field, value, expectedType) => `O valor ${value} é inválido para o campo ${field}. Você deve informar um ${EXPECTED_TYPE_NAME[expectedType]}.`,
	required: field => `O campo ${field} é obrigatório.`,
	invalidFormat: (field, value) => `O valor ${value} é inválido para o campo ${field}.`,
	invalidDateRange: () => 'A data inicial não pode ser após a data final.',
	length: (field, value, expectedType) => `O campo ${field} precisa ter ${expectedType} caracteres.`,
	oneOf: () => 'Os campos informados precisam ser iguais.',
	min: (field, value, expectedType) => `O campo ${field} precisa ter no mínimo ${expectedType} caracteres.`,
	max: (field, value, expectedType) => `O campo ${field} só pode ter no máximo ${expectedType} caracteres.`,
	invalidExtension: () => 'Arquivo com extensão inválida.'
};