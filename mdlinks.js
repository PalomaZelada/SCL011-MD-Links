const fs = require('fs');
const path = require('path');
const marked = require('marked')
const FileHound = require('filehound');

// let commandLine = process.argv[2]
// console.log(commandLine)

// const findMd =(path =>{
//         FileHound.create()
//         .paths('/SCL011-MD-LINKS')
//         .ext('md')
//         .find()
// files.then(console.log)
//     })

   
    const files = FileHound.create()
    .paths('/SCL011-MD-Links')
    .ext('md')
    .find();
   
  files.then(console.log);
