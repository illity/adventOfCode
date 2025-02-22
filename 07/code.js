var fs = require('fs');

var inp = fs.readFileSync("07/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n')

data = x.map(x=>({result:-(-x.split(': ')[0]), operands:x.split(': ')[1].split(' ').map(x=>-(-x))}))
operators = [(x,y) => x+y, (x,y) => x*y, (x,y) => -(-x+''+y)]
var result, operators;

//a b c d e
//a+b...
//a*b...
//last + or *

badPracticeNasa = (c,b,a=0) => {
    //Já que + e * é sempre cresecente, podemos acabar quando a>c
    // console.log(a, b)
    if (b.length == 0) {
        if (a===c) return true;
        return false
    }
    return operators.map(operator=>badPracticeNasa(c,b.slice(1),operator(a,b[0]))).reduce((a,b)=>a|b)
}
soma = 0

for (d of data) {
    if (badPracticeNasa(d.result,d.operands.slice(1),d.operands[0])) {
        soma+=d.result
    }
}

//25858857 não funcionou, too low
//26129657 também não funcionou, também too low
//40338942 também não funcionou, igualmente too low
//14113540515 também não funcionou, not the right answer
//4364915411363 funcionou finalmente
//Tava fazendo retornar o OR como se fosse um número ao invés de ser true/false (pensei que daria na mesma)
//38322057216320 first try
console.log(soma)