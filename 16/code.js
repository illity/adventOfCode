var fs = require('fs');

var inp = fs.readFileSync("15/test.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n\n')
var [map, moves] = x
moves = moves.split('\n').join('')
console.log(moves)

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
     console.log(map.map(x=>x.join('')).join('\n'))
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
          console.log('oii')
          if (move(map, destination, add(destination, movement), movement)) {
               move(map, pos, destination, movement)
               //map[dX][dY] = map[x][y]
               return true
          }
     }
     return false;
}
var x = inp.split('\n\n')
var [map, moves] = x

map = map.replaceAll('#','##')
.replaceAll('O','[]')
.replaceAll('.','..')
.replaceAll('@','@.')



pos = map.indexOf('@')
map = map.split('\n').map(x=>Array.from(x).map(x=>x))
var [w, h] = [map[0].length, map.length]
pos = (pos/(w+1)>>0)+','+pos%(w+1)
for (let i = 0; i<6; i++) {
     
     
     movement = {
          '^':'-1,0',
          '>':'0,1',
          '<':'0,-1',
          'v':'1,0',
     }[moves[i]]
     if (move(map, pos, add(pos, movement), movement)) pos = add(pos, movement)
}
console.log(map.map(x=>x.join('')).join('\n'))