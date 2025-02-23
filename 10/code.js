var fs = require('fs');

var inp = fs.readFileSync("10/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n')
data = x.map(x=>Array.from(x).map(x=>-(-x)))

function getScore(x,y,current = 0) {
    if (x<0 | y<0 | x>=data.length | y>=data[0].length) return []
    if (data[x][y] != current) return []
    if (current == 9) return [x+','+y]
    var z = [...getScore(x+1,y,current+1),
            ...getScore(x-1,y,current+1),
            ...getScore(x,y+1,current+1),
            ...getScore(x,y-1,current+1)];
    return z;
}

var soma = 0

for (let i = 0; i<data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        //console.log(data)
        var score = new Set(getScore(i, j, 0)).size;
        soma+=score==undefined?0:score
        if (score== 20) break;
    }
}

console.log(soma)

var soma = 0

for (let i = 0; i<data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        //console.log(data)
        var score = getScore(i, j, 0).length;
        soma+=score==undefined?0:score
    }
}

console.log(soma)