import { createTransferAptos } from "apto-pay";
import type { NextApiHandler } from "next";
import { aptosClient } from "../aptos";
import { Account } from "@aptos-labs/ts-sdk";

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

  const splTokenField = request.query["spl-token"];
  if (splTokenField && typeof splTokenField !== "string")
    throw new Error("invalid spl-token");

  const messageParam = request.query.message;
  if (messageParam && typeof messageParam !== "string")
    throw new Error("invalid message");
  const message = messageParam || undefined;

  // Account provided in the transaction request body by the wallet.
  const accountField = request.body?.account;
  if (!accountField) throw new Error("missing account");
  if (typeof accountField !== "string") throw new Error("invalid account");
};

const index: NextApiHandler<GetResponse | PostResponse> = async (
  request,
  response
) => {
  if (request.method === "GET") return get(request, response);
  if (request.method === "POST") return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
};
