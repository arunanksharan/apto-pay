import { ValidateTransferError } from './errors';
// curl --request GET \
//   --url https://api.devnet.aptoslabs.com/v1/transactions/by_hash/txn_hash \
//   --header 'Accept: application/json, application/x-bcs'
const DEVNET = 'devnet';
const MAINNET = 'mainnet';
export const APTOS_DEVNET_URL = `https://api.${DEVNET}.aptoslabs.com/v1/transactions/wait_by_hash`;
export const APTOS_MAINNET_URL = `https://api.${MAINNET}.aptoslabs.com/v1/transactions/wait_by_hash`;
export async function validateTransaction({ url, txHash, }) {
    // CCreate Url with txHash at the end
    let aptosUrl = `${url}/${txHash}`;
    const response = await fetch(String(aptosUrl), {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    if (!json?.payload)
        throw new ValidateTransferError('missing payload');
    return json;
}
//# sourceMappingURL=validateTransfer.js.map