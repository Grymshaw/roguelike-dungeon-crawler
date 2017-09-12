/* eslint "no-undef": 0 */
import { expect } from 'chai';

import Rectangle from './Rectangle';

describe('Rectangle.contains()', () => {
  const height = 10;
  const width = 10;
  const origin = [0, 0];
  let rect;

  beforeEach(() => {
    rect = new Rectangle(origin, width, height);
  });

  it('returns true if point in rectangle bounds', () => {
    const result = rect.contains([5, 5]);
    expect(result).to.equal(true);
  });

  it('returns false if point is not in bounds', () => {
    const result = rect.contains([-1, -1]);
    expect(result).to.equal(false);
  });

  it('returns true if point is right on bounds', () => {
    let result = rect.contains([0, 0]);
    expect(result).to.equal(true);
    result = rect.contains([width, height]);
    expect(result).to.equal(true);
  });
});


describe('Rectangle.overlaps()', () => {
  const height = 1;
  const width = 1;
  const origin = [10, 10];
  let rect;
  let other;

  beforeEach(() => {
    rect = new Rectangle(origin, width, height);
  });

  it('returns false if other is below', () => {
    other = new Rectangle([origin[0], origin[1] - 2], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(false);
  });

  it('returns false if other is above', () => {
    other = new Rectangle([origin[0], origin[1] + 2], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(false);
  });

  it('returns false if other is left of', () => {
    other = new Rectangle([origin[0] - 2, origin[1]], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(false);
  });

  it('returns false if other is right of', () => {
    other = new Rectangle([origin[0] + 2, origin[1]], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(false);
  });

  it('returns true otherwise', () => {
    other = new Rectangle([origin[0] - 1, origin[1] - 1], 2, 2);
    const result = rect.overlaps(other);
    expect(result).to.equal(true);
  });

  it('returns true if the borders overlap in x', () => {
    other = new Rectangle([origin[0] - 1, origin[1]], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(true);
  });

  it('returns true if the borders overlap in y', () => {
    other = new Rectangle([origin[0], origin[1] - 1], 1, 1);
    const result = rect.overlaps(other);
    expect(result).to.equal(true);
  });
});
