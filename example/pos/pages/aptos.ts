import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";

// with custom configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const aptosClient = new Aptos(aptosConfig);

export const recipientAddress = AccountAddress.from(
  "0xffbb9b6431c91f45ef0f530024166cc23cb25abc7b11784f75a338c0a8f5645a"
);
