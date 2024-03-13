

const express = require('express');
require('./db/config');
const User = require('./db/User');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    delete result.password
    res.send(result);
})

app.post("/api/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) 
        { resp.send({user}) } 
        else {
            resp.send({ result: "No User found" })
        }
    } 
    else {
        resp.send({ result: "No User found" })
    }
})

app.get("/api/getuserprofile/:userid", async (req, resp) => {
    let result = await User.findOne({ userid: req.params.userid })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/api/updateuserprofile/:userid", async (req, resp) => {
    let result = await User.updateOne(
        { userid: req.params.userid },
        { $set: req.body }
    )
    resp.send(result)
});


app.listen(8001);


// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const connectDB = async()=> {
// mongoose.connect("mongodb://127.0.0.1:27017/techstore");
// const schema = new mongoose.Schema({ });
// const user = mongoose.model("users", schema);
// const data = await user.find();
// console.warn(data);
// }

// connectDB();
// app.listen(3500);


