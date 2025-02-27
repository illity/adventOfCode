var fs = require('fs');

var inp = fs.readFileSync("16/test.txt",'utf-8').replaceAll('\r','');
var x = inp //.replace('S','>')

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

map = x.split('\n').map(x=>Array.from(x))

index = map.map(x=>x.indexOf('S'))
y = index.filter(x=>x!=-1)[0]
x = index.findIndex(x=>x>0)

forward = (cursor) => {
     
          
          y = cursor.y
          x = cursor.x
          arrow = cursor.arrow
          if (x!=-1) {
               // console.log(movementSet[arrow])
               var [xf,yf] = add(movementSet[arrow], x+','+y).split(',') 
               // console.log(xf,yf, map[xf][yf])
               if (map[xf][yf] == 'E') return 'done'
               if (map[xf][yf] == '#') return false

               else if (map[xf][yf] == '.') {
                    // console.log(x,y,xf,yf)
                    // console.log(map[x][y])
                    return {
                         'x': xf,
                         'y': yf,
                         'arrow': arrow
                    }
               }
               // console.log(x,y)
          }
}

right = (cursor) => {
     return {
          'x': cursor.x,
          'y': cursor.y,
          'arrow': r90[cursor.arrow]

     }
}
left = (cursor) => {
     return {
          'x': cursor.x,
          'y': cursor.y,
          'arrow': r270[cursor.arrow]

     }
}

fs.writeFileSync("16/output.txt", '', 'utf-8');



var count = 0
// var states = []

bestCosts = {
}

statesPath = []

solve = (cursor, cost, states='') => {
     if (cursor=='done') {
          statesPath.push([states, cost])
          return cost
     }
     if (!cursor) return 999999999
     state = cursor.x+','+cursor.y+','+cursor.arrow
     if (cost > bestCosts[state])  {
          return 9999999999
     }
     count++
     // console.log(count)
     //lost
     bestCosts[state] = cost
     
     // if (!map.map(x=>x.join('')).join('\n').includes('E')) 
     // beenplaces.push(mapString.in)
     // console.log('state:', state)
     // states.push(state)
     // currentMap = map.map(x=>x.map(x=>x))
     // currentMap[cursor.x][cursor.y] = cursor.arrow
     // fs.appendFileSync("16/output.txt", currentMap.map(x=>x.join('')).join('\n')+cost+Array(39).fill(0).map(x=>'\n').join(''), 'utf-8');
     // console.log(currentMap.map(x=>x.join('')).join('\n'))
     
     // console.log(states)
          return  Math.min(
               solve(left(cursor), cost+1000, states+';'+state),
               solve(right(cursor), cost+1000, states+';'+state),
               solve(forward(cursor), cost+1, states+';'+state),
          )
     

}

console.log(x)
bestCost = solve({'x': x, 'y':y, 'arrow':'>'}, 0)
statesPath = statesPath.filter(x=>x[1]==bestCost)

positions = new Set()
for (path of statesPath)
     path[0].split(';').filter(x=>x.includes(',')).map(x=>x.split(',')[0]+','+x.split(',')[1]).map(x=>positions.add(x))

console.log(positions)