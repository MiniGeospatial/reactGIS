const getExtents = (nodes) => {
  const lats = nodes.map(latlng => latlng[0]);
  const lngs = nodes.map(latlng => latlng[1]);

  const min = [Math.min(...lats), Math.min(...lngs)];
  const max = [Math.max(...lats), Math.max(...lngs)];

  return [min, max];
};

const getExtentsPolygon = (nodes) => {
  const minMax = getExtents(nodes);
  return [
      minMax[0],
      [minMax[0][0], minMax[1][1]],
      minMax[1],
      [minMax[1][0], minMax[0][1]],
      minMax[0]
    ]

};

export { getExtents, getExtentsPolygon };
