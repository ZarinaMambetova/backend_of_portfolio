// Подключаем библиотеки и конфиг файл для работы с БД
const mongoose = require('mongoose');
const config = require('../config.json');


// Так как у монгусика нет своих промисов подключаем
// из глобального обьекта промисы ноды
mongoose.Promise = global.Promise;

// Коннектимся базе данных
// если выдает ошибку выводим в консоль
mongoose
.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {useMongoClient: true})
.catch(e => {
    console.error(e);
    throw e;
})

// Обрабатываем ответ при
// успешном  коннекте
mongoose.connection
.on('connected', function() {
  console.log(`Mongoose  default connection open mongodb://${config.db.host}:${config.db.port}/${config.db.name}`) 
})

// Обрабатываем ошибку при коннекте
mongoose.connection
.on('error', function(err) { 
  console.log('Mongoose is not connection' + err)  
})

// Обрабатываем Дисконнект
mongoose.connection
.on('disconnect', function() {
  console.log('Mongoose is disconnected')  
});

// Обрабатываем завершение работы приложения
process.on('SIGINT', function () {
  mongoose.connection
    .close(function () {
      console.log('Mongoose disconnected through app termination')
      process.exit(0);  
    });   
});

require('./skills')
// require('./blog')
require('./work')
// require('./users')