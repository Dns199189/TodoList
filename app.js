const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const todo1 = new Item({
  name: "Learn React"
});

const todo2 = new Item({
  name: "Learn HTML"
});

const todo3 = new Item({
  name: "Learn CSS"
});

const todo4 = new Item({
  name: "Learn JS"
});

const todo5 = new Item({
  name: "Learn Node"
});

const defaultItems = [todo1, todo2, todo3, todo4, todo5];

app.get("/", function(req, res) {
    Item.find({})
      .then(foundItems => {
        if (foundItems.length === 0) {
          Item.insertMany(defaultItems)
            .then(() => {
              console.log("Default items added to the database.");
              res.redirect("/");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          res.render("list", { dayej: foundItems });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  

app.post("/", function(req, res) {
  const itemName = req.body.elel;
  const newItem = new Item({
    name: itemName
  });
  newItem.save();
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox1;
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Item deleted successfully.");
      res.redirect("/");
    }
  });
});

app.listen(7000, function() {
  console.log("Server started on port 7000");
});
