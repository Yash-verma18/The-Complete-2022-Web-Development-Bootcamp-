//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

// const date = require(__dirname + "/date.js");
// console.log(date);

// mongoose.connect("mongodb://localhost:27017/todolistDB", () => {
//     console.log("Db is connected");
// }, e => console.error(e));

mongoose.connect("mongodb+srv://admin-yash:test123@cluster0.lzrxf.mongodb.net/todolistDB", () => {
    console.log("Db is connected");
}, e => console.error(e));



// to set our apps view engine to ejs.
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});
const item2 = new Item({
    name: "Hit the + buton to add a new item"
});
const item3 = new Item({
    name: "Hit the left corner button to remove the item"
});

const defaultItems = [item1, item2, item3];


// const ListOfItems = [];
// const workItems = ["Create new Web App"];

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);





app.get("/", function(req, res) {

    Item.find(function(err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Succesfully saved all the items to todolistDB ");
                    res.redirect("/");
                }
            });

        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
    });

});

app.post("/", function(req, res) {
  // console.log(req.body);
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
    // if (req.body.list === "Work") {
    //   workItems.push(item);
    //   res.redirect("/work");
    // } else {
    //   items.push(item);
    //   res.redirect("/");
    // }
});

app.post("/delete", function(req, res) {
    const checkedItemID = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemID, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully Deleted");
                res.redirect("/");
            }
        });
    } else {
        // Mongoose findOneAndUpdate
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemID } } }, function(err, results) {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }





    /* I can use deleteOne function or i can use findByIdAndRemove */
    // Item.deleteOne({_id: checkedItemID}, function(err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("Successfully Deleted");
    //     res.redirect("/");
    //   }
    // });
})




// Express Route Parameters.
app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, function(err, foundList) {
        if (!err) {
            if (!foundList) {
                // If foundList does not exist then Create a new list.
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            } else {
                // else Dont create a new list and show the one you found.
                console.log(foundList);
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }
        }
    });
})



// app.get("/about", function(req, res) {
//   res.render("about");
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started succesfully on 4000");
});
