const express = require("express");

const MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGODB_URI;

// const uri =
//   "mongodb+srv://ask:DRNU7O8K9fvKDYEK@cluster0.riujc.mongodb.net/eng_db?retryWrites=true&w=majority";

async function init() {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect((err) => {
    // perform actions on the collection object
    if (err) throw err;

    const app = express();

    app.get("/get", async (req, res) => {
      const db = await client.db("eng_db");
      const collection = db.collection("dict");

      const dict = await collection
        .find(
          { word: req.query.search },
          // {
          //   $text: { $search: req.query.search },
          // },
          // { _id: 0 },
          console.log(req.query.search)
        )

        // .sort({ score: { $meta: "textScore" } })
        // .limit(1)

        .toArray();
      dict.forEach((val) => {
        delete val._id;
      });
      let size = Object.keys(dict).length;
      res.json({ size, dict }).end();
    });

    app.listen(process.env.PORT || 3000, function () {
      console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
      );
    });

    app.use(express.static("./static"));
    // app.listen(PORT);

    // console.log(`running on http://localhost:${PORT}`);
  });
}
init();

// db.listCollections()
//   .toArray()
//   .then((docs) => {
//     console.log("Available collections:");
//     docs.forEach((doc, idx, array) => {
//       console.log(doc.name);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     client.close();
//   });

// db.dict.createIndex({
//   word: "text"
// });

// db.dict.find({ $text: { $search: "new" } }).sort({ score: { $meta: "textScore" } });
