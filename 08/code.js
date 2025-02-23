var fs = require('fs');

var inp = fs.readFileSync("08/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n').map(x=>Array.from(x))

occurrences = {}

for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
        if (x[i][j] !== '.') {
            if (occurrences[x[i][j]] == undefined) {
                occurrences[x[i][j]] = []
            }
            occurrences[x[i][j]].push([i,j])
        }
    }
}

const [szy, szx] = [x.length, x[0].length]

for (const [key, values] of Object.entries(occurrences)) {
    console.log(key)
    for (let i=0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
            if (i==j) continue
            antiNode = [values[i][0] - values[j][0] + values[i][0], values[i][1] - values[j][1] + values[i][1]]
            //Something is off
            if ((antiNode[0] < szx) & (antiNode[1] < szx) & (antiNode[0] >= 0) & (antiNode[0] >= 0)) {
                x[antiNode[0]][antiNode[1]] = '#'
            }
        }
    }
}

//That's not the right answer; your answer is too high. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. [Return to Day 8]
//358, 351, 344


console.log(x.map(y=>y.join('')).join('\n'))
console.log(x.map(y=>y.join('')).join('\n').match(/#/g).length)
for (const [key, values] of Object.entries(occurrences)) {
    console.log(key)
    for (let i=0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
            if (i==j) continue
            var antiNode = [values[i][0], values[i][1]]
            while(
                ((antiNode[0] < szx) & (antiNode[1] < szx) & (antiNode[0] >= 0) & (antiNode[0] >= 0))
            ) {
                x[antiNode[0]][antiNode[1]] = '#'
                antiNode = [antiNode[0] - values[j][0] + values[i][0], antiNode[1] - values[j][1] + values[i][1]]                
            }
        }
    }
}

console.log(x.map(y=>y.join('')).join('\n'))
console.log(x.map(y=>y.join('')).join('\n').match(/#/g).length)
