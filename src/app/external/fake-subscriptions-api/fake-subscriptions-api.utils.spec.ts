import { FakeSubscriptionsApiUtils } from './fake-subscriptions-api.utils';

describe('FakeSubscriptions API utils', () => {
  const { parseDateToISO } = FakeSubscriptionsApiUtils;

  describe('parseDateToISO', () => {
    it('should parse dates correctly', () => {
      expect(parseDateToISO('Feb 22')).toBe('2022-02');
      expect(parseDateToISO('Oct 18')).toBe('2018-10');
      expect(parseDateToISO('Dec 90')).toBe('1990-12');
    });

    it('should throw an error for invalid date formats', () => {
      expect(() => parseDateToISO('Jan')).toThrow('Invalid date provided:');
      expect(() => parseDateToISO('20')).toThrow('Invalid date provided:');
      expect(() => parseDateToISO('Kro 18')).toThrow('Invalid date provided:');
    });
  });
});
