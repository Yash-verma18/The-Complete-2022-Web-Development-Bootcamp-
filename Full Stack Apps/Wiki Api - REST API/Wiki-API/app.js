const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", () => {
    console.log("Db is connected");
}, e => console.error(e));

const wikiSchema = new mongoose.Schema({
    title: String,
    content: String,
});


const Article = mongoose.model("Article", wikiSchema);

///////////////////////////// All Articles /////////////////////////////////

// Chained Router Handlers Using Express

app.route("/articles")

.get(function(req, res) {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    })
})

.post(function(req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });
})

.delete(function(req, res) {
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfully Deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

/////////////////////////// Specific Articles  /////////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res) {
    Article.findOne({ title: req.params.articleTitle }, function(err, foundArticles) {
        if (foundArticles) {
            res.send(foundArticles);
        } else {
            res.send("No Articles matching that title was found");
        }
    });
})

.put(function(req, res) {
    Article.updateOne({ title: req.params.articleTitle }, {
            title: req.body.title,
            content: req.body.content
        },
        function(err) {
            if (!err) {
                res.send("Successfully Updated the article");
            } else {
                res.send(err);
            }
        })
})

.patch(function(req, res) {
    Article.updateOne({ title: req.params.articleTitle }, { $set: req.body },
        function(err) {
            if (!err) {
                res.send("Successfully Updated the article");
            } else {
                res.send(err);
            }
        })
})

.delete(function(req, res) {
    Article.deleteOne({ title: req.params.articleTitle },
        function(err) {
            if (!err) {
                res.send("Deleted the reffered article");
            } else {
                res.send(err);
            }
        })
});

app.listen(3000, function() {
    console.log("Server started successfully");
});


/*
{
    "_id" : ObjectId("61e65a4421c7fbb320789b27"),
    "title" : "REST",
    "content" : "REST is short for REpresentational State Transfer. Its an architectural style for designing APIs."
}


{
    "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
    "title" : "Bootstrap",
    "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
}

{
    "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
    "title" : "DOM",
    "content" : "The Document Object Model is like an API for interacting with our HTML"
}

{
    "_id" : ObjectId("5c139771d79ac8eac11e754a"),
    "title" : "API",
    "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
}

{
    "_id" : ObjectId("61e6ac316c2a68e25192541d"),
    "title" : "Node.js",
    "content" : "Node. js (Node) is an open source development platform for executing JavaScript code server-side. Node is useful for developing applications that require a persistent connection from the browser to the server and is often used for real-time applications such as chat, news feeds and web push notifications.",
    "__v" : 0
}


{
    "_id" : ObjectId("61e6adf4f81fcc84d4827155"),
    "title" : "Mongoose",
    "content" : "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. Object Mapping between Node and MongoDB managed via Mongoose.",
    "__v" : 0
}
*/