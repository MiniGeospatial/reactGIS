const fromWkt = (wkt) => {
  const numbs = removeText(wkt);
  const nodes = extractNumbers(numbs);
  return nodes;
}

const removeText = (wkt) => {
  const lowercase = wkt
    .toLowerCase()
    .replace('polygon', '')
    .replace('((', '')
    .replace('))', '')
    .trim();
  return lowercase;

}

const extractNumbers = (numbers) => {
  const nodes = numbers.split(', ');
  const nodeObj = nodes
    .map(n =>
      n.split(' ')
    ).map(node => node.map(coord => Number(parseFloat(coord).toFixed(2))));
  return nodeObj;
}

const toWkt = (nodes) => {
  const nodeString = nodes.map(xy => `${xy[0]} ${xy[1]}`).join(', ')
  return `POLYGON((${nodeString}))`
}
module.exports =  {fromWkt, toWkt};
