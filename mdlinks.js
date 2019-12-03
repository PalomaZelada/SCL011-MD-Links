const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetchUrl = require('fetch').fetchUrl;
const FileHound = require('filehound');

let pathMd = process.argv[2]
pathMd = path.normalize(pathMd);
pathMd = path.resolve(pathMd);

const readMdFile = (path => {
  return new Promise ((resolve, reject) => {
    fs.readFile(path, 'utf-8',(error, file) => {
      if(error){
        reject(new Error("Hubo un error en el archivo " + pathMd));
      };
      resolve(file);
    });
  });
});


const mdLinks = (pathMd => {
  const links = [];
  return new Promise ((resolve, reject) => {
    readMdFile(pathMd)
    .then(res =>{
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        links.push({
          href: href,
          text: text,
          file: pathMd,
        });
      };
      marked(res, { renderer: renderer });
      console.log(links)
      const statusProms = links.map(link => linkStatus(link.href));
      Promise.all(statusProms)
      .then(linksRes => {
        resolve(linksRes)
      });
    })
    .catch(err => {
      reject(err)
    } )
  })
})

let foundLinks = mdLinks(pathMd).then(console.log)

const linkStatus = (url) => {
  return new Promise((resolve) => {
    fetchUrl(url, (error, meta, body) => {
      if (meta) {
        if (meta.status === 200) {
          resolve(meta.status.toString())
        }else if (meta.status > 400); {
          resolve(meta.status.toString())};
        }else {
          resolve("FAIL");
        }
          })
  })
}






// const findLinks = readMdFile(pathMd)
//    findLinks.then(data => {
//     const renderer = new marked.Renderer();
//     renderer.link = function(href, title, text){
//         links.push({
//             href: href,
//             text: text,
//             file: pathMd,
//     })
// }
//     marked(data, {renderer: renderer});

//     //return links;
//     console.log(links)
// })
// .catch(error => console.log(error))

//findLinks()

