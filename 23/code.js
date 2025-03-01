var fs = require('fs');

var inp = fs.readFileSync("23/input.txt",'utf-8').replaceAll('\r','');
var x = inp //.replace('S','>')
connections = x.split('\n')

dict = {}
for (connection of connections) {
    [a, b] = connection.split('-')
    dict[a] = dict[a]?[...dict[a],b]:[b]
    dict[b] = dict[b]?[...dict[b],a]:[a]
}
all = []
for (connection of connections) {
    [a, b] = connection.split('-')
    console.log(b)
    if (!(a[0]=='t' || b[0]=='t')) continue
    //conexões possíveis
    all.push(dict[a].filter(x=>dict[b].includes(x)).map(x=>[a,b,x].sort().join(',')))
}
console.log([...new Set(all.flat())].length)
// console.log(dict)
// 2526 too high
// 1015 too low

all = []

// console.log(dict)
//ir simplesmente agrupando não dá certo
// pode ser que A e B estejam unidos porém não estejam no maior grupo
// Para cada elemento, suponha que ele está no maior grafo possível.
// itere so

// algorithm BronKerbosch1(R, P, X) is
//     if P and X are both empty then
//         report R as a maximal clique
//     for each vertex v in P do
//         BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
//         P := P \ {v}
//         X := X ⋃ {v}

all = []

function algoritmo(R, P, X) {
    if (!P.size && !X.size) { all.push(Array.from(R))} //     if P and X are both empty then report R as a maximal clique
    P.forEach(v => { //for each vertex v in P do
        //BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
        algoritmo(
            new Set([...R, v]),                   // R ⋃ {v}
            new Set([...P].filter(neighbor => graph[v].includes(neighbor))),  // P ⋂ N(v)
            new Set([...X].filter(neighbor => graph[v].includes(neighbor))),  // X ⋂ N(v)
        )

        P.delete(v); //P := P \ {v}
        new Set(...X,v); //X := X ⋃ {v}
    })
}

// Example graph represented as an adjacency list using Set
const graph = dict
// Convert the graph into sets for P and X initialization
const P = new Set(Object.keys(graph)); // All vertices initially in P
const X = new Set();  // X starts empty
const R = new Set();  // R starts empty

// Call the Bron-Kerbosch algorithm with the initial empty R, P, and X
x = algoritmo(R, P, X, graph);
console.log(x)
console.log(all.reduce((a,b)=>a.length>b.length?a:b).sort().join(','))
