const dp = (nodes, reductionDistace) => {
  const start = nodes[0];
  const end = nodes[nodes.length - 1];

  const distances = getDistances(start, end, nodes);

  if (distances.every(x => x < reductionDistace)) {
    return [start, end];
  }

  const maxNode = indexOfMax(distances);
  const firstSet = nodes.slice(0, maxNode + 1);
  const secondSet = nodes.slice(maxNode);

  return dp(firstSet, reductionDistace)
    .concat(dp(secondSet, reductionDistace).slice(1));
}

const getDistances = (start, end, points) => {
  const distances = points.map(p => distance(start, end, p));
  return distances;
};

const indexOfMax = (distances) => {
  const i = distances.indexOf(Math.max(...distances));
  return i;
}

const distance = (lineStart, lineEnd, point) => {
  if ((lineStart[0] === lineEnd[0]) && (lineStart[1] === lineEnd[1])){
    return lineLength(lineStart, point);
  }
  const top = equationTop(lineStart, lineEnd, point);
  const bottom = lineLength(lineStart, lineEnd);
  return top / bottom;
}

const equationTop = (lineStart, lineEnd, point) => {
  const part1 = (lineEnd[1] - lineStart[1]) * point[0];
  const part2 = (lineEnd[0] - lineStart[0]) * point[1];
  const part3 = (lineEnd[0] * lineStart[1]) - (lineEnd[1] * lineStart[0]);
  const part4 = part1 - part2 + part3;
  return Math.abs(part4);
}

const lineLength = (lineStart, lineEnd) => {
  const yLineLength = (lineEnd[1] - lineStart[1]) ** 2;
  const xLineLenght = (lineEnd[0] - lineStart[0]) ** 2;
  const lineLenght = (yLineLength + xLineLenght) ** 0.5;

  return lineLenght;
}


export { dp };
