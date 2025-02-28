var fs = require('fs');

var inp = fs.readFileSync("20/input.txt",'utf-8').replaceAll('\r','');
var x = inp //.replace('S','>')
map = x.split('\n').map(x=>Array.from(x))

add = (x,y) =>  (+x.split(',')[0] + +y.split(',')[0])+
                ','+
                (+x.split(',')[1] + +y.split(',')[1])

var [szX, szY] = [map[0].length, map.length]

actions = [
    //O powerup tem 3 estados:
    // 2 -> pode ser usado 2 vezes
    // 1 -> pode ser usado 1 vez
    // 0 -> já foi consumido
    ...['1,0','-1,0','0,1','0,-1'].map(v=>
        (state) => {
            [powerup, pos] = state.split(';')
            p = add(pos, v)
            var [x,y] = p.split(',')
            if (powerup>0) {
                return (x>=0&&y>=0&&x<szX&&y<szY)?((powerup-1)+';'+p):false
            }
            return (x>=0&&y>=0&&x<szX&&y<szY&&map[x][y]!=='#'?'0'+';'+p:false)
        }
    ),
]





var y = 0
findPos = c => map.map((x,i)=>x.map((xx,j)=>[xx,i,j]).filter(x=>x[0]==c)).filter(x=>x.length).flat(2).filter((x,i)=>i).join(',')
nextState = (state) => (actions.map(action => action(state)).filter(x=>x).map(x=>(x)))


routeCost = (startState, endState = false, maxCost = false, statesDepth) => {
    q = [[startState]]
    if (!statesDepth) statesDepth = {}
    for(let i = 0; q.length; i++) {
        qcopy = q.flat()
        q = q.map(x=>x.map(xx=>(statesDepth[xx]?false:(nextState(xx))))).flat().filter(x=>x)
        qcopy.map(x=>statesDepth[x]?false:statesDepth[x]=i)
        if (endState&&statesDepth[endState]) return statesDepth[endState]
        if (maxCost&&i>maxCost) return i
    }
    return statesDepth
}

S = '0'+';'+findPos('S')
E = '0'+';'+findPos('E')
// statesDepth
// console.log(Object.entries(routeCost(S)).map(([k,v],y)=>routeCost(k)))
noCheatCost = routeCost(S)
// console.log(noCheatCost)
statesDepthNoCheatFromEnd = routeCost(E, statesDepth = {})
noCheatCost[S] = 0
statesDepthNoCheatFromEnd[E] = 0

// console.log(statesDepthNoCheatFromEnd)
//costFromEach
// console.log(noCheatCost)
// console.log(noCheatCost)
    // console.log(Object.entries(noCheatCost).map(([state,cost],y)=>cost+routeCost(Array.from(state).map((x,i)=>i==0?2:x).join(''),E, noCheatCost[E]-cost)).map(x=>84-x).filter(x=>x>0).reduce((acc, curr) => {
    //     acc[curr] = (acc[curr] || 0) + 1;
    //     return acc;
    //   }, {})
    // )
//Para cada estado, procurar o caminho mais curto usando cheats
//o powerup deve ser ativado logo após
//Se o caminho for maior que (o menor caminho sem cheats - o custo do caminho até o estado sem cheats), então ele é inútil
// console.log(routeCost(S,E,3))
// console.log(actions[0](map, '0,0'))

// console.log(out)

out = Object.entries(noCheatCost)
.map(
    //Para cada ponto
    ([state,cost],y)=>
        state
        // vou verificar o resultado do cheat
        
        //state.
        //.map(x=>nextState(x)).flat()
        //Para cada resultado, vou verificar qual a distância até o fim
        // .map(x=>cost+statesDepthNoCheatFromEnd[x])
        // //Alguns dão em parede
        // .filter(x=>x)
        // .reduce((a,b)=>(a<b?a:b))
)

costAfter = {}
cheats = 2
// console.log(noCheatCost)
for ([state, cost] of Object.entries(noCheatCost)) {
    //pra cada estado determinar os finais possíveis a cada 20 cheats e o custo associado
    // console.log(cost)
    pos = state.split(';')[1]
    // console.log(pos)
    x = [cheats+';'+pos]
    // console.log(x)
    // console.log(x)
    
    for (let i = 0; i<cheats; i++) {
        x = [...new Set(x.map(state=>nextState(state)).flat())]
        x.map(x=>x.split(';')[1].split(',')).filter(([x,y])=>map[x][y]!=='#').map(x=>pos+';'+x.join(',')).map(x=>costAfter[x]=costAfter[x]?Math.min(i+1, costAfter[x]):i+1)
        // console.log(costAfter)
        // console.log(x.map(x=>'0;'+x.split(';')[1]))
        
    }
    // break
    // for (let j = 0; j<x.length; j++) {
    //     [xx, yy] = (x[j].split(';')[1])
    //     // if (map[xx][yy] == '#') continue
    //     id_cheat = pos+'/'+x[j].split(';')[1]
    //     // console.log(costAfter[x[i]])
    //     // console.log(costAfter)
    //     if (!costAfter[id_cheat] || (cost+cheats < costAfter[id_cheat]))
    //         costAfter[id_cheat]=cost+cheats
    //     // console.log(costAfter)
    // }
    // break
    // console.log(costAfter)
    // break
    // x = nextState(x)
    // break    
    // break
}
// console.log(costAfter)
// out = Object.entries(costAfter).map(([state,cost]) => {
//     // console.log(cost)
//     // console.log(state.split(';'))
//     [s,f] = state.split(';')
//     console.log(s)
//     // console.log(state)
//     return noCheatCost['0;'+s]+statesDepthNoCheatFromEnd['0;'+f]+cost
// })
// .filter(x=>x>0)
// // .length
// .reduce((acc, curr) => {
//         acc[curr] = (acc[curr] || 0) + 1;
//         return acc;
//       }, {})
// console.log(out)

// possibleCheats = []
validPositions = []
for (let i = 0; i<szX; i++) {
    for (let j = 0; j<szY; j++) {
        if (map[i][j] == '#') continue
        validPositions.push(i+','+j)
    }
}
seet = new Set(validPositions)
cheats = 20
movingMask = []
for (let i = -cheats; i<cheats+1; i++) {
    for (let j = -cheats; j<cheats+1; j++) {
        if (Math.abs(i)+Math.abs(j)>cheats) continue
        movingMask.push(i+','+j)
    }
}
// console.log(movingMask)

d = (x,y) => (Math.abs(x.split(',')[0]-y.split(',')[0])+ +Math.abs(x.split(',')[1]-y.split(',')[1]) )
maaap = validPositions.map(position=>movingMask.map(x=>{
    return position+';'+add(position,x)
})).flat()
// console.log(maaap)
maaap = maaap.filter(x=>seet.has(x.split(';')[0])&&seet.has(x.split(';')[1]))
maaap=maaap.map(x=>x+'/'+d(x.split(';')[0], x.split(';')[1]))
// console.log(maaap)
out = maaap
.filter(x=>x.split('/')[1]<cheats+1)
.filter(x=>x.split('/')[1]>0)

.map(x=> {
    // console.log(x);
    var [y,z] = x.split('/')
    var [p1, p2] = y.split(';')
    // console.log(p1, p2)

    //custo pra chegar até o cheat portal
    //custo para ir do portal de saída até o fim
    cost = (noCheatCost['0;'+p1]+statesDepthNoCheatFromEnd['0;'+p2])+ +z
    // console.log(cost)
    // temp = map.map(x=>x.map(x=>x))
    // // console.log(p1.split(','))
    // var [xx,yy] = p1.split(',')
    // var [xxx, yyy] = p2.split(',')
    // temp[xx][yy] = '1'
    // temp[xxx][yyy] = '2'
    // temp = temp.map(x=>x.join('')).join('\n')
    // console.log(temp)
    // console.log(cost)
    // console.log(z)
    // console.log(cost)
    return cost
}
)
.map(x=>noCheatCost[E]-x)
.filter(x=>x>=100)
// .filter(x=>x<84)

.length
// .reduce((acc, curr) => {
//         acc[curr] = (acc[curr] || 0) + 1;
//         return acc;
//       }, {})
console.log(out)
// console.log(maaap)