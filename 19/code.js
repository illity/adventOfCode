var fs = require('fs');
var inp = fs.readFileSync("19/input.txt", 'utf-8').replaceAll('\r', '');
[subtexts, texts] = inp.split('\n\n')
subtexts = subtexts.split(', ')
texts = texts.split('\n').filter(x=>x)

//Sempre terá que fazer o texto todo
//Então para cada texto eu tento tirar a parte da esquerda ou da direita dele (apenas uma das duas, sem perda de generalidade vou tentar tirar a da esquerda)
//Se conseguir transformar o texto em '' então deu certo
//Por exemplo digamos que seja ABDCD o texto
//E eu só tenho as opções ABC CCD AB
//Primeiro eu tento extrair ABD
//Vou conseguir e ficar com CD, mas aí não consigo mais
//Depois vou tentar extrair AB apenas e fico com DCD, podendo terminar

dicionario = {

}

isPossible = (text, maneiras) => {
    // console.log(text)
    // isPossible
    // console.log(text)
    if (Object.keys(dicionario).includes(text)) return dicionario[text]
    if (text == '') {return 1}
    restoTextos = subtexts.map(x=>text.match(new RegExp(x+'(.*)'))).filter(x=>x&&x.index==0).map(x=>x[1])
    if (restoTextos.length == 0) return false
    // console.log(restoTextos)
    var maneiras = 0
    for (el of restoTextos) {
        m = isPossible(el)
        maneiras+=m
    }
    dicionario[text] = maneiras
    return maneiras
}

// console.log(text)
// isPossible(text)
// isPossible('D')
console.log(isPossible(texts[2]))

console.log(texts.map(text=>isPossible(text)).reduce((a,b)=>a+b))

//Para o número de maneiras, para cada texto vamos determinar o número de maneiras que ele pode ser construído
//digamos que as possibilidades sejam A, BA, B
//e o texto é ABBA
//Quaantas maneiras o texto ABBA pode ser construído?
//De quantas maneiras BBA pode ser construído + De quantas maneiras BA pode ser construído
//Ou seje 1 + 1