const area = (nodes) => {
  const areas = nodes.slice(0, [nodes.length -1]).map((n, i) => {
    return (nodes[i][0] * nodes[i+1][1]) - (nodes[i+1][0] * nodes[i][1])
  })
  const sum = areas.reduce((total, num) => total + num);

  return Math.abs(sum / 2);
}

export { area };
