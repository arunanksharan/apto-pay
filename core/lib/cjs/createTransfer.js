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
exports.createTransferAptos = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const errors_1 = require("./errors");
/**
 * Send a transaction based on transafer request based on decoded URL
 *
 * @param TransferRequestURLFields
 */
function createTransferAptos(sender_1, aptos_1, _a) {
    return __awaiter(this, arguments, void 0, function* (sender, aptos, { recipient, amount, coinType, label, message }) {
        const senderInfo = yield aptos.getAccountInfo({
            accountAddress: sender,
        });
        if (!senderInfo)
            throw new errors_1.CreateTransferError("Invalid Sender Account");
        const recipientInfo = yield aptos.getAccountInfo({
            accountAddress: recipient,
        });
        if (!recipientInfo)
            throw new errors_1.CreateTransferError("Invalid Recipient Account");
        const amountParam = Number(amount);
        const transaction = yield aptos.transaction.build.simple({
            sender: sender,
            data: {
                function: "0x1::coin::transfer",
                typeArguments: [coinType !== null && coinType !== void 0 ? coinType : ts_sdk_1.APTOS_COIN],
                functionArguments: [recipient, amountParam],
            },
        });
        const txBytes = transaction.rawTransaction.bcsToBytes();
        return {
            feePayerAddress: sender,
            rawTransaction: txBytes,
        };
    });
}
exports.createTransferAptos = createTransferAptos;
//# sourceMappingURL=createTransfer.js.map