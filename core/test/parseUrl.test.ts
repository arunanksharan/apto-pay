import { Account, AccountAddress } from '@aptos-labs/ts-sdk';
import { parseURL } from '../src/parseUrl';
import { TransferRequestURL } from '../src/interfaces';
//aptos:0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8?amount=100000000&reference=test-reference-uuid&label=label&message=message
describe('parseURL', () => {
  describe('parsing', () => {
    describe('when given correct params', () => {
      it('should parse successfully', () => {
        const url =
          'aptos:0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8?amount=100000000&reference=test-reference-uuid&label=label&message=message';

        const { recipient, amount, coinType, reference, label, message } =
          parseURL(url) as TransferRequestURL;

        expect(
          recipient.equals(
            AccountAddress.fromString(
              '0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8'
            )
          )
        ).toBe(true);
        expect(amount === 100000000).toBe(true);
        expect(coinType).toBeUndefined();
        expect(reference).toBe('test-reference-uuid');
        expect(label).toBe('label');
        expect(message).toBe('message');
      });

      it('should parse with coinType', () => {
        const url =
          'aptos:0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8?amount=1.01&coinType=MoonCoin&label=label&message=Payment%20Successful!';

        const { recipient, amount, coinType, reference, label, message } =
          parseURL(url) as TransferRequestURL;

        expect(
          recipient.equals(
            AccountAddress.fromString(
              '0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8'
            )
          )
        ).toBe(true);
        expect(amount === Number('1.01')).toBe(true);
        expect(coinType === 'MoonCoin').toBe(true);
        expect(reference).toBeUndefined();
        expect(label).toBe('label');
        expect(message).toBe('Payment Successful!');
      });

      it('should parse without an amount', () => {
        const url =
          'aptos:0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8?reference=test-reference-uuid&label=label&message=Payment%20Successful!';

        const { recipient, amount, coinType, reference, label, message } =
          parseURL(url) as TransferRequestURL;

        expect(
          recipient.equals(
            AccountAddress.fromString(
              '0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8'
            )
          )
        ).toBe(true);
        expect(amount).toBeUndefined();
        expect(coinType).toBeUndefined();
        expect(reference === 'test-reference-uuid').toBe(true);
        expect(label).toBe('label');
        expect(message).toBe('Payment Successful!');
      });
    });
  });

  describe('errors', () => {
    it('throws an error on invalid length', () => {
      const url = 'X'.repeat(2049);
      expect(() => parseURL(url)).toThrow('length invalid');
    });

    it('throws an error on invalid protocol', () => {
      const url = 'eth:0xffff';
      expect(() => parseURL(url)).toThrow('protocol invalid');
    });

    // Account Address has no restriction in aptos, it appears.
    // ToDo: Need a modified version of this test.
    // it('throws an error on invalid recipient', () => {
    //   const url = 'aptos:0xffff';
    //   expect(() => parseURL(url)).toThrow('recipient invalid');
    // });

    it.each([['1milliondollars'], [-0.1], [-100]])(
      'throws an error on invalid amount: %p',
      (amount) => {
        const url = `aptos:0xbad7abe59cee8cba866d0dbd471218a0ea3b378d9cf37a50e68469203a17d5d8?amount=${amount}`;

        expect(() => parseURL(url)).toThrow('amount invalid');
      }
    );
  });
});
