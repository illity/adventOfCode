var fs = require('fs');

var inp = fs.readFileSync("18/input.txt", 'utf-8').replaceAll('\r', '');
var data = inp.split('\n'); 
sz = 71
bytes = 1024
var map = Array(sz).fill(0).map(x=>Array(sz).fill('.'))
for (let i = 0; i<bytes; i++) {
    [x,y] = data[i].split(',')
    // console.log(x,y)
    map[y][x] = '#'
}

add = (x,y) =>  (+x.split(',')[0] + +y.split(',')[0])+
                ','+
                (+x.split(',')[1] + +y.split(',')[1])

// states = []



// bestCosts = {
// }



// shortest = (map, pos = '0,0', cost=0) => {
//     // console.log(bestCosts)
//     console.log(Object.keys(bestCosts).length)
//     var [x,y] = pos.split(',')
//     if (x<0 | y<0 | x>=sz | y>=sz) return 99999999
//     if (cost>bestCosts[pos]) return 99999999
//     bestCosts[pos] = cost
//     if (map[y][x]=='#') return 99999999
//     if (x==sz-1 && y == sz-1) {
//         return cost        
//     }
//     // temp = map.map(x=>x.map(x=>x))
//     // temp[y][x] = 'O'
//     // console.log(temp.map(x=>x.join('')).join('\n'))
//     // if (map[x][y] == '#') return false
//     // if (x==5) return false
//     return Math.min(
//         shortest(map, add(pos, '0,-1'), cost+1),
//         shortest(map, add(pos, '0,1'), cost+1),
//         shortest(map, add(pos, '-1,0'), cost+1),
//         shortest(map, add(pos, '1,0'), cost+1)
//     )
// }

// console.log(shortest(map, '0,0', 0))
// console.log(Object.values(bestPaths))
// console.log(Math.min(1,2,3,4,999999))

// console.log(map.map(x=>x.join('')).join('\n'))


function pathfind(maze, pos, depth) {

    const [startX, startY] = pos.split(',').map(x=>+x);

    const sz = maze.length;
    const d = Array.from({length:sz}, () => Array(sz).fill(0)); 
    d[startX][startY] = 1;
    depth++;

    const queue = [[startX, startY]]; 

    while (queue.length > 0) {
        const newQueue = [];

        for (let i = 0; i < queue.length; i++) {
            const [x, y] = queue[i];

            if (x < sz-1 && maze[x+1][y] !== '#' && d[x+1][y] === 0) {
                d[x + 1][y] = depth;
                newQueue.push([x + 1, y]);
            }

            if (y < sz-1 && maze[x][y+1] !== '#' && d[x][y+1] === 0) {
                d[x][y + 1] = depth;
                newQueue.push([x, y + 1]);
            }

            if (x > 0 && maze[x-1][y] !== '#' && d[x-1][y] === 0) {
                d[x - 1][y] = depth;
                newQueue.push([x-1, y]);
            }

            if (y > 0 && maze[x][y-1] !== '#' && d[x][y-1] === 0) {
                d[x][y - 1] = depth;
                newQueue.push([x, y - 1]);
            }
        }

        queue.length = 0; 
        queue.push(...newQueue); 
        depth++;

        if (d[sz - 1][sz - 1] > 0) {
            break;
        }
    }

    return depth-1;
}

console.log(pathfind(map, '0,0', 0))

steps = 0
last = 0

for (var i = 0; ; i++) {
    [x,y] = data[i].split(',')
    // console.log(x,y)
    map[y][x] = '#'
    steps = pathfind(map, '0,0', 0)
    if (steps<last) break
    last = steps
    // console.log(i, steps)
    // console.log(map.map(x=>x.join('')).join('\n'))
}
console.log(data[i])