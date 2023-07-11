require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
//const date = require(__dirname + "/date.js");
const _ = require("lodash");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// //not to get warnings inside the conole + placing our Mongoose connection into a try/catch function.
//mongoose.set("strictQuery", false); 
const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
// //We have to connect to the DB first and then run the app (specific to Cyclic). To do this => 
connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`);
    }) 
});

// mongoose.connect("mongodb+srv://Vdm:qazwsx123@cluster0.2m2enbz.mongodb.net/toDoListDB");

const itemSchema = new mongoose.Schema({ 
    name: String
});
const workItemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemSchema);
const WorkItem = mongoose.model("workItem", workItemSchema);

const toDo1 = new Item({
    name: "Welcome to our to do list!"
});
const toDo2 = new Item({
    name: "Hit the + button to add a new item."
});
const toDo3 = new Item({
    name: "<-- Hit this to delete an item."
});


const workItem1 = new WorkItem({
    name: "Wake up at no later then 8 am every day."
});
const workItem2 = new WorkItem({
    name: "Do coding at least 6 hours a day."
});
const workItem3 = new WorkItem({
    name: "Keep working on improving coding skills."
});

defaultItems = [toDo1, toDo2, toDo3];
defaultWorkItems = [workItem1, workItem2, workItem3];

//creating a List schema+model
const listSchema = {
    name: String,
    items: [itemSchema]
};
const List = mongoose.model("List", listSchema);


app.get("/", async (req, res)=> {
    let allToDoItems = await Item.find({});

    try {
        if (allToDoItems.length === 0) {
            allToDoItems = await Item.insertMany(defaultItems);
        }
    } catch (err) {
        console.log(err);
    };
    res.render("list", { listTitle: "Today", newListItems: allToDoItems });
});

app.get("/work", async (req, res)=> {

    let allWorkItems = await WorkItem.find({});

    try {
        if (allWorkItems.length === 0) {
            allWorkItems = await WorkItem.insertMany(defaultWorkItems);
        }
    } catch (err) {
        console.log(err);
    };
    res.render("list", { listTitle: "Work", newListItems: allWorkItems });
});

// Route paramers with Express
app.get("/:customListName", async (req, res)=> {
    const customListName = _.capitalize(req.params.customListName);
    let foundList = await List.findOne({ name: customListName });

    try {
        if (!foundList) {
            await List.create({
                name: customListName,
                items: defaultItems
            }).then(() => {
                res.redirect("/" + customListName);
            })
        } else {
            res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
        }
    } catch (err) {
        console.log(err);
    }
});


app.post("/", async (req,res)=> {

    try {
        let itemName = req.body.newItem;
        let listName = req.body.list;
        const newItem = new Item({ name: itemName });

        if (listName === "Work") {
            await WorkItem.create({ name: itemName });
            res.redirect("/work");
        } else if (listName === "Today") {
            await Item.create({ name: itemName });
            res.redirect("/");
        } else {
            const foundList = await List.findOne({ name: listName });
            foundList.items.push(newItem);
            await foundList.save();
            res.redirect("/" + listName);
        }
    } catch (err) {
        console.log(err);
    };
});

app.post("/delete", async (req,res)=> {
    let checkedItemId = req.body.checkbox;
    let listName = req.body.listName;

    try {

        if (listName === "Today" && checkedItemId != undefined) {
            await Item.findByIdAndRemove(checkedItemId)
        } else if (listName === "Work" && checkedItemId != undefined) {
            await WorkItem.findByIdAndRemove(checkedItemId)
        } else {
            await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } })
        }
        res.redirect("/" + listName);
    } catch (err) {
        console.log(err);
    };
});

// app.listen(3000, async ()=> {
//     console.log("Server is running on port 3000");
// });


