const shortid = require('shortid')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync('db.json')
const db = low(adapter).then(
    (db) => {
        db.defaults({
            topic: [],
            author: []
        }).write();

        
        // db.get('author').push({
        //     id: 1,
        //     name: 'LKH',
        //     profile: 'developer'
        // }).write();

        // db.get('topic').push({
        //     id: 1,
        //     title: 'lowdb',
        //     description: 'lowdb is ...',
        //     author: 1
        // }).write();

        // db.get('topic').push({
        //     id: 2,
        //     title: 'mysql',
        //     description: 'mysql is ...',
        //     author: 1
        // }).write();

        // console.log(db.get('topic').value());
        // console.log('---------------------------------------')
        // console.log(
        //     db.get('topic')
        //     .find({title: 'lowdb'})
        //     .value()
        // );

        // db.get('topic')
        //     .find({id:2})
        //     .assign({title: 'MySQL & MariaDB'})
        //     .write()

        // db.get('topic')
        //     .remove({id: 2})
        //     .write()

        let sid = shortid.generate();
        db.get('author')
            .push({
                id: sid,
                name: 'LKH3',
                profile: 'db admin'
            }).write().then(() => {
                console.log('add author');
            });

        db.get('topic')
            .push({
                id: shortid.generate(),
                title: 'MSSQL',
                description: 'MSSQL is ...',
                author: sid
            }).write().then(() => {
                console.log('add topic');
            })

    }
);


