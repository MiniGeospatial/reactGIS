const extents = require('./extents');

describe('getExtents', () => {
  it('returns lowest lat lng and highest lat lng', () => {
    const n = [[0, 0], [0, 10], [20, 10], [20, 0], [0, 0]];
    expect(extents.getExtents(n)).toEqual([[0, 0], [20, 10]]);
  });
  it('returns when lat and lng are negative', () => {
    const n = [[-25657, 5436], [-454, 6234], [-20, -54334], [600, 4331]];
    expect(extents.getExtents(n)).toEqual([[-25657, -54334],[600, 6234]]);
  })
})

describe('getExtentsPolygon', () => {
  it('returns a polygon of the extents of a line or polyon', () => {
    const n = [
      [374538, 406994],
      [374455, 407042],
      [374456, 407138],
      [374539, 407186],
      [374622, 407138],
      [374622, 407042],
      [374538, 406994]
    ]
    expect(extents.getExtentsPolygon(n))
      .toEqual([
        [374455, 406994],
        [374455, 407186],
        [374622, 407186],
        [374622, 406994],
        [374455, 406994]
      ]);
  });
})
