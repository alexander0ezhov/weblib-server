const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config.json');
const cors = require('cors');
const Sequelize = require('sequelize');
const booksModel = require('./src/Models/booksModel');

const srv = express();

srv.use(cors({ origin: '*' }));
srv.use( bodyParser.json() );
srv.listen(config.serverPort, function() {
    console.info(`Сервер запущен на порту ${config.serverPort}`);
});

srv.get('/read-books', (req, res) => {
    let search = '%'+(req.query.search)+'%';
    let sorter = req.query.sorter || 'name';
    let where = {
        name: {
            [Sequelize.Op.iLike]: search
        }
    };
    if (req.query.filter) {
        where.publisher = req.query.filter
        }

    booksModel.findAndCountAll({
        attributes: ['id','name', 'author','description', 'isbn', 'date_public', 'publisher', 'lang', 'is_in_stock'
        ],
        where: where,
        order: [
            [sorter, 'ASC']
        ],
        limit: +req.query.limit,
        offset: +req.query.offset
    })
    .then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(400).send('Ошибка при чтении данных');
    }})
});

srv.post('/add-book/', (req, res) => {
    const {name,description,author,isbn,date_public,publisher,lang,is_in_stock} = req.body.body;
    booksModel.create({
        name: name,
        author: author,
        description: description,
        isbn: isbn,
        date_public: date_public,
        publisher: publisher,
        lang: lang,
        is_in_stock: is_in_stock
    }).then(function (result) {
        if (result) {
            res.send('Запись создана');
        } else {
            res.status(400).send('Ошибка при сохранении строки');
        }
    });
});

srv.post('/edit-book/:id', (req, res) => {
    const {name,author,description,isbn,date_public,publisher,lang,is_in_stock} = req.body.body;
    booksModel.update({
        name: name,
        author: author,
        description: description,
        isbn: isbn,
        date_public: date_public,
        publisher: publisher,
        lang: lang,
        is_in_stock: is_in_stock
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(result=>{
            if (result) {
                res.send('Изменено');
            } else {
                res.status(400).send('Ошибка при изменении строки');
            }})
});

srv.delete('/delete-book/:id', (req, res) => {
    booksModel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(result=>{
            if (result) {
                res.send('Удалено');
            } else {
                res.status(400).send('Ошибка при удалении строки');
            }
        })
});

srv.get('/read-publish', (req, res) => {
    let search = '%'+(req.query.search)+'%';
    booksModel.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('id')),'id'],'publisher'],
        where: {
            publisher: {
                [Sequelize.Op.iLike]: search
            }
        },
        group : ['publisher'],
        order: [
            ['publisher', 'ASC']
        ],
        limit: +req.query.limit
    })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(400).send('Ошибка при чтении данных');
            }})
});
