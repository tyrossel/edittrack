import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export function debounce(fn: (...args: any[]) => any, delay = 0): any {
  let id : number | undefined;
  return (...args: any) => {
    if (id !== undefined) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
      id = undefined;
    }, delay);
  };
}

export function setZ(straightSegment: Feature<LineString>, first: number, last: number) {
  const geometry = straightSegment.getGeometry();
  const coordinates = geometry.getCoordinates();
  console.assert(coordinates.length === 2);
  if (geometry.getLayout() === 'XY') {
    coordinates[0].push(first);
    coordinates[1].push(last);
  } else {
    coordinates[0][2] = first;
    coordinates[1][2] = last;
  }
  geometry.setCoordinates(coordinates);
  console.assert(geometry.getLayout() === 'XYZ');
}