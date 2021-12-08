const puppeteer = require("puppeteer");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 9000;

String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

/**
 * 根据模板获取html内容
 * @param {string} template 模板对象
 * @param {object} fillData 填充的数据
 */
const getContent = (template, fillData) => {
  let templateHTML = fs.readFileSync(`template/${template}.html`, "utf8");
  return templateHTML.interpolate(fillData);
};

const renderHTML = ({ width, height, template, ...fillData }) => {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: +width, height: +height });
      await page.setContent(getContent(template, fillData));
      const image = await page.screenshot({
        type: "jpeg",
        quality: 100,
        fullPage: true,
      });
      await browser.close();
      resolve(image);
    } catch (err) {
      console.log(err, err.message);
      reject({
        code: 202,
        message: err,
      });
    }
  });
};

app.get("/", async (req, res) => {
  renderHTML(req.query)
    .then((e) => {
      res.header({ "Content-type": "image/jpeg" });
      res.send(e);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
