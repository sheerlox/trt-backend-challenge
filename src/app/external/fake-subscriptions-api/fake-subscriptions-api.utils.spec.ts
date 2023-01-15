import { FakeSubscriptionsApiUtils } from './fake-subscriptions-api.utils';

describe('Fake Subscriptions API utils', () => {
  const { parseApiDate } = FakeSubscriptionsApiUtils;

  describe('parseApiDate', () => {
    it('should parse dates correctly', () => {
      expect(parseApiDate('Feb 22')).toEqual('2022-02');
      expect(parseApiDate('Oct 18')).toEqual('2018-10');
    });

    it('should throw an error for invalid date formats', () => {
      expect(() => parseApiDate('Jan')).toThrow('Invalid date provided');
      expect(() => parseApiDate('20')).toThrow('Invalid date provided');
      expect(() => parseApiDate('Kro 18')).toThrow('Invalid date provided');
    });
  });
});
