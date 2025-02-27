var fs = require('fs');

var inp = fs.readFileSync("17/input.txt", 'utf-8').replaceAll('\r', '');
var [A,B,C,_,x] = inp.split('\n'); 
A = +A.split(': ')[1]
B = +B.split(': ')[1]
C = +C.split(': ')[1]

x = x.split(': ')[1].split(',')
console.log(A,B, C, x)

var current = 0; 
var output = []; 

var instructions = {
    '0': x => { A = Math.floor(A / (2 ** x)); }, 
    '1': x => { B = B ^ x; }, 
    '2': x => { B = x % 8;}, 
    '3': x => { if (A !== 0) current = x - 2; }, 
    '4': x => { B = B ^ C; }, 
    '5': x => { output.push(x % 8); }, 
    '6': x => { B = Math.floor(A / (2 ** x)); }, 
    '7': x => { C = Math.floor(A / (2 ** x)); }, 
};

console.log(A,B,C)
for (;;) {
    var opcode = x[current]; 
    var literal = x[current + 1]; 
    combo = {
     '0':0,
     '1':1,
     '2':2,
     '3':3,
     '4':A,
     '5':B,
     '6':C,
     '7':C
    }[literal]
    if (opcode==1) combo = literal
    console.log(`A: ${A}, B: ${B}, C: ${C}, Instruction: ${current}, opcode: ${opcode}, combo: ${literal}, literal: ${combo}`);
    if (opcode === undefined) break; 
    instructions[opcode](combo);
    current += 2; 
}

console.log(`Output: ${output.join(',')}`);