# Aptos Pay

Aptos Pay is a decentralised payments protocol. It provides a standard set of reference implementations for the developers to integrate payment flows into their products.

WIP: Native integration into Aptos wallets.

## Specification: Transfer Request

Aptos Pay transfer request URI encodes a request for direct transfer of Coins from a sender to recipient.

```
aptos:<recipient>
     ?amount=<amount>
     &coinAddress=<address>
     &coinType=<moveStructId>
     &label=<label>
     &message=<message>
```

The Aptos wallet parses the URI and fills in the relevant fields to compose the transaction.

### recipient

The recipient field in the URI represents the 32-byte account address of the entity receiving the coins.

### amount

The amount field encodes the value of coins being transferred.
The value is constrained to be a non-negative integer converted into decimal number of units for the coin.

Scientific notation is not allowed.

If the amount field is missing, the wallet needs to prompt and ask the user to enter the amount.
If the number of decimals exceed the limit supported by the coin, the URI must be rejected as invalid.

### coinAddress

The coinAddress parameter is an optional query parameter.
It encodes the module address for a custom coin.
It is 0x1::coin by default where this field is not provided.

### coinType

The coinAddress parameter is an optional query parameter.
It encodes the coin type for a custom coin.
It is AptosCoin by default where this field is not provided.

Together, coinAddress and coinType are used together to call the transfer function.

### label

The label field is an optional parameter which can describe the source of the transfer request.
It must be URL-encoded UTF-8 string.
Eg: Name of store, application, person (can act as a way to categorise different transactions by origin, category)

Wallet integrating the protocol should URL-decode the parameter and display the label to the user.

### message

The message field is an optional parameter which can describe the transfer request in greater detail.
It must be URL-encoded UTF-8 string.

Eg: Details of item, order details, feedback, address details (Any arbitrary communication or description required to faciliatate the transaction)

Wallet integrating the protocol should URL-decode the parameter and display the message to the user.

### Examples

**URI describing transfer request for 1 APT**
aptos:<recipient>?amount=1&label=example&message=Thank%20You&memo=Order123

**URI describing transfer request for 1 Mooncoin**
aptos:<recipient>?amount=1&coinAddress=<MoonCoin::moon_coin>&label=example&message=Thank%20You&memo=Order123

**URI describing a transfer request for APT without the amount - Wallet should prompt and ask the user for the amount**
aptos:<recipient>?&label=example&message=Thank%20You&memo=Order123

## Specification: Transaction Request

The transaction request URL can enable a bi-directional request for any Aptos transaction.
The parameters in the URI are used by the wallet to make an HTTP request to create the transaction.

**Note:** This approach, however, may open vulnerabilities. It needs to be integrated witha signing mechanism to ensure the requests being made by the wallet are not insecure.

```
aptos:<url>
```

### url

The value must be a conditionally URL-encoded absolute HTTPS URL.
It must have url-encoded query parameters.
It can have protocol parameters (as specified above) and additional parameters but care must be taken to avoid a conflict between them.

The url is encoded into a QR code for scanning and processing by the wallet.

The wallet must URL-decode the value. This has no effect if the value isn't URL-encoded. If the decoded value is not an absolute HTTPS URL, the wallet must reject it as malformed.

It can handle GET and POST request.

## GET Request

The wallet integrating the protocol can make GET JSON request to the url.
The request should not identify the wallet or the user.

The wallet should make the request with an Accept-Encoding header, and the application should respond with a Content-Encoding header for HTTP compression.

The wallet should display the domain of the URL as the request is being made.

## GET Response

The wallet must handle HTTP client error, server error, and redirect responses. The application must respond with these, or with an HTTP OK JSON response with a body of

```
{"label":"<label>", "image":"<image>"}
```

### label

The label field describes the source of the transaction request.
It must be URL-encoded UTF-8 string.
Eg: Name of store, application, person (can act as a way to categorise different transactions by origin, category)

### image

The image field must be an absolute HTTP or HTTPS URL of an icon image. The file must be an SVG, PNG, or WebP image, or the wallet must reject it as malformed.

#### POST Request

The wallet integrating the protocol can make POST JSON request to the url with the body of

```
{"account":"<addressSenderAccount>"}
```

The account value must be the public key of an account that may sign the transaction and act as the sender.

The wallet should make the request with an Accept-Encoding header, and the application should respond with a Content-Encoding header for HTTP compression.

The wallet should display the domain of the URL as the request is being made. If a GET request was made, the wallet should also display the label and render the icon image from the response.

POST Response
The wallet must handle HTTP client error, server error, and redirect responses. The application must respond with these, or with an HTTP OK JSON response with a body of

```
{"transaction":"<transaction>"}
```

### transaction

The transaction value must be a base64-encoded serialized transaction. The wallet must base64-decode the transaction and deserialize it.
The serialization scheme may be changed but base64 encoding serves the purpose for bidirectional communicaiton and exchange of information.

The application may respond with a partially or fully signed transaction. The wallet must validate the transaction as untrusted.

The wallet must only sign the transaction with the account in the request, and must do so only if a signature for the account in the request is expected.

If any signature except a signature for the account in the request is expected, the wallet must reject the transaction as malicious.

The application may also include an optional message field in the response body:

```
{"message":"<message>", "transaction":"<transaction>"}
```

### message

The message field describes the transaction request in greater detail.
It must be URL-encoded UTF-8 string.

Eg: Details of item, order details, feedback, address details (Any arbitrary communication or description required to faciliatate the transaction)

Wallet integrating the protocol should URL-decode the parameter and display the message to the user.

## Example

**URL describing a transaction request**

```
aptos:https://example.com/?recipient="recipient"&amount=1&coinType="aptosCoin"
```

**URL describing a transaction request with query parameters**

```
aptos:https%3A%2F%2Fexample.com%aptos-pay%3ForderId%3D123
```

**GET Request**

GET /merchantApp?orderId=12345 HTTP/1.1

```
Host: example.com
Connection: close
Accept: application/json
Accept-Encoding: br, gzip, deflate
```

**GET Response**

```
HTTP/1.1 200 OK
Connection: close
Content-Type: application/json
Content-Length: 62
Content-Encoding: gzip

{"label":"Dunder Mifflin Paper Company","icon":"https://example.com/icon.svg"}
```

**POST Request**

POST /merchantApp?orderId=123 HTTP/1.1

```
Host: example.com
Connection: close
Accept: application/json
Accept-Encoding: br, gzip, deflate
Content-Type: application/json
Content-Length: 57

{"account":"addressSenderAccount"}
```

**POST Response**

```
HTTP/1.1 200 OK
Connection: close
Content-Type: application/json
Content-Length: 298
Content-Encoding: gzip

{"message":"Thanks for the order! We will supply it asap!","transaction":"serilisedTransactionEncodedAsBase64"}
```
