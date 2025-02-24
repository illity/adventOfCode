var fs = require('fs');

var inp = fs.readFileSync("12/input.txt",'utf-8').replaceAll('\r','');
var x = inp.split('\n').map(x=>Array.from(x))
data = x.map(x=>x.map(x=>x))
data2 = x.map(x=>x.map(x=>x))


findRegion = (x, y, crop, data) => {
    if (x<0 | y<0 | x>=data.length | y>=data[0].length) return []

    if (data[x][y]!=crop) return []
    data[x][y] = ''
    return [[x, y],
            ...findRegion(x+1,y,crop, data),
            ...findRegion(x-1,y,crop, data),
            ...findRegion(x,y+1,crop, data),
            ...findRegion(x,y-1,crop, data)
            
        ]
}

getPerimeter = (region) => {
    total = 0
    for (el of region) {
        [x, y] = el.split(',')
        z = !region.has([+x+1, +y].join(',')) +
            !region.has([+x-1, +y].join(',')) +
            !region.has([+x, +y+1].join(',')) +
            !region.has([+x, +y-1].join(','))
        total+=z
    }
    return total
}

getSides = (region) => {
    total = 0
    sides = {
        'w': [],
        'a': [],
        's': [],
        'd': []        
    }
    for (el of region) {
        [x, y] = el.split(',')
        if (!region.has([+x+1, +y].join(','))) sides['s'].push([x,y].join(','))
        if (!region.has([+x-1, +y].join(','))) sides['w'].push([x,y].join(','))
        if (!region.has([+x, +y+1].join(','))) sides['d'].push([x,y].join(','))
        if (!region.has([+x, +y-1].join(','))) sides['a'].push([x,y].join(','))
    }
    total = 0
    realSides = new Set()
    distance = (x,y) => {
        return Math.abs(x.split(',')[0]-y.split(',')[0])+
               Math.abs(x.split(',')[1]-y.split(',')[1])
    }
    var totalRegions = 0
    for (const [key, value] of Object.entries(sides)) {
        x = Array(data.length).fill(false).map(x=>Array(data.length).fill(false))
        for (val of value) x[val.split(',')[0]][val.split(',')[1]] = true
        
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (x[i][j]) {
                    y = findRegion(i,j,true, x)
                    totalRegions+=1
                }
            }
                
        }
    }
    // }
    return totalRegions
}

var totalPrice = 0
for (let i=0; i<data.length; i++) {
    for (let j = 0; j<data.length; j++){
        if (data[i][j]) {
            region = new Set(findRegion(i, j, data[i][j], data).map(x=>x.join(',')))
            totalPrice+=region.size*getPerimeter(region)
        }
    }
}

console.log(totalPrice)


data = data2

var totalPrice = 0
var toootal = 0 

for (let i=0; i<data.length; i++) {
    for (let j = 0; j<data.length; j++){
        if (data[i][j]) {
            var crop = data[i][j]
            region = new Set(findRegion(i, j, data[i][j], data).map(x=>x.join(',')))
            sides =  getSides(region)
            toootal += sides*region.size
        }
    }
}
console.log(toootal)