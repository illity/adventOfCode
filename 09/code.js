var fs = require('fs');

var inp = fs.readFileSync("09/input.txt",'utf-8').replaceAll('\r','');
var x = inp

var j = 0
var full = []
for (let i=0; i<x.length; i++) {
    // console.log(x[i])
    // console.log(x[i], j)
    if (i&1) full = [...full, ...(new Array(+x[i]).fill('.'))]
    else full = [...full, ...(new Array(+x[i]).fill(j++))]
}
var i = 0
var j = full.length-1

full2 = full.map(x=>x)

while(1) {
    // console.log(i, j, full)
    while(full[i] != '.') i++
    if (i > j) break
    full[i] = full[j]
    full[j] = '.'
    j--
}



var soma = 0

for (let i = 0; i< full.length; i++) {
    if (full[i] == '.') break
    soma += full[i]*i
}

console.log(soma)


var j = full.length-1
full = full2.map(x=>x)

while(1) {
    // console.log(i, j, full.join(''))
    // itera por todos os ids da direita pra esquerda
    // para cada um, procura um lugar onde ele caiba, da esquerda pra direita
    // vem do lado direito e acha uma string que caiba

    if (j < 1) break
    while(full[j] == '.' & (full[j]>fileId)) j--
    var fileId = (full[j])
    var fileSize = 0
    while (full[j] == fileId) (fileSize++&j--)
    // console.log(fileId, fileSize, 'filesize')
    for (let i = 0; i < full.length; i++) {
        if (i>j) break
        if (full[i] == '.') emptySpace++;
        else emptySpace = 0
        if (emptySpace == fileSize) {
            for (let k = 0; k < fileSize; k++) {
                full[i-k] = fileId
                full[j+k+1] = '.'
            }
            break
        }
    }
}
// console.log(full)

soma = 0
for (let i = 0; i< full.length; i++) {
    if (full[i]=='.') continue
    soma += full[i]*i
}
console.log(soma)

// 91380424522 too low
// 00992111777.44.333....5555.6666.....8888..