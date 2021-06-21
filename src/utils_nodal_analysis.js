
// const adjList1 = [
// 	[[1,10,'V',1],[3,60,'W',-1]],								//0
// 	[[0,10,'V',-1],[2,20,'R',-1]],							//1
// 	[[1,20,'R',1],[4,40,'W',-1],[3,30,'I',-1]],	//2
// 	[[0,60,'W',1],[2,30,'I',1],[5,70,'W',-1]],		//3
// 	[[2,40,'W',1],[5,50,'R',-1]],								//4
// 	[[3,70,'W',1],[4,50,'R',1]]									//5
// ];

// const adjacencyList = [
// [[1,10,'V',1],[3,80,'W',-1]],	//0
// [[0,10,'V',-1],[2,20,'R',-1],[8,25,'W',1]],		//1
// [[1,20,'R',1],[3,30,'I',-1],[4,40,'W',-1]],		//2
// [[0,80,'W',1],[2,30,'I',1],[5,90,'W',-1]],		//3
// [[2,40,'W',1],[5,50,'R',-1],[6,60,'R',-1]],		//4
// [[3,90,'W',1],[2,50,'R',1],[7,15,'W',-1]],		//5
// [[4,60,'R',1],[2,70,'R',-1],[11,65,'W',1],[12,75,'R',-1]],		//6
// [[5,15,'W',1],[6,70,'R',1],[13,95,'W',-1]],					//7
// [[1,25,'W',-1],[9,35,'W',-1]],					//8
// [[8,35,'W',1],[10,45,'I',1]],					//9
// [[9,45,'I',-1],[11,55,'W',-1]],					//10
// [[10,55,'W',1],[6,65,'W',-1]],					//11
// [[6,75,'R',1],[13,85,'R',-1]],					//12
// [[7,95,'W',1],[12,85,'R',1]]					//13
// ];


const arraySum = (array) => {
	return array.reduce(
  ( acc, cur ) => acc + cur,
  0);
}

const ino = 0; //index of node
const iid = 1; //index of id
const ict = 2; //index of comp type
const idir = 3; //index of direction +/- 1

export const getNodalGroups = (adj) => {
	const len=adj.length;
	let exhausted = Array(len).fill(false);
	let added = Array(len).fill(false);
	let queue = [];
	let groups = [];
	let traverse=true;
	let node=0;
	let nodeidx=0;
	let groupidx=-1;
	let current;
	let isWired = false;


	while (traverse) {

		node = exhausted.indexOf(false);
		node = (node == -1) ? 0 : node;

		groupidx +=1;
		groups.push([]);
  		isWired=false;

		do {

			if(queue.length>0) {
				node=queue.pop();
			}

			for (var j=0; j<adj[node].length; j++) {


				current = adj[node][j];

				if(current[ict]=='W') {
					isWired = true;

					if(!added[node]) {
						groups[groupidx].push(node);
						added[node]=true;
					}

					if(!added[current[ino]]) {
						groups[groupidx].push(current[ino]);
						added[current[ino]]=true;
          				queue.unshift(current[ino])
					}

				}
			}
			exhausted[node]=true;

		} while (queue.length>0)
		if (!isWired) {groups[groupidx].push(node);}
		traverse = !(arraySum(exhausted)==len);

	}
	return groups;
}


export const getNodeMap = (nodalGroups) => {
 let nodeMap = [];
 for (var i=0; i<nodalGroups.length; i++) {
	 for (var j=0; j<nodalGroups[i].length; j++) {
		 nodeMap[nodalGroups[i][j]]=i;
	 }
 }
 return nodeMap;
}

const ino = 0; //index of node
const iid = 1; //index of id
const ict = 2; //index of comp type
const idir = 3; //index of direction +/- 1

export const getReducedAdjacencyList= (adjList,nodalGroups,nodeMap) => {
  let redAdjList=Array(nodalGroups.length).fill(null);
  let temp1, temp2;
  for (let i=0; i<nodalGroups.length; i++) {
    redAdjList[i]=[];
    for (let j=0; j<nodalGroups[i].length; j++) {
        temp1 = adjList[nodalGroups[i][j]];
        for (let k=0; k<temp1.length; k++) {
          if(temp1[k][ict] != 'W') {
            temp2 = temp1[k];
            temp2[ino] = nodeMap[temp2[ino]];
            redAdjList[i].push(temp2);
          }
        }

    }
  }
}
