const { area } = require('./area');

describe('area', () => {
  it('returns the area of a polygon', () => {
    const nodes = [
      [0, 0],
      [0, 10],
      [10, 10],
      [10, 0],
      [0, 0]
    ];
    expect(area(nodes)).toBe(100);
  });

  it('works with ireggular polygons', () => {
    const nodes = [
      [370575, 409840],
      [370641, 410166],
      [370518, 410523],
      [370755, 410173],
      [370675, 409757],
      [370325, 409521],
      [369910, 409601],
      [370313, 409616],
      [370575, 409840]
    ];
    expect(area(nodes)).toBe(122597);
  })
});
