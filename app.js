// -------------module

// const {sayHello} = require('./helper');
//
// sayHello();

// -------------global variables

// console.log('Log from app.js')
// // \sept-22-nodeJS
// console.log(__dirname);
// // \sept-22-nodeJS\app.js
// console.log(__filename);
// // \sept-22-nodeJS
// console.log(process.cwd());
//
//
// const {logToConsole} = require('./test/test')
//
// logToConsole()

// console.log(process)

// -------------Path
// const path = require('path');
//
// const joinedPath = path.join('test', 'test.js');
// // test\test.js
// console.log(joinedPath)
//
// const joinedPathDir = path.join(__dirname, 'test', 'test.js');
// // повний шлях
// console.log(joinedPathDir)
//
// const resolvedPath = path.resolve('test', 'test.js');
// // повний шлях && так само як у join(__dirname)
// console.log(resolvedPath)
//
// const normalizePath  = path.normalize('test/////////test///12/test.js');
// // test\test\12\test.js
// console.log(normalizePath)


// -------------OS
// const os = require('os');
//
// console.log(os.arch())
// console.log(os.cpus())


// -------------FS
const fs = require('fs');
const path = require('path')

//виводить вміст
// fs.readFile(path.join('test','text.txt'),{encoding: 'utf-8'}, (err,data) => {
//     console.log(err)
//     if (err) throw new Error();
//     console.log(data)
// })

// fs.readFile(path.join('test','text.txt'),{encoding: 'utf-8'}, (err,data) => {
//     console.log(err)
//     if (err) throw new Error();
//     console.log(data.toString())
// })

// додає в кінець
// fs.appendFile(path.join('test', 'text2.txt'),'\n Hello from append!',(err)=> {
//     if (err) throw new Error();
// })

// //очищує файл
// fs.truncate(path.join("test","text2.txt"), (err)=>{
//     if (err) throw new Error();
// })

//видаляє
// fs.unlink(path.join('test', 'text2.txt'), (err)=>{
//     if (err) throw new Error();
// })

// масив елементів які є всередині [ 'test.js', 'text.txt' ]
// fs.readdir(path.join('test'), (err,data)=>{
//     if (err) throw new Error();
//     console.log(data);
// })

// fs.stat(path.join('test'), (err,stats)=>{
//     if (err) throw new Error();
//     console.log(stats)
//     console.log(stats.isDirectory())        //true   бо тест є папка
//     console.log(stats.isFile())             //false  бо тест не є файл
// })


// проходиться по файлах в папці test -> true, true
// fs.readdir(path.join('test'), {withFileTypes: true},(err,data)=>{
//     if (err) throw new Error();
//     data.forEach(file=> {
//         console.log(file.isFile());
//     })
// })

//створює папку
fs.mkdir(path.join('test','test2'), (err)=>{
    if (err) throw new Error();
})