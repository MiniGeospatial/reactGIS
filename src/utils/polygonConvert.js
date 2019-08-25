import proj4 from 'proj4';

// const britNatGrid =
proj4.defs("britNatGrid", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");


const toGoogle = (polygon) => {
  const lnglat = polygon.map(xy => proj4('britNatGrid').inverse(xy));
  return lnglat.map(xy => xy.reverse());
}

const toGooglePoint = (point) => {
  const lnglat = proj4('britNatGrid').inverse(point);
  return lnglat.reverse();
}

const toBritNatGrid = (polygon) => {
  const lnglat = polygon.map(xy => xy.reverse());
  return lnglat.map(xy => proj4('britNatGrid').forward(xy));
}

const toBritNatGridPoint = (point) => {
  const lnglat = point.reverse();
  return proj4('britNatGrid').forward(lnglat);
}

export {toBritNatGrid, toBritNatGridPoint, toGoogle, toGooglePoint};
