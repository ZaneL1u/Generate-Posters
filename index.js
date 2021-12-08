// 云函数入口文件
const cloud = require('wx-server-sdk')
const puppeteer = require('puppeteer')
const fs = require('fs')
cloud.init()

String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
}

// 云函数入口函数
exports.main = async (event) => {
  // 无头模式
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  try {
    await page.setViewport({
      width: event.width,
      height: event.height
    })
    await page.setContent(getContent(event.template, event.fillData))
    const image = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      fullPage: true
    })
    await browser.close()
    return image
  } catch (err) {
    return {
      code: 201,
      message: err,
    }
  }
}

/**
 * 根据模板获取html内容
 * @param {string} template 模板对象
 * @param {object} fillData 填充的数据
 */
const getContent = (template, fillData) => {
  let templateHTML = fs.readFileSync(`template/${template}.html`, 'utf8')
  return templateHTML.interpolate(fillData);
}