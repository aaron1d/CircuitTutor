import {drawDim} from './constants';

export const pairArrDiff = (arrOne,arrTwo) => {
  let result = [];
   checki: for ( let i = 0 ; i < arrOne.length ; i++) {
    let [temp0,temp1] = arrOne[i];
    for ( let j = 0 ; j < arrTwo.length ; j++) {
      if ((temp0 == arrTwo[j][0])&&(temp1 == arrTwo[j][1])) {
        continue checki;
      }
    }
    result.push([temp0,temp1]);
  }
  return result;
}

export const generateId = () => Math.floor(Math.pow(2,20)*Math.random()) ;

export const ones2D = (m,n) => Array(m).fill(Array(n).fill(1));


export const getp2 = (cx,cy,rot) => {
  switch(rot) {
    case 0:
      return {x: cx-drawDim, y: cy};
    case 45:
      return {x: cx-drawDim, y: cy-drawDim};
    case 90:
      return {x: cx, y: cy-drawDim};
    case 135:
      return {x: cx+drawDim, y: cy-drawDim};
    case 180:
      return {x: cx+drawDim, y: cy};
    case 225:
      return {x: cx+drawDim, y: cy+drawDim};
    case 270:
      return {x: cx, y: cy+drawDim};
    case 315:
      return {x: cx-drawDim, y: cy+drawDim};
    default:
      return {x: cx-drawDim, y: cy};
  }
}

export const getp1 = (cx,cy,rot) => {
  switch(rot) {
    case 0:
      return {x: cx+drawDim, y: cy};
    case 45:
      return {x: cx+drawDim, y: cy+drawDim};
    case 90:
      return {x: cx, y: cy+drawDim};
    case 135:
      return {x: cx-drawDim, y: cy+drawDim};
    case 180:
      return {x: cx-drawDim, y: cy};
    case 225:
      return {x: cx-drawDim, y: cy-drawDim};
    case 270:
      return {x: cx, y: cy-drawDim};
    case 315:
      return {x: cx+drawDim, y: cy-drawDim};
    default:
      return {x: cx+drawDim, y: cy};
  }
}


export const findIndexFromXY = (arraytosearch, xval, yval) => {
  for (var i = 0; i < arraytosearch.length; i++) {
    if ((arraytosearch[i].x == xval)&&(arraytosearch[i].y == yval)) {
      return i;
    }
  }
return -1;
}

export const multiDimFill = (indexArray,fillVal) => {
  var result = [];
  if (indexArray.length == 1) {
    for (var i = 0; i < indexArray[0]; i++) {
      result.push(fillVal);
    }
  } else {
    var children = indexArray.slice(1);
    for (var i = 0; i < indexArray[0]; i++) {
      result.push(multiDimFill(children,fillVal));
    }
  }
  return result;
}

// export const pairArrayToUniqueTupleArray = (array) => {
//     let newArray = [];
//     let temp0, temp1;
//     newAray.push(array[1]);
//     for (let i=1; i<array.length; i++) {
//       temp0=array[i][0];
//       temp1=array[i][1];
//
//
//     }
//
// }
