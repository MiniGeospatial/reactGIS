const fromWkt = (wkt) => {
  const removedCase = wkt.toUpperCase();
  const geomType = geometryType(removedCase);
  const nodeString = removeText(geomType, removedCase);
  const nodes = extractNumbers(geomType, nodeString);
  return {geometryType: geomType, nodes: nodes};
}

const toWkt = (geomType, nodes) => {
  if (geomType === 'POINT') {
    return `POINT(${nodes[0]} ${nodes[1]})`;
  }

  const nodeString = nodes.map(xy => `${xy[0]} ${xy[1]}`).join(', ');

  if (geomType === 'POLYGON') {
    return `POLYGON((${nodeString}))`;
  }
  else {
    return `${geomType}(${nodeString})`;
  }
};

// Private Functions!!! Do Not export
const geometryType = (wkt) => {
  if (wkt.includes('POLYGON')) {
    return 'POLYGON';
  }
  else if (wkt.includes('LINESTRING')) {
    return 'LINESTRING';
  }
  else if (wkt.includes('POINT')) {
    return 'POINT';
  }
  else {
    return false;
  }
}

const removeText = (geomType, wkt) => {
  const stringRemoved = wkt.replace(geomType, '');
  const nodeString = stringRemoved.replace(/\(/gi, '').replace(')', '');
  return nodeString;
}

const extractNumbers = (geomType, nodeString) => {
  const numbers = nodeString.trim();
  if (geomType === 'POINT') {
    const pointNodes = numbers.split(' ').map(coord => {
      return Number(parseFloat(coord).toFixed(2));
    });
    return pointNodes;
  }
  const nodes = numbers.split(',');
  const splitCoords = nodes.map(n => n.trim().split(' '));
  const numberCoords = splitCoords.map((node) => {
    return node.map(coord => Number(parseFloat(coord).toFixed(2)));
  });
  return numberCoords;
}


module.exports =  {fromWkt, toWkt};
