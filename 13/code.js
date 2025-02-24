var fs = require('fs');

var inp = fs.readFileSync("13/input.txt",'utf-8').replaceAll('\r','');
var bA = inp.split('\n').filter((_, i) => i % 4 === 0);
var bB = inp.split('\n').filter((_, i) => (i-1) % 4 === 0);
var prize = inp.split('\n').filter((_, i) => (i-2) % 4 === 0);

var data = []

for (let i = 0; i<bA.length; i++) {
    data.push({
        'A':[+bA[i].split(': ')[1].split(', ')[0].split('+')[1],+bA[i].split(': ')[1].split(', ')[1].split('+')[1]],
        'B':[+bB[i].split(': ')[1].split(', ')[0].split('+')[1],+bB[i].split(': ')[1].split(', ')[1].split('+')[1]],
        'prize':[+prize[i].split(': ')[1].split(', ')[0].split('=')[1], +prize[i].split(': ')[1].split(', ')[1].split('=')[1]]
    }
    )
}

// combinação linear m*x + n*y = prize
// A*x = b
// cramer's rule
// x = detx/detA, y = det y/detA

//Só funciona para matriz 2x2
det = x => x[0][0]*x[1][1]-x[1][0]*x[0][1]

var total = 0

for (d of data) {
    A = [[d.A[0], d.B[0]],
         [d.A[1], d.B[1]]]
    x = [[d.prize[0], d.B[0]],
         [d.prize[1], d.B[1]]]
    y = [[d.A[0], d.prize[0]],
         [d.A[1], d.prize[1]]]
    x = det(x)/det(A)
    y = det(y)/det(A)
    if (!Number.isInteger(x)|!Number.isInteger(y)) continue
    total += 3*x+y
}
console.log(total)

total = 0

for (d of data) {
    d.prize[0] += 10000000000000
    d.prize[1] += 10000000000000
    A = [[d.A[0], d.B[0]],
         [d.A[1], d.B[1]]]
    x = [[d.prize[0], d.B[0]],
         [d.prize[1], d.B[1]]]
    y = [[d.A[0], d.prize[0]],
         [d.A[1], d.prize[1]]]
    x = det(x)/det(A)
    y = det(y)/det(A)
    if (!Number.isInteger(x)|!Number.isInteger(y)) continue
    total += 3*x+y
}
console.log(total)