var fs = require('fs');

var inp = fs.readFileSync("11/input.txt",'utf-8').replaceAll('\r','');
var x = inp

applyRule = x => {
    if (x==0) return '1'
    else if (!(x.length&1)) return (+x.substr(0,x.length/2)) + ' ' + (+x.substr(x.length/2))
    else return (x*2024).toString()
}

blink = x => {
    var result = []
    x = x.split(' ')
    for (let i = 0; i < x.length; i++) {
        result.push(applyRule(x[i]))
    }
    result = result.join(' ')
    return result;
} 

var epIt = 25; // epoch iterations

for (let i = 0; i<epIt; i++) x = blink(x)
console.log(x)

// Plano
// Para cada elemento do x criar uma lista com a string resultante após 25 interações
// Criar também um set com cada elemento
// something like this
// firstResult = {
//  'list': 0 1 2 3,
//  'set': set
// }
// Para cada elemento de todos os sets fazer as 25 interações, em seguida pegar o set do resultado e fazer as 25 interações resultando no número total
// depois só somar
// Acho que cabe recursão mas como são só duas acho que não precisa

var firstResult = {
    list: x,
    set: new Set(x.split(' '))
}


firstEpoch = new Set()
var secondResult = {}
for (el of firstResult['set']) {
    x = el
    for (let i = 0; i<epIt; i++) x = blink(x)
    secondResult[el] = {
        'list': x,
        'set': new Set(x.split(' '))
    }
    // Aqui junto todos os sets do secondResult
    firstEpoch = new Set([...firstEpoch, ...secondResult[el]['set']])
}
lookTable = {}
//Se iterar 25 vezes esses elementos, teremos os seguintes valores
for (el of firstEpoch) {
    x = el
    for (let i = 0; i<epIt; i++) x = blink(x)
    lookTable[el] = x.split(' ').length
}

soma = 0

//Pra cada elemento da segunda lista, pegamos o resultado de iterar 25 vezes, e depois somamos pra todos os elementos da lista
lookTable2 = {}
for (const [key, value] of Object.entries(secondResult)) {
    //secondResult[key]['value'] = 1
    var total = secondResult[key]['list'].split(' ').map(x=>lookTable[x]).reduce((a,b)=>a+b)
    lookTable2[key] =  total
    secondResult[key]['value'] = total;
  }

  console.log(firstResult.list.split(' ').map(x=>lookTable2[x]).reduce((a,b)=>a+b))


