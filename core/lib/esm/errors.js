export class CreateTransferError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'CreateTransferError';
    }
}
export class FetchTransactionError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'FetchTransactionError';
    }
}
export class ParseURLError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ParseURLError';
    }
}
export class ValidateTransferError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ValidateTransferError';
    }
}
//# sourceMappingURL=errors.js.map