require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const CampusAmbassadorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  userId: {type: String, required: true},
  currentTasks: {
    type: [String], required: false
  },
  completedTasks: {
    type: [Object], required: false
  },
  pointsEarned: { type: Number, required: false },
  lastName: { type: String, required: true },
  middleName: { type: String, default: "" },
});

const CampusAmbassador = mongoose.model(
  "CampusAmbassadorInfo",
  CampusAmbassadorSchema,
  "CampusAmbassadorInfo"
);

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  taskId: { type: String, required: true, unique: true },
  taskName: { type: String, required: true },
  taskDetails: { type: [String], required: true },
  image: { type: String, required: true },
  expiry: { type: Date, required: true },
  points: { type: Number, required: true },
  addedDate: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema, "Task_info");

const AdminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema, "Admin_Info");
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js & MongoDB Server!");
});



app.get("/get-all-tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-all-users", async (req, res) => {
  try {
    const tasks = await CampusAmbassador.find();
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/top-performers", async(req,res) => {
try {
    const topPerformers = await CampusAmbassador.find({ pointsEarned: { $gt: 0}}).sort({ pointsEarned: -1}).limit(3)
     if (!topPerformers) {
      return res.status(404).json({ error: "Performers not found" });
    }
    let profileDate = {};
    if(topPerformers.length > 0){
        topPerformers.forEach((performer)=> {
            const email = performer.email;
            
            console.log("Monkey", performer)
        })
    }
    return res.json(topPerformers);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.get("/users/by-email", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await CampusAmbassador.findOne({email});
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Send the user data as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/validate/userby-id", async (req,res) => {
  const { id,role } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }
  try {
    if(role === "ambassador"){
    const user = await CampusAmbassador.findOne({ userId: id});
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(true); // Send the user data as response
  }
  if(role === "admin"){
    const admin = await Admin.findOne({user_Id: id});
    if(!admin){
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(true);
  }
  return res.status(404).json({error: "User not found"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get("/users/by-id", async (req, res) => {
  const { id,role } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }
  try {
    if(role === "ambassador"){
      console.log("monk")
    const user = await CampusAmbassador.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user); // Send the user data as response
  }
  if(role === "admin"){
    const admin = await Admin.findOne({user_Id: id});
    if(!admin){
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(admin);
  }
  return res.status(404).json({error: "User not found"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
