const express = require("express");

const MongoClient = require("mongodb").MongoClient;

// uncomment line 1 and comment out line 2 when deploying to heroku
// const uri = process.env.MONGODB_URI;
const uri =
  "mongodb+srv://ask:DRNU7O8K9fvKDYEK@cluster0.riujc.mongodb.net/eng_db?retryWrites=true&w=majority";

async function init() {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect((err) => {
    // perform actions on the collection object
    if (err) throw err;

    const app = express();

    app.use(express.static("./static"));

    app.get("/get", async (req, res) => {
      const db = await client.db("eng_db");
      const collection = db.collection("dict");

      console.log(req.query);

      const dict = await collection
        .find(
          { word: req.query.search },
          { speech_part: req.query.search }
        )
      .toArray();
      dict.forEach((val) => {
        delete val._id;
      });
      let size = Object.keys(dict).length;
      res.json({ size, dict }).end();
    });
    const PORT = process.env.PORT || 3000;
    app.use(express.static("./static"));
    app.listen(PORT);

    console.log(`running on http://localhost:${PORT}`);
  });
}

init();
