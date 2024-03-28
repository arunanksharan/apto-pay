"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTransferError = exports.ParseURLError = exports.FetchTransactionError = exports.CreateTransferError = void 0;
class CreateTransferError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'CreateTransferError';
    }
}
exports.CreateTransferError = CreateTransferError;
class FetchTransactionError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'FetchTransactionError';
    }
}
exports.FetchTransactionError = FetchTransactionError;
class ParseURLError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ParseURLError';
    }
}
exports.ParseURLError = ParseURLError;
class ValidateTransferError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ValidateTransferError';
    }
}
exports.ValidateTransferError = ValidateTransferError;
//# sourceMappingURL=errors.js.map