const fs = require('node:fs/promises');

const path = require('node:path');


// const worker = async () => {
//     try {
//         const fileNames = ['file1.txt','file2.txt','file3.txt','file4.txt']
//         const folderNames = ['folder1','folder2','folder3','folder4']
//
//         // цикл for of при await буде чекати, всі інші цикли ні
//         for (const folderName of folderNames) {
//             await fs.mkdir(path.join(process.cwd(), folderName), {recursive: true});        //{recursive: true} не валить помилку коли папки вже існують
//         }
//
//         //     //папка в папці в папці ... folder1 -> doc1 -> doc2 -> doc3
//         // for (const folderName of folderNames) {
//         //     await fs.mkdir(path.join(process.cwd(), folderName, 'doc1','doc2','doc3'), {recursive: true});        //{recursive: true} якщо папки не існує воно створить і піде далі
//         // }
//
//         // створює файли з написом в середині.
//         for (const fileName of fileNames) {
//             await fs.writeFile(path.join(process.cwd(), fileName), "HELLO world", {flag:'w'});
//         }
//     } catch (e) {
//         console.error(e.message)
//     }
// }


// const worker = async () => {
//     try {
//         const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt']
//         const folderNames = ['folder1', 'folder2', 'folder3', 'folder4']
//
//         //створює папки з файлами в середині
//         await Promise.all(folderNames.map(async (folderName, index) => {
//                 const folderPath = path.join(process.cwd(), folderName);
//
//                 await fs.mkdir(folderPath, {recursive: true});
//                 await fs.writeFile(path.join(folderPath, fileNames[index]), "HELLO world");
//             })
//         )
//
//         //показує у головній папці чи це файл чи папка
//         const readFiles = await fs.readdir(path.join(process.cwd()));   //читаємо папку з шляхом
//         console.log(readFiles)      // масив файлів і папок
//         for (const file of readFiles) {
//             const stats = await fs.stat(path.join(process.cwd(), file));
//             const isFile = stats.isFile();      //перевіряє чи stats є файлом
//             if (isFile) {
//                 console.log("this is file : ", path.join(process.cwd(), file));
//             } else {
//                 console.log("this is directory : ", path.join(process.cwd(), file));
//             }
//         }
//     } catch (e) {
//         console.error(e.message)
//     }
// }


// створює одним потоком файли і папки зразу
const worker = async () => {
    try {
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt']
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4']

        const filesPromises = fileNames.map(async (fileName, index) => {
            await fs.writeFile(path.join(process.cwd(), fileName), 'Hello World');
        });

        const foldersPromises = folderNames.map(async (folderName) => {
            await fs.mkdir(path.join(process.cwd(), folderName), {recursive: true});
        });

        const result = Promise.allSettled([...filesPromises, ...foldersPromises]);
        console.log(result)
    } catch (e) {
        console.error(e.message)
    }
}


worker().then();