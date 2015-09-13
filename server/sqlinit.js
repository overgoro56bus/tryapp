var fs = require('fs'),
    path = require('path'),
    db = require('./pghelper');

var filePath = path.join(__dirname, './sql/init_sql.sql');
console.log(filePath);

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        db.query(data)
            .then(function() {
                console.log('Postgres tables successfully initialized') ;
            })
            .catch(function(error) {
                console.log('Error initializing Postgres tables initialized');
                console.log(error)
            })
    }

});

filePath = path.join(__dirname, './sql/init_users.sql');
console.log(filePath);

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        db.query(data)
            .then(function() {
                console.log('Postgres tables successfully initialized') ;
            })
            .catch(function(error) {
                console.log('Error initializing Postgres tables initialized');
                console.log(error)
            })
    }

});

filePath = path.join(__dirname, './sql/init_insert_users.sql');
console.log(filePath);

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        db.query(data)
            .then(function() {
                console.log('Postgres tables successfully initialized') ;
            })
            .catch(function(error) {
                console.log('Error initializing Postgres tables initialized');
                console.log(error)
            })
    }

});
