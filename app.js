// ----------EVENTS

// const event = require('node:events');
// const {logToConsole} = require("./test/test");
//
// const eventEmitter = new event();
//
// //можна багато разів
// eventEmitter.on('click', (data)=>{
//     console.log(data)
//     console.log('click click click')
// })
//
// eventEmitter.emit('click', {name: "Action"});
// eventEmitter.emit('click', {name: "Action"});
// eventEmitter.emit('click', {name: "Action"});
// eventEmitter.emit('click', {name: "Action"});
//
// // [ 'click' ]
// console.log('1st eventNames',eventEmitter.eventNames())
//
// //тільки раз
// eventEmitter.once('clickAndDie', ()=>{
//     console.log("gonna die after being called")
// })
//
//     // [ 'click', 'clickAndDie' ]
// console.log('2nd eventNames',eventEmitter.eventNames())
//
// eventEmitter.emit('clickAndDie')
// eventEmitter.emit('clickAndDie')
//
// // [ 'click' ]
// console.log('3rd eventNames',eventEmitter.eventNames())


// ----------STREAMS

// const fs = require('fs');
// const path = require('path');
//
// const readStream = fs.createReadStream(path.join('test', 'text.txt'), {encoding:"utf-8"});
// const writeStream = fs.createWriteStream(path.join('test', 'text2.txt'))

// read, write, duplex, transform --- types of streams !!!

//копіює файл по частинах
// readStream.on('data', (chunk) => {
//   writeStream.write(chunk);
// });


//якщо сталася якась помилка знищуємо readStream.destroy();  і запишеться у кінець файлу writeStream.end()
// const handleError = () => {
//     console.log("ERROR!!!");
//     readStream.destroy();
//     writeStream.end('Error while reading file')
// }
//
// //копіює файл по частинах
// readStream
//     .on('error', handleError)
//     .pipe(writeStream)
//     .on('error', handleError)


// ----------Express
const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
    {
        name: 'Oleh',
        age: 22,
        gender: 'male'
    },
    {
        name: 'Sabina',
        age: 45,
        gender: 'female'
    },
    {
        name: 'Anton',
        age: 42,
        gender: 'female'
    },
    {
        name: 'cocos',
        age: 4,
        gender: 'male'
    }
]

app.get('/users', (req, res)=>{
    res.status(200).json(users);
})

app.get('/users/:userId', (req, res)=>{
    const {userId} = req.params
    const user = users[+userId - 1];

    res.json(user)
})

app.get('/welcome', (req, res)=>{
    res.send('welcome!!!');
    // res.end()
})

app.post('/users', (req, res)=>{
    const body = req.body;
    users.push(body)

    res.status(201).json({
        message: "user created"
    })
})

app.put('/users/:userId', (req, res)=>{
    const { userId } = req.params;
    const updatedUser = req.body;

    users[+userId] = updatedUser;

    res.status(200).json({
        message: 'User updated',
        data: users[+userId]
    })
})


// app.patch()

app.delete('/users/:userId', (req, res)=>{
    const {userId} = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message:"User deleted"
    })
})

const PORT = 5100

app.listen(PORT, ()=>{
    console.log(`Server has started on PORT ${PORT}`)
})