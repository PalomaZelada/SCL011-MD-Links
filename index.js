const fs = require('fs');
const path = require('path');
//const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('fetch');
const fetchUrl = fetch.fetchUrl;

// Rescatando ruta
let path2 = process.argv[2];
// Convirtiendo en ruta absoluta
path2 = path.normalize(path2);
path2 = path.resolve(path2);
// Para escribir los links
const links = [];

// Para leer archivo md
// const readMdFile = (path => {
//     return new Promise ((resolve, reject)=> {
//      fs.readFile(path, 'UTF-8',(error, archivo) => {
//         if(error){
//            reject(new Error("Existe un error en el archivo" + path2))
//         }
//         resolve(archivo)
//        });
//     })

// })

// Para extraer linkks
function extractLinks(path) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path, 'UTF-8', (error, data) => {
      if (error) {
        reject(new Error('No hay links'));
      }
      const renderer = new marked.Renderer();
      renderer.link = function (href, file, text) {
        links.push({
          href: href,
          text: text,
          file: path2,
        });
      };
      marked(data, { renderer: renderer });
      resolve(links);
    });
  });
  return promise.then(
    (links) => {
      console.log(links);
      let getLinks = links.map(function (links) {
        return links.href;
      });
      return getLinks;
    }
  ).then(
    (newLinks) => {
      const statusPromises = newLinks.map(link => {
        return linkStatus(link);
      });
      return Promise.all(statusPromises);
    })
    // .then(
    //   (statuses)=>{
    //     console.log(statuses)
    //   }
    // )
}

extractLinks(path2);

const linkStatus = (url) => {
  return new Promise((resolve) => {
    fetchUrl(url, (error, meta, body) => {
      if (meta) {
        if (meta.status < 399) {
          resolve(meta.status.toString())
        } else (meta.status > 400); {
          resolve(meta.status.toString());
        }
      }
    })
  })
}

// console.log(links)

// console.log(links)

// const a = readMdFile(path2);
// a.then(console.log)


// console.log(require.main === module);

// // module.exports = () => {
// //   // ...
// // };
