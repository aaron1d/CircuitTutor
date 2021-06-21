export const drawDim = 30;

export const trimDim = drawDim/Math.sqrt(2)-20;
export const exDim = drawDim*(Math.sqrt(2)-1);
export const labelOffset = drawDim/2.5;
export const labelFontSize = 15;

export const selectedColor = 'blue';
export const crosshairColor = 'orange';

const width=600;
const height=300;
export const snapres=10;

export const wg = Math.floor(width/snapres);
export const hg = Math.floor(height/snapres);

export const nodeLabelWidth = drawDim/1.5;
export const nodeLabelHeight = drawDim/3;
export const nodeLabelBackground = 'orange';
export const nodeLabelFontSize = 10;



// let gridArray =
// export const getDefaultLocations = function() {
//   let defaultLocations = [];
//   for (let i = 4 ; i < (width / snapres - 4) ; i++) {
//     for (let j = 4 ; j < (height / snapres - 4) ; j++) {
//       defaultLocations.push([i*snapres,j*snapres]);
//     }
//   }
//   return defaultLocations;
// }
