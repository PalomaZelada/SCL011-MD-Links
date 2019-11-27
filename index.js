const fs = require("fs");
const path = require("path");
const FileHound = require('filehound');
const Marked = require('marked');

//Rescatando ruta
let path2 = process.argv[2]
//Convirtiendo en ruta absoluta
path2 = path.normalize(path2)
path2 = path.resolve(path2)
//Para escribir los links
let links = [];

//Para leer archivo md
const readMdFile = (path => {
    return new Promise ((resolve, reject)=> {
     fs.readFile(path, 'UTF-8',(error, archivo) => {
        if(error){
           reject(new Error("Existe un error en el archivo" + path2))
        }
        resolve(archivo)
       });
    })

})

//Para extraer linkks
const getLinks = readMdFile(path2)
   getLinks.then(data => {
    const renderer = new Marked.Renderer();
    renderer.link = function(href, title, text){
        links.push({
            href: href,
            text: text,
            file: path2,
    })
}
    Marked(data, {renderer: renderer});

    //return links;
    console.log(links)
})
.catch(error => console.log("Hubo un error"))

// console.log(links)

// const a = readMdFile(path2);
// a.then(console.log)        


// console.log(require.main === module);

// // module.exports = () => {
// //   // ...
// // };
