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
exports.validateTransaction = exports.APTOS_MAINNET_URL = exports.APTOS_DEVNET_URL = void 0;
const errors_1 = require("./errors");
// curl --request GET \
//   --url https://api.devnet.aptoslabs.com/v1/transactions/by_hash/txn_hash \
//   --header 'Accept: application/json, application/x-bcs'
const DEVNET = 'devnet';
const MAINNET = 'mainnet';
exports.APTOS_DEVNET_URL = `https://api.${DEVNET}.aptoslabs.com/v1/transactions/wait_by_hash`;
exports.APTOS_MAINNET_URL = `https://api.${MAINNET}.aptoslabs.com/v1/transactions/wait_by_hash`;
function validateTransaction(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url, txHash, }) {
        // CCreate Url with txHash at the end
        let aptosUrl = `${url}/${txHash}`;
        const response = yield fetch(String(aptosUrl), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = yield response.json();
        if (!(json === null || json === void 0 ? void 0 : json.payload))
            throw new errors_1.ValidateTransferError('missing payload');
        return json;
    });
}
exports.validateTransaction = validateTransaction;
//# sourceMappingURL=validateTransfer.js.map