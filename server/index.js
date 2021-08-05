
const express = require('express');
let MongoClient = require('mongodb').MongoClient;
var url = process.env.DB_MONGO_URL || "mongodb://localhost:27017/22";

const app = express()
const port = 3000

let isConnected = null;
MongoClient.connect(url, function (err, db) {
    if (err) {
        isConnected = 'No';
        console.log('database is not connected')
    }
    else {
        isConnected = 'Yes';
        console.log('connected!!')
    }
});


app.get('/', (req, res) => {
    res.send({ msg: 'Hello World!' + '; url: ' + url + '; connected: ' + isConnected });
})

app.post('/users', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age
        },
            function (err, result) {
                if (err) {
                    res.json(err);
                }
                res.json(result);
                db.close();
            });
    });
});

app.get('/users/:name', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").findOne({
            name: req.params.name
        },
            function (err, result) {
                if (err) {
                    res.json(err);
                    // throw err;
                }
                res.json(result);
                db.close();
            });
    });
});

app.get('/users', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, age: 1 } }).toArray(function (err, result) {
            if (err) {
                res.json(err);
                // throw err;
            }
            res.json(result);
            db.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
