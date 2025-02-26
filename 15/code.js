var fs = require('fs');

var inp = fs.readFileSync("15/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n\n')
var [map, moves] = x
moves = moves.split('\n').join('')

add = (x,y) =>  (+x.split(',')[0] + +y.split(',')[0])+
                ','+
                (+x.split(',')[1] + +y.split(',')[1])

move = (map, pos, destination, movement) => {
     var [dX,dY] = destination.split(',')
     var [x,y] = pos.split(',')
     if (map[dX][dY] == '#') return false
     if (map[dX][dY] == '.') {
          map[dX][dY] = map[x][y]
          map[x][y] = '.'
          return true
     }
     if (map[dX][dY] == 'O') {
          if (move(map, destination, add(destination, movement), movement)) {
               move(map, pos, destination, movement)
               //map[dX][dY] = map[x][y]
               return true
          }
     }
     return false;
}


pos = map.indexOf('@')
map = map.split('\n').map(x=>Array.from(x).map(x=>x))
var [w, h] = [map.length, map[0].length]
pos = (pos/(w+1)>>0)+','+pos%(w+1)
for (let i = 0; i<moves.length-1; i++) {
     
     
     movement = {
          '^':'-1,0',
          '>':'0,1',
          '<':'0,-1',
          'v':'1,0',
     }[moves[i]]

     if (move(map, pos, add(pos, movement), movement)) pos = add(pos, movement)
}


var soma = 0
for (let i = 0; i < w; i++) {
     for (let j = 0; j<h; j++) {
          if (map[i][j] == 'O') soma += 100*i+j
     }
}

console.log(soma)





move = (map, pos, destination, movement, auxiliar = false) => {
     var [dX,dY] = destination.split(',')
     var [x,y] = pos.split(',')
     if (map[dX][dY] == '#') return false
     //movimentos baixo e cima
     //console.log(map.map(x=>x.join('')).join('\n'))
     if (map[dX][dY] == '.') {
//          console.log(movement.split(',')[1])
          if (movement.split(',')[1]==0)
          if (!auxiliar) {
               if (map[x][y] == '[')
                    if (!move(map, add(pos,'0,-1'), add(destination,'0,-1'), movement, true)) {
                         return false
                    }
               if (map[x][y] == ']') 
                    if (!move(map, add(pos,'0,1'), add(destination,'0,1'), movement, true)) {
                         return false
                    }
     
          }
          map[dX][dY] = map[x][y]
          map[x][y] = '.'
     
          return true
     }
     //movimentos esquerda e direita ficam normais
     if (map[dX][dY] == '[' || map[dX][dY] == ']') {
          if (move(map, destination, add(destination, movement), movement)) {
               move(map, pos, destination, movement)
               //map[dX][dY] = map[x][y]
               return true
          }
     }
     return false;
}
var x = inp.split('\n\n')
var [map, _] = x

map = map.replaceAll('#','##')
.replaceAll('O','[]')
.replaceAll('.','..')
.replaceAll('@','@.')
pos = map.indexOf('@')

map = map.split('\n').map(x=>Array.from(x).map(x=>x))
var [w, h] = [map[0].length, map.length]
pos = (pos/(w+1)>>0)+','+pos%(w+1)

movementSet = {
     '^':'-1,0',
     '>':'0,1',
     '<':'0,-1',
     'v':'1,0',
}
// for (let i = 0; i<5; i++) {
//      movement = movementSet[moves[i]]
//      if (move(map, pos, add(pos, movement), movement)) pos = add(pos, movement)
// }
//console.log(map.map(x=>x.join('')).join('\n'))
fs.writeFileSync("15/output.txt", '', 'utf-8');

canMove = (map, pos, destination, movement, auxiliar = false, confirmed = false) => {
     // console.log(pos, destination, 'P')
     var [dX,dY] = destination.split(',')
     var [x,y] = pos.split(',')
     temp = map.map(x=>x.map(x=>x))
     temp[x][y] = 'X'
     temp[dX][dY] = 'Y'
     z = [x,y,dX,dY]
     // fs.appendFileSync("15/output.txt", temp.map(x=>x.join('')).join('\n')+'\n\n\n\n', 'utf-8');
     if (gambiarra.map(x=>x.join(',')).includes(z.join(','))) return ((map[dX][dY]=='.'||canMove(map, add(pos, movement), add(destination, movement), movement)))
     gambiarra.push(z)
     
     // console.log(temp.map(x=>x.join('')).join('\n'))
     if (map[dX][dY] == '#') return false
     // first check if the box is movable
     // all box has a pivot element and an auxiliar element
     // for example, if [ is to be moved, then its the pivot
     // check if [ can move to its destination
     // this can be unpacked in two different things
     // check if the destination is '.' or if it can be moved in the same direction
     // also has to check if the auxiliar element can be moved
     // it should be treated as auxiliar, that is, it won't have a auxiliar element 
     // if it's movable, it can be moved without any trouble
     pivot = map[x][y]
     if (pivot == '@') {
          // console.log(pos, destination)
          return map[dX][dY]=='.'||canMove(map, add(pos, movement), add(destination, movement), movement)
     }
     if (movement[0]!='0') {
          // console.log('hasAuxiliar?')
          auxDirection = pivot=='['?'0,1':'0,-1'
          auxPos = add(pos, auxDirection)
          auxDes = add(destination, auxDirection)
          var [x_,y_] = auxPos.split(',')
          var [xD,yD] = auxDes.split(',')
          temp[x_][y_] = 'A'
          temp[xD][yD] = 'B'
          
          // console.log(temp.map(x=>x.join('')).join('\n'))
          // console.log(auxPos, auxDes)
          return (canMove(map, auxPos, auxDes, movement, auxiliar = true)) && ((map[dX][dY]=='.'||canMove(map, add(pos, movement), add(destination, movement), movement)))
                 
     }
     else {
          return map[dX][dY]=='.'||canMove(map, add(pos, movement), add(destination, movement), movement, auxiliar = false)
     }
     map[dX][dY] = map[x][y]
     console.log(map.map(x=>x.join('')).join('\n'))
     return true
}



for (let i = 0; i<moves.length; i++) {
     var frame = ''
     frame+=i+','+moves[i]+'\n'
     // console.log(i, moves[i])
     movement = movementSet[moves[i]]
     var gambiarra = []
     if (canMove(map, pos, add(pos,movement), movement)) {
          // console.log(gambiarra)
          // console.log(movement)

          if (moves[i] == 'v') gambiarra =  gambiarra.sort((a,b) => a[0]-b[0])
          if (moves[i] == '^') gambiarra =  gambiarra.sort((a,b) => b[0]-a[0])
          if (moves[i] == '>') gambiarra =  gambiarra.sort((a,b) => a[1]-b[1])
          if (moves[i] == '<') gambiarra =  gambiarra.sort((a,b) => b[1]-a[1])
          for ([x,y,dX,dY] of gambiarra.reverse()) {
               // console.log(x,y,dX,dY)
               map[dX][dY] = map[x][y]
               map[x][y] = '.'
          }
          

          pos = add(pos, movement)
     }
     frame += (map.map(x=>x.join('')).join('\n')).replace('@',moves[i])+'\n'+'\n'+'\n'
     fs.appendFileSync("15/output.txt", frame, 'utf-8');
}
// console.log(map.map(x=>x.join('')).join('\n'))


var soma = 0
for (let i = 0; i < h; i++) {
     for (let j = 0; j<w; j++) {
          // console.log(i, j)
          if (map[i][j] == '[') soma += 100*i+j
     }
}

console.log(soma)


// 1496390 too low
// 1493457 too low
// chute pra saber se tava no caminho: 2498034 too high
// 1498034 not correct
// 1479444
// 1479444 not right answer