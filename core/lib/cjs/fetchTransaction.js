"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransaction = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const errors_1 = require("./errors");
function fetchTransaction(account, link) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(String(link), {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ account }),
        });
        const json = yield response.json();
        if (!(json === null || json === void 0 ? void 0 : json.transaction))
            throw new errors_1.FetchTransactionError("missing transaction");
        if (typeof json.transaction !== "string")
            throw new errors_1.FetchTransactionError("invalid transaction");
        const transaction = JSON.parse(json === null || json === void 0 ? void 0 : json.transaction);
        if (transaction.rawTransaction == null || transaction.feePayerAddress == null)
            throw new errors_1.FetchTransactionError("Error parsing fetch transaction");
        const deserializer = new ts_sdk_1.Deserializer(transaction.rawTransaction);
        const rawTransaction = ts_sdk_1.RawTransaction.deserialize(deserializer);
        const simpleTransaction = {
            rawTransaction,
            feePayerAddress: transaction.feePayerAddress,
        };
        return simpleTransaction;
    });
}
exports.fetchTransaction = fetchTransaction;
//# sourceMappingURL=fetchTransaction.js.map