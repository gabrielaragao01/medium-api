export default class ExceptionUtils extends Error {
	constructor(code, data) {
		super(code);

		this.name = 'ExceptionUtils';
		this.data = data;
	}
}
