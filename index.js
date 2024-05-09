const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("myPortfolio");
    const servicesCollection = db.collection("services");
    const projectCollection = db.collection("projects");
    const educationCollection = db.collection("educations");

    // services
    app.get("/api/v1/services", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });

    // projects
    app.get("/api/v1/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    // Add a new project
    app.post("/api/v1/projects", async (req, res) => {
      try {
        const {
          name,
          image,
          live_link,
          rating,
          review,
          category,
          gitHub_link,
          video_showcasing,
          gitHub_link_server,
          tec1,
          tec2,
          tec3,
          tec4,
          tec5,
          tec6,
          tec7,
          tec8,
          Des1,
          Des2,
          Des3,
          Des4,
        } = req.body;

        const newProject = {
          name,
          image,
          live_link,
          rating,
          review,
          category,
          gitHub_link,
          video_showcasing,
          gitHub_link_server,
          tec1,
          tec2,
          tec3,
          tec4,
          tec5,
          tec6,
          tec7,
          tec8,
          Des1,
          Des2,
          Des3,
          Des4,
        };

        const result = await projectCollection.insertOne(newProject);

        // res.status(201).send(result.ops[0]);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Route to get a single product by its ID
    app.get("/api/v1/projects/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await projectCollection.findOne(query);
        if (result) {
          console.log(result);
          res.send(result);
        } else {
          res.status(404).send({ error: "Project not found" });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // educations
    app.get("/api/v1/educations", async (req, res) => {
      const result = await educationCollection.find().toArray();
      res.send(result);
    });

    // route
    app.get("/", (req, res) => {
      const serverStatus = {
        message: "Server is running smoothly",
        timestamp: new Date(),
      };
      res.json(serverStatus);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);
