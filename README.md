# Generate-Posters
利用puppeteer根据html模板生成海报。



可直接部署腾讯云serverless，运行环境：Nodejs12.16。


```
项目目录：

├── README.md
├── index.js
├── package.json
├── render.js						   // 主渲染js
└── template  						// 模板目录	
    └── message.html
```



示例url：https://service-ps28ihl7-1253864144.bj.apigw.tencentcs.com/release/?width=500&height=500&template=message&nickName=yorkshire&likeTotal=100&commentTotal=100&title=test%20Title&content=test%20Content%C3%8F

示例url2：https://service-ps28ihl7-1253864144.bj.apigw.tencentcs.com/release/?width=354&height=580&template=red-packet&nickName=Yorkshire&time=2021.12.08-16:00&money=88