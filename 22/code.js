var fs = require('fs');

var inp = fs.readFileSync("22/input.txt",'utf-8').replaceAll('\r','');
var x = inp //.replace('S','>')
secrets = x.split('\n')



mix = (x,y) => x^y
prune = (x) => x%BigInt(16777216)
var c = BigInt(1)
operations = [
    ()=>(c = mix(BigInt(64)*c,c)),
    ()=>(c = prune(c)),
    ()=>(c = mix(c/BigInt(32)<<BigInt(0), c)),
    ()=>(c = prune(c)),
    ()=>(c = mix(BigInt(2048)*c,c)),
    ()=>(c = prune(c)),
]
operations[0]()
console.log(c)
console.log(secrets)

out = secrets.map(el => {
    c = BigInt(el)
    x = []
    x.push(c%BigInt(10))
    for (let i = 0; i< 2000; i++) {
        operations.map(x=>{x()})
        x.push(c%BigInt(10))
    }
    return x
}
)

// console.log(out)
out = out.map(x=>[x,x.map((x,i,arr)=>i?x-arr[i-1]:false).filter(x=>x!==false).map(x=>x>=0?'+'+x:x).join(',')])//.map(x=>x>=0?'+'+x:x).map(x=>x.join(','))])
// console.log(out)
changes = out.map(x=>x[1])
// console.log(changes[0])


possible = new Set()
for (z of changes) 
    for (let i=2; i<z.length/3-3; i++) {
// console.log(z)

        x = z.substr(3*i,11)
        possible.add(x)
    }

// console.log(possible);
// possible = ['-2,I+1,-1,\+3','-2,\+1,-1,\+3'];
outt = [...possible].map(el=> {
    // console.log(el)
    regex = new RegExp(el.replaceAll('+', '\\\+'))
    var zz = out.map(([sequence, changes]) => {
        // console.log('s',changes)
     index = changes.match(regex)
     // console.log(changes)
     if (!index) return BigInt(0)
     // regex = new RegExp('-2,I11+1,-1, \11+3")
     // console.log(changes.match(regex))
     // console.log(new RegExp(el.replace("+','I1\+")))
     if (index) return sequence[4+index.index/3>>0]
    })
    .reduce((a,b)=>a+b)
    // console.log(zz)
    return zz
})
.reduce((a,b)=>a>b?a:b)
console.log(outt)