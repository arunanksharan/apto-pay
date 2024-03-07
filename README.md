# Aptos Pay

Aptos Pay is a decentralised payments protocol. It provides a standard set of reference implementations for the developers to integrate payment flows into their products.

WIP: Native integration into Aptos wallets.

Specification: Transfer Request
Aptos Pay transfer request URI encodes a request for direct transfer of Coins from a sender to recipient.

```
    aptos:<recipient>
         ?amount=<amount>
         &coinAddress=<module::coin>
         &label=<label>
         &message=<message>
```

The Aptos wallet parses the URI and fills in the relevant fields to compose the transaction.

## recipient

The recipient field in the URI represents the 32-byte account address of the entity receiving the coins.

## amount

The amount field encodes the value of coins being transferred.
The value is constrained to be a non-negative integer converted into decimal number of units for the coin.

Scientific notation is not allowed.

If the amount field is missing, the wallet needs to prompt and ask the user to enter the amount.
If the number of decimals exceed the limit supported by the coin, the URI must be rejected as invalid.

## coinAddress

The coinAddress parameter is an optional query parameter.
It encodes the module address for a custom coin.
It is 0x1::coin::AptosCoin by default where this field is not provided.

## label

The label field is an optional parameter which can describe the source of the transfer request.
It must be URL-encoded UTF-8 string.
Eg: Name of store, application, person (can act as a way to categorise different transactions by origin, category)

Wallet integrating the protocol should URL-decode the parameter and display the label to the user.

## Message

The message field is an optional parameter which can describe the transfer request in greater detail.
It must be URL-encoded UTF-8 string.

Eg: Details of item, order details, feedback, address details (Any arbitrary communication or description required to faciliatate the transaction)

Wallet integrating the protocol should URL-decode the parameter and display the message to the user.

## Examples

**URI describing transfer request for 1 APT**
aptos:<recipient>?amount=1&label=example&message=Thank%20You&memo=Order123

**URI describing transfer request for 1 Mooncoin**
aptos:<recipient>?amount=1&coinAddress=<MoonCoin::moon_coin>&label=example&message=Thank%20You&memo=Order123

**URI describing a transfer request for APT without the amount - Wallet should prompt and ask the user for the amount**
aptos:<recipient>?&label=example&message=Thank%20You&memo=Order123
