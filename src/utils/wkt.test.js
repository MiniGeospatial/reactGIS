const { fromWkt, toWkt } = require('./wkt');

describe('fromWkt', () => {

  it('returns a node array and geometry type from a polygon wkt', () => {
    const wkt = "POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))";
    expect(fromWkt(wkt)).toEqual(
      {
        geometryType: 'POLYGON',
        nodes: [
          [0, 0], [0, 10], [10, 10], [10, 0], [0, 0]
        ]
      }
    );
  });

  it('handles spaces in the wkt', () => {
    const wkt = "POLYGON (( 0 0, 0 10, 10 10, 10 0, 0 0))";
    expect(fromWkt(wkt)).toEqual(
      {
        geometryType: 'POLYGON',
        nodes: [
          [0, 0], [0, 10], [10, 10], [10, 0], [0, 0]
        ]
      }
    );
  });

  it('handles nospaces between the comma seperated nodes', () => {
    const wkt = "POLYGON((0 0,0 10,10 10,10 0,0 0))";
    expect(fromWkt(wkt)).toEqual(
      {
        geometryType: 'POLYGON',
        nodes: [
          [0, 0], [0, 10], [10, 10], [10, 0], [0, 0]
        ]
      }
    );
  });

  it('returns linestrings', () => {
    const wkt = 'linestring(0 0, 5 5, 10 10, 20 20)';
    expect(fromWkt(wkt)).toEqual(
      {
        geometryType: 'LINESTRING',
        nodes: [
          [0, 0], [5, 5], [10, 10], [20, 20]
        ]
      }
    );
  });

  it('returns a point with a single node pair', () => {
    const wkt = "POINT(543210 123456)";
    expect(fromWkt(wkt)).toEqual(
      {
        geometryType: 'POINT',
        nodes: [543210, 123456],
      }
    );
  });

});

describe('toWkt', () => {

  it('returns a polygon wkt string from nodes', () => {
    const nodes = [
      [0, 0], [0, 10], [10, 10], [10, 0], [0, 0]
    ];
    const geomType = 'POLYGON';
    expect(toWkt(geomType, nodes))
      .toBe('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');
  });

  it('returns a linestring from nodes', () => {
    const nodes = [
      [0, 0], [5, 5], [10, 0]
    ];
    const geomType = 'LINESTRING';
    expect(toWkt(geomType, nodes))
      .toBe('LINESTRING(0 0, 5 5, 10 0)');
  });

  it('returns a point from nodes', () => {
    const nodes = [654321, 123456];
    const geomType = 'POINT';
    expect(toWkt(geomType, nodes))
      .toBe('POINT(654321 123456)');
  });

});
