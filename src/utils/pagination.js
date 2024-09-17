import { ExceptionUtils } from './exception';

const DEFAULT_ITEMS_PER_PAGE = 10;

export default class PaginationUtils {
	static config(options = {}) {
		this._config = Object.assign({}, options);

		if (!this._config.page) {
			throw new ExceptionUtils('PAGINATION_ERROR');
		}

		this._config.page = this._config.page || 1;
		this._config.items_per_page = this._config.items_per_page || DEFAULT_ITEMS_PER_PAGE;

		this._config.offset = ((this._config.page - 1) * this._config.items_per_page);

		return this;
	}

	static getQueryParams() {
		return {
			limit: this.getLimit(),
			offset: this.getOffset(),
			subQuery: false
		};
	}

	static mount(totalItems) {
		const response = {
			itemsPerPage: this._config.items_per_page
		};

		if (this._config.page === 1) {
			response.totalPages = Math.ceil(totalItems / this._config.items_per_page);
		}

		return response;
	}

	static getOffset() {
		return this._config.offset;
	}

	static getPage() {
		return this._config.page;
	}

	static getLimit() {
		return this._config.items_per_page;
	}
}