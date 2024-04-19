// https://medium.com/@dimi_2011/tdd-unit-testing-typescript-project-with-jest-2557e8b84414
import { Account, AccountAddress } from '@aptos-labs/ts-sdk';
import { encodeUrl } from '../src/encodeUrl';

describe('encodeUrl', () => {
  describe('TransferRequestURL', () => {
    it('encodes a URL', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;
      const reference = 'test-reference-uuid';
      const label = 'label';
      const message = 'message';

      const url = encodeUrl({
        recipient,
        amount,
        reference,
        label,
        message,
      });

      expect(String(url)).toBe(
        `aptos:${recipient}?amount=100000000&reference=${reference}&label=${label}&message=${message}`
      );
    });

    it('encodes a url with recipient', () => {
      const recipient = Account.generate().accountAddress;

      const url = encodeUrl({ recipient });

      expect(String(url)).toBe(`aptos:${recipient}`);
    });

    it('encodes a url with recipient and amount', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;

      const url = encodeUrl({ recipient, amount });

      expect(String(url)).toBe(`aptos:${recipient}?amount=100000000`);
    });

    it('encodes a url with recipient, amount and token', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;
      const coinType = 'MoonCoin';

      const url = encodeUrl({ recipient, amount, coinType });

      expect(String(url)).toBe(
        `aptos:${recipient}?amount=100000000&coinType=${coinType}`
      );
    });

    it('encodes a url with recipient, amount and references', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;
      const reference = 'test-reference-uuid';

      const url = encodeUrl({ recipient, amount, reference });

      expect(String(url)).toBe(
        `aptos:${recipient}?amount=100000000&reference=${reference}`
      );
    });

    it('encodes a url with recipient, amount and label', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;
      const label = 'label';

      const url = encodeUrl({ recipient, amount, label });

      expect(String(url)).toBe(
        `aptos:${recipient}?amount=100000000&label=${label}`
      );
    });

    it('encodes a url with recipient, amount and message', () => {
      const recipient = Account.generate().accountAddress;
      const amount = 100000000;
      const message = 'message';

      const url = encodeUrl({ recipient, amount, message });

      expect(String(url)).toBe(
        `aptos:${recipient}?amount=100000000&message=${message}`
      );
    });
  });

  describe('TransactionRequestURL', () => {
    it('encodes a URL', () => {
      const txUrl = 'https://example.com';
      const label = 'label';
      const message = 'message';

      const url = encodeUrl({ txUrl: new URL(txUrl), label, message });

      expect(String(url)).toBe(
        `aptos:${txUrl}?label=${label}&message=${message}`
      );
    });

    it('encodes a URL with query parameters', () => {
      const txUrl = 'https://example.com?query=param';
      const label = 'label';
      const message = 'message';

      const url = encodeUrl({ txUrl: new URL(txUrl), label, message });

      expect(String(url)).toBe(
        `aptos:${encodeURIComponent(txUrl)}?label=${label}&message=${message}`
      );
    });
  });
});
