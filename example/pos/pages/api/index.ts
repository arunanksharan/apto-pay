import { createTransferAptos, recipientFromAccountAddress } from "apto-pay";
import type { NextApiHandler } from "next";
import { aptosClient } from "../aptos";
import { Account, AccountAddress } from "@aptos-labs/ts-sdk";

interface GetResponse {
  label: string;
  icon: string;
}

const get: NextApiHandler<GetResponse> = async (request, response) => {
  const label = request.query.label;
  if (!label) throw new Error("missing label");
  if (typeof label !== "string") throw new Error("invalid label");

  const icon = `https://${request.headers.host}/solana-pay-logo.svg`;

  response.status(200).send({
    label,
    icon,
  });
};

interface PostResponse {
  transaction: string;
  message?: string;
}

const post: NextApiHandler<PostResponse> = async (request, response) => {
  const recipientField = request.query.recipient;
  if (!recipientField) throw new Error("missing recipient");
  if (typeof recipientField !== "string") throw new Error("invalid recipient");

  const amountField = request.query.amount;
  if (!amountField) throw new Error("missing amount");
  if (typeof amountField !== "string") throw new Error("invalid amount");

  const coinType = request.body?.coinType;
  if (!coinType) throw new Error("missing account");
  if (typeof coinType !== "string") throw new Error("invalid coinType");

  const label = request.body?.coinType;

  const sampleAccount = Account.generate();
  const address = recipientFromAccountAddress(sampleAccount.accountAddress);

  const recipient = AccountAddress.from(recipientField);
  const amount = Number(amountField);
  const tx = await createTransferAptos(address, aptosClient, {
    recipient,
    amount,
    coinType,
    label,
  });

  return tx;
};

const index: NextApiHandler<GetResponse | PostResponse> = async (
  request,
  response
) => {
  if (request.method === "GET") return get(request, response);
  if (request.method === "POST") return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
};
