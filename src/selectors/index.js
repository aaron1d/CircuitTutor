import {createSelector} from 'reselect';
// import {difference, pullAll} from 'lodash';
import {pairArrDiff, ones2D,findIndexFromXY,multiDimFill} from '../utils';
import {drawDim} from '../constants';
//import {getDefaultLocations} from '../constants';
const overlapDim=60;
const width=600;
const height=300;
const snapres=10;
const minDistance=7
const offset=minDistance-1;

// const wg = Math.floor(width/snapres);
// const hg = Math.floor(height/snapres);

// const layoutArray = ones2D(wg,hg);

//import {forIn} from 'lodash';

const getCompsById = (state) => state.compsById;
const getAllIds = (state) => state.allIds;
const getCurrentIndexes = (state) => state.currentIndexes;
const getLeadPoints = (state) => state.leadPointGroupsById;
const getAllIdsStaticOrder = (state) => state.allIdsStaticOrder;

export const getSelectedCompId = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    return ids.filter( (id) => {
      return comps[id].isSelected === true;
    });
  }
)


export const getSelectedComp = createSelector(
  [getCompsById,getSelectedCompId],
  (comps,id) => {
    return id.length ? comps[id] : null;
    // const id = ids.filter( (id) => {
    //   return comps[id].isSelected === true;
    // });
    // return comps[id];
  }
)

export const getAllCenters = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    return ids.map( (id) => {
      return [comps[id].layout.cx, comps[id].layout.cy];
    });
  }
)

export const getSelectedCenter = createSelector(
  [getSelectedComp],
  (comp) => {
    if(comp) { return [comp.layout.cx,comp.layout.cy];}
    else {return null;}
  }
)

export const getNonselectedCompIds = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    return ids.filter( (id) => {
      return comps[id].isSelected === false;
    });
  }
)

export const getLeadPointList = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    let obj;
    return ids.map( (id) => {
      obj={};
      obj['id']=id;
      obj[id.toString()+'.1'] = {cx1: 'cx1', cy1: 'cy1'};
      obj[id.toString()+'.2'] = {cx2: 'cx2', cy2: 'cy2'};

      return obj;
      });
  }
)

export const getNonSelectedCenterList = createSelector(
  [getCompsById,getNonselectedCompIds],
  (comps,ids) => {
    return ids.map( (id) => {
      return [comps[id].layout.cx, comps[id].layout.cy];
    });
  }
)

// export const getConflictingCenters = createSelector(
//   [getSelectedCenter,getNonSelectedCenterList],
//   (selCenter,list) => {
//     let unders;
//     if(selCenter) {
//       //console.log(selCenter);
//       unders = list.filter( (center) => {
//         return ((Math.abs(selCenter[0]-center[0])<overlapDim)&&(Math.abs(selCenter[1]-center[1])<overlapDim));
//       });
//       if(unders.length != 0) {unders.push(selCenter);}
//       else {unders=null;}
//     }
//     return unders;
//   }
// )

export const getConflictingIds = createSelector (
  [getSelectedComp,getCompsById,getAllIds],
  (comp,comps,ids) => {
    let conflicts=[];
    if(comp) {
      conflicts = ids.slice(0,-1).filter( (id) => {
        return ((Math.abs(comp.layout.cx-comps[id].layout.cx)<overlapDim)&&(Math.abs(comp.layout.cy-comps[id].layout.cy)<overlapDim));
        //return id=comp.id ? false : ((Math.abs(comp.layout.cx-comps[id].layout.cx)<overlapDim)&&(Math.abs(comp.layout.cy-comps[id].layout.cy)<overlapDim))
      });
      //if (conflicts.length) { return conflicts.push(comp.id);}
      if (conflicts.length) { return [comp.id, ...conflicts];}
      return null;

      // return conflicts.length ? conflicts.push(comp.id) : null;
    }
  }
)

export const getUnavailableCenterLocations = createSelector(
  [getAllCenters],
  (centers) => {
    let locations = [];
    for (let i=0 ; i < centers.length ; i++) {
      let [cx,cy] = centers[i];
      for (let j = -offset ; j <= offset; j++ ) {
        for (let k = -offset; k <= offset; k++ ) {
            locations.push([cx+j*snapres, cy+k*snapres]);
        }
      }
    }
    return locations;
  }
)


let defaultLocations = [];
for (let i = 4 ; i < (width / snapres - 4) ; i++) {
  for (let j = 4 ; j < (height / snapres - 4) ; j++) {
    defaultLocations.push([i*snapres,j*snapres]);
  }
}

export const getAvailableCenterLocations = createSelector (
  [getUnavailableCenterLocations],
  (unavailableLocations) => pairArrDiff(defaultLocations,unavailableLocations)
)

export const getLeadPointsById = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    let result = {};
    for( let i = 0 ; i < ids.length ; i++) {
      let {cx,cy,rot} = comps[ids[i]].layout;
      let rotr=rot*Math.PI/180;
      result[`${ids[i]}`] = {
        '1': { cx: cx-drawDim*Math.cos(rotr), cy: cy-drawDim*Math.sin(rotr) },
        '2': { cx: cx+drawDim*Math.cos(rotr), cy: cy+drawDim*Math.sin(rotr) }
      };
    }
    console.log("LPbyID",result)
    return result;
  }
)



const wg = Math.floor(width/snapres);
const hg = Math.floor(height/snapres);
let layoutArray = [];
for (let i = 0 ; i<wg ; i++) {
  layoutArray[i] = [];
  for (let j = 0; j<hg ; j++) {
    layoutArray[i][j] = 1;
  }
}

export const getCurrentLayoutArray = createSelector(
  [getCompsById,getAllIds],
  (comps,ids) => {
    let theArray = layoutArray;
    for (let i = 0 ; i < ids.length ; i++) {
      let xc = comps[ids[i]].layout.cx/snapres;
      let yc = comps[ids[i]].layout.cy/snapres;
      let rot = comps[ids[i]].layout.rot;
      for (let j=-2 ; j <3 ; j++) {
        for (let k=-2 ; k < 3 ; k++) {
          theArray[xc+j][yc+k]=0;
        }
      }
      if (rot%180 == 0) {
        for (let j=-1 ; j<2 ; j++) {
          theArray[xc-3][yc+j] = 0;
          theArray[xc+3][yc+j] = 0;
        }
      }
      else if (rot%90 == 0) {
        for (let j=-1 ; j<2 ; j++) {
          theArray[xc+j][yc-3] = 0;
          theArray[xc+j][yc+3] = 0;
        }
      }
    }
    console.log("theArray",theArray)
    return theArray;
  }
)


export const getSchematicNodeArray = createSelector(
  [getLeadPoints,getAllIdsStaticOrder],
  (groups,ids) => {
    if (!!ids[0]) {
      let nodeArray=[];
      let nalength=0;
      let gp=groups[ids[0]];
      nodeArray.push({x: gp[1].x, y: gp[1].y});
      nodeArray.push({x: gp[2].x, y: gp[2].y});

      var match=false;
      for (var i=1; i<ids.length; i++) {
	       gp=groups[ids[i]];
	       for (var j=1; j<3 ; j++) {
		        nalength=nodeArray.length;
		        match=false;
		        for (var k=0; k<nalength; k++) {
			         if((gp[j].x == nodeArray[k].x)&&(gp[j].y == nodeArray[k].y)) {match=true; break;}
		         }
		         if(!match) { nodeArray.push({x: gp[j].x, y: gp[j].y}); }
	       }
      }
      console.log("nodeArray",nodeArray);
      return nodeArray;
    }
    else {
      return [];
    }

  }
)

// returns list of objects like {1: nodeNumber1, 2: nodeNumber2}
export const getNodePairsMatchedToComps = createSelector(
  [getSchematicNodeArray,getLeadPoints,getAllIdsStaticOrder],
  (array,groups,ids) => {
    if (!!ids[0]) {
      let group;
      let nparray = ids.map( (id) => {
        group = groups[id];
        return {
          '1': findIndexFromXY(array,group[1].x,group[1].y),
          '2': findIndexFromXY(array,group[2].x,group[2].y),
        };
      });
      console.log("NPmatchedToComps",nparray);
      return nparray;
    }
    else {
      return [];
    }

  }
)


export const getEdgeList = createSelector(
  [getNodePairsMatchedToComps],
  (pairs) => {
    let edges = [];
    for (let i=0; i<pairs.length; i++) {
      edges.push([pairs[i][1],pairs[i][2]])
    }
    console.log('edgeList',edges)
    return edges;
  }
)

//------------------------------------- Getting the cycles--------------------------------------------//


// function findAllCycles() {
//     var i, j, len;

//     // var st1 = new Date().getTime();

//     var nodes = graph.flat().reduce((accumulator,value) => accumulator.includes(value) ? accumulator : [...accumulator, value], []);
//         for (i = 0; i < nodes.length; i++) {
//         findNewCycles( [nodes[i]] );
//     }

//     // var st2 = new Date().getTime();
//     // console.log("time: " + (st2-st1));
// };

var cycles = [];

export const findAllCycles = createSelector(
[getNodePairsMatchedToComps, getEdgeList],
(pairs, edgeList) => {
    cycles = [];
    var i, j, len;
    var nodes = edgeList.flat().reduce((accumulator,value) => accumulator.includes(value) ? accumulator : [...accumulator, value], []);
        for (i = 0; i < nodes.length; i++) {
          findNewCycles( [nodes[i]], edgeList, cycles );
        }
        console.log('cycles: ', cycles,'-------------------------');
        return cycles;
  }
)

function findNewCycles(path,graph,cycles) {
    var startNode = path[0],
        nextNode;

    // visit each edge and each node of each edge
    for (var i = 0; i < graph.length; i++) {
        var edge = graph[i];
        for (var j = 0; j < 2; j++) {
            var node = edge[j];
            if (node === startNode) //  edge refers to our current node
            {
                nextNode = edge[(j + 1) % 2];
                if ( !visited(nextNode, path) ) { //  neighbor node not on path yet
                    //  explore extended path
                    findNewCycles( [nextNode].concat(path), graph, cycles );
                }
                else if ( (path.length > 2) && (nextNode === path[path.length - 1]) ) { //  cycle found
                    path = rotate_to_smallest(path);
                    if ( isNew(path, cycles) ) {
                        cycles.push(path);
                    }
                }
            }
        }
    }
}

// check if vertex n is contained in path
function visited(node, path) {
    return (path.indexOf(node) !== -1);
}

function isNew(path, cycles) {
    // for (var i = 0; i < cycles.length; i++) {
    //     if ( equal(path, cycles[i]) ) {
    //         return false;
    //     }
    // }
    for (var i = 0; i<cycles.length; i++) {
        let inv = invert(path);
        if ( ( equal(path, cycles[i])) || ( equal(inv, cycles[i])) ) {
            return false;
        }
    }

    return true;
}

function equal(path1, path2) {
    if (path1.length !== path2.length) {
        return false;
    }

    for (var i = 0; i < path1.length; i++) {
        var node1 = path1[i];
        for (var j = 0; j < path2.length; j++) {
            var node2 = path2[j];
            if (node1 === node2) {
                break;
            }
        }
        if (j === path2.length) {
            return false;
        }
    }

    return true;
}

function rotate_to_smallest(array) {
    let min_index = array.indexOf(Math.min.apply(Math,array));
    let shifts = array.length-min_index
    let new_array = array;
    for (let i=0; i<shifts; i++) {
        new_array.unshift(new_array.pop());
    }
    return new_array;
}
function invert(path) {
    return [...path.slice(1), path[0]].reverse();
}



// Good, but don't need

// export const getGraphMatrix = createSelector(
//   [getNodePairsMatchedToComps,getAllIdsStaticOrder,getCompsById,getSchematicNodeArray],
//   (nodePairs,ids,comps,nodeArray) => {
//     const len = nodeArray.length;
//     if (len) {
//       let pair;
//       let matrix = multiDimFill([len,len],null);
//       for (let i=0; i<nodePairs.length; i++) {
//           pair=nodePairs[i];
//           console.log('test',nodePairs,pair,matrix);
//           matrix[pair[1]][pair[2]] = comps[ids[i]];  //default source orientation is 1 to 2 is increase in voltage or current direction
//           matrix[pair[2]][pair[1]] = comps[ids[i]];
//       }
//       return matrix;
//     }
//     else { return [[]];}
//   }
// )




export const getDirectedNodeAdjacencyListWithIds = createSelector(
  [getNodePairsMatchedToComps,getAllIdsStaticOrder,getCompsById,getSchematicNodeArray],
  (nodePairs,ids,comps,nodeArray) => {
    const len=nodeArray.length;
    if (len) {
      let list = Array(len);
      for (var i=0; i<len; i++) {
        list[i]=[];
      }
      let comp;
      for (var i = 0; i<nodePairs.length; i++) {
          comp=nodePairs[i];

          // const ino = 0; //index of node
          // const iid = 1; //index of id
          // const ict = 2; //index of comp type
          // const idir = 3; //index of direction +/- 1

          list[nodePairs[i][1]].push([nodePairs[i][2],ids[i],comps[ids[i]].compType,1]);
          list[nodePairs[i][2]].push([nodePairs[i][1],ids[i],comps[ids[i]].compType,-1]);
      }
      console.log('listend',list);
      return list;
    }
    else {return [[]]};
  }
)

export const getIdIndexesOfWires = createSelector(
  [getAllIdsStaticOrder,getCompsById],
  (ids,comps) => {
    let wireIndexes=[];
    for (let i=0; i<ids.length; i++) {
      if (comps[ids[i]].compType=='W') {
        wireIndexes.push(i);
      }
    }
    return wireIndexes;
  }
)



const ino = 0; //index of node
const iid = 1; //index of id
const ict = 2; //index of comp type
const idir = 3; //index of direction +/- 1
