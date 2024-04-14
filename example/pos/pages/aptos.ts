import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// with custom configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const aptosClient = new Aptos(aptosConfig);
