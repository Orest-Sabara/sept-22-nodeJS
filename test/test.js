function logToConsole (){
    console.log('From test/test.js')
    console.log(__dirname);

    console.log(__filename);

    console.log(process.cwd());
}

module.exports = {
    logToConsole,
}

// directory
// // \sept-22-nodeJS\test
// file
// // \sept-22-nodeJS\test\test.js
// process  (папка де є файл який запустили)
// // \sept-22-nodeJS
