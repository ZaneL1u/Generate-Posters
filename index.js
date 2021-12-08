const express = require("express");
const app = express();
const port = 9000;
const { renderHTML } = require("./render");

app.get("/", async (req, res) => {
  try {
    await renderHTML(req.query);
    res.header({ "Content-type": "image/jpeg" });
    res.send(e);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
