import BigNumber from 'bignumber.js';
import { AccountAddress } from '@aptos-labs/ts-sdk';

export type Recipient = AccountAddress;
export type Amount = BigNumber;
export type CoinType = string;
export type Label = string;
export type Message = string;

export type TXUrl = URL;
