# 食用说明

## 开发标准

- 原则上不应该使用任何其他三方库
- 代码尽量简洁易懂

## 目录结构

- `__demo_template__`: 示例模版，新加的示例可以复用这个模版
- coverage: 单测报表
- dist: webpack之后的文件
- docs: 文档集合
- demo-description: 各种demo示例

## scripts

```js
"scripts": {
  "build": "webpack", // build dist
  "open": "webpack-dev-server --open", // 打开浏览器并监听文件变动
  "start-demo-basic": "ROOT=demo-basic npm run open", // 根文件夹为demo-basic启动
  "start-demo-vdom": "ROOT=demo-vdom npm run open", // 根文件夹为demo-vdom启动
  "test": "jest --coverage" // 运行单元测试
},
```