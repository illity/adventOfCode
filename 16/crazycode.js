var fs = require('fs');

var inp = fs.readFileSync("16/test.txt",'utf-8').replaceAll('\r','');
var x = inp.replace('S','>')

r90 = {
     '>': 'v',
     'v': '<',
     '<': '^',
     '^': '>',     
}
r270 = {
     '>': '^',
     '^': '<',
     '<': 'v',
     'v': '>'
}


movementSet = {
     '^':'-1,0',
     '>':'0,1',
     '<':'0,-1',
     'v':'1,0',
}

add = (x,y) =>  (+x.split(',')[0] + +y.split(',')[0])+
                ','+
                (+x.split(',')[1] + +y.split(',')[1])


forward = (mapString) => {
     map = mapString.split('\n').map(x=>Array.from(x))
     for (arrow of '<>^v') {
          index = map.map(x=>x.indexOf(arrow))
          y = index.filter(x=>x!=-1)[0]
          x = index.findIndex(x=>x>0)
          if (x!=-1) {
               // console.log(movementSet[arrow])
               var [xf,yf] = add(movementSet[arrow], x+','+y).split(',') 
               // console.log(xf,yf, map[xf][yf])
               if (map[xf][yf] == 'E') return 'done'
               if (map[xf][yf] == '#') return false
               else {
                    map[xf][yf] = map[x][y]
                    // console.log(x,y,xf,yf)
                    // console.log(map[x][y])
                    map[x][y] = '.'
                    return map.map(x=>x.join('')).join('\n')
               }
               // console.log(x,y)
               break
          }
     }
}

right = (mapString) => {
     current = Array.from(mapString).filter(x=>!['#','\n','.','E'].includes(x))[0]
     return mapString.replace(current, r90[current])
}

left = (mapString) => {
     current = Array.from(mapString).filter(x=>!['#','\n','.','E'].includes(x))[0]
     return mapString.replace(current, r270[current])
}

fs.writeFileSync("16/output.txt", '', 'utf-8');



var count = 0
// var states = []

bestCosts = {

}


solve = (mapString, cost) => {
     count++
     //lost
     if (mapString=='done') return cost
     if (!mapString) return 999999999
     current = Array.from(mapString).filter(x=>!['#','\n','.','E'].includes(x))[0]
     state = mapString.indexOf(current) + current
     if (cost > bestCosts[state]) 
          return 9999999999
     // if (!map.map(x=>x.join('')).join('\n').includes('E')) 
     // fs.appendFileSync("16/output.txt", mapString+Array(39).fill(0).map(x=>'\n').join(''), 'utf-8');
     // beenplaces.push(mapString.in)
     // console.log('state:', state)
     // states.push(state)
     if (forward(mapString) == 1) {
          return cost
     }
     bestCosts[state] = cost
     // console.log(states)
          return  Math.min(
               solve(left(mapString), cost+1000),
               solve(right(mapString), cost+1000),
               solve(forward(mapString), cost+1),
          )
     

}


x = solve(x, 0)
console.log(x)