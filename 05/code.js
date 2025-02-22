var fs = require('fs');

var inp = fs.readFileSync("./05.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n')
rules = []
updates = []
for (el of x) {
    if (el.includes('|')) {
        rules.push(el.split('|').map(x=>+x))
    } else if (el.includes(',')) {
        updates.push(el.split(',').map(x=>+x))
    }
}
ruleLeft = {}
for (rule of rules) {
    if (ruleLeft[rule[1]] == undefined)
        ruleLeft[rule[1]] = []
    ruleLeft[rule[1]].push(rule[0])
}

var soma = 0

for (update of updates) {
    soma += update[(update.length-1)/2]
    for (var i=0; i<update.length-1; i++) {
        if (ruleLeft[update[i]] == undefined) continue;
        for (var j=i+1; j<update.length; j++) {
            // Não pode estar na lista do ruleLeft correspondente
            if (ruleLeft[update[i]].includes(update[j])) {
                soma -= update[(update.length-1)/2]
                break
            }
        }
        if (ruleLeft[update[i]].includes(update[j])) break;
    }
}

console.log(soma)
fullSoma = -soma

for (update of updates) {
    soma += update[(update.length-1)/2]
    for (var i=0; i<update.length-1; i++) {
        if (ruleLeft[update[i]] == undefined) continue;
        for (var j=i+1; j<update.length; j++) {
            if (ruleLeft[update[i]].includes(update[j])) {
                soma -= update[(update.length-1)/2];
                [update[i], update[j]] = [update[j], update[i]];
                i = i-1
                break
            }
        }
    }
    fullSoma += update[(update.length-1)/2]
}
console.log(fullSoma)
// console.log(ruleLeft)
// console.log(updates)