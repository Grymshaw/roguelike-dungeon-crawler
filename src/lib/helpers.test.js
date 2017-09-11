import { inRange } from './helpers';

describe('inRange()', () => {
    it('returns true if the value is in the range', () => {
      const result = inRange(10, 8, 15);
      expect(result);
    });
    it('returns false if the value is outside the range', () => {
      const result = inRange(8, 10, 15);
      expect(!result);
    });
    it('returns true if the value is the minimum', () => {
      const result = inRange(8, 8, 10);
      expect(result);
    });
    it('returns false if the value is the max', () => {
      const result = inRange(8, 8, 10);
      expect(!result);
    });
    it('returns false if value === min === max', () => {
      const result = inRange(8, 8, 8);
      expect(!result);
    });
});
