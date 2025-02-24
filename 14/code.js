var fs = require('fs');

var inp = fs.readFileSync("14/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n').map(x=> ({
     'p': x.split(' ')[0].split('=')[1],
     'v': x.split(' ')[1].split('=')[1],
}))


w = 101
h = 103
// w = 11
// h = 7
        

add = (x,y) =>  ((w + +x.split(',')[0] + +y.split(',')[0])%w+
                ','+
                (h + +x.split(',')[1] + +y.split(',')[1])%h)

        
nextPosition = info => {
     info.p = add(info.p,info.v)
     return info
}


draw = current => {
     screen = Array(h).fill(0).map(x=>Array(w).fill(0).map(x=>'.'))
     for (let i = 0; i< current.length; i++) {
          x_ = current[i].p.split(',')[0]
          y_ = current[i].p.split(',')[1]
          if (screen[y_][x_]=='.') screen[y_][x_] = 0
          screen[y_][x_] = 'x'
     }
     // for (let i = 0; i<h; i++) screen[i][(w-1)/2] = ' '
     // for (let i = 0; i<w; i++) screen[(h-1)/2][i] = ' '
     fs.appendFileSync("14/output.txt", screen.map(y=>y.join('')).join('\n'), 'utf-8');
}





for (let i = 0; i < 10000; i++) {
     for (let j = 0; j<x.length; j++) {
          x[j] = nextPosition(x[j])
     }
     if (i==7131) draw(x)
}
q1 = 0
q2 = 0
q3 = 0
q4 = 0
w = w-1
h = h-1
for (let i = 0; i<x.length; i++) {
     q1 += (x[i].p.split(',')[0] < w/2 & x[i].p.split(',')[1] < h/2)
     q2 += (x[i].p.split(',')[0] < w/2 & x[i].p.split(',')[1] > h/2)
     q3 += (x[i].p.split(',')[0] > w/2 & x[i].p.split(',')[1] < h/2)
     q4 += (x[i].p.split(',')[0] > w/2 & x[i].p.split(',')[1] > h/2)
}
console.log(q1, q2, q3, q4)
console.log(q1*q2*q3*q4)
//40131000
//too low
// 7131 toolow