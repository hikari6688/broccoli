import { describe, expect, test } from '@jest/globals';
import { withUnit } from '../tools';
describe('format byte to united string', () => {
  test('6815744 should be 6.50M', () => {
    expect(withUnit(6815744)).toBe('6.50M');
  });
});
