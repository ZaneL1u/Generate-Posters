const puppeteer = require("puppeteer");
const fs = require("fs");

// 注入渲染方法
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

/**
 * 渲染html，并获取图片ArrayBuffer
 *
 * @returns ArrayBuffer
 */
const renderHTML = async ({ width, height, template, ...fillData }) => {
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
    return image;
  } catch (err) {
    return {
      code: 202,
      message: err.message,
    };
  } finally {
    browser.close();
  }
};

module.exports = {
  renderHTML,
};
