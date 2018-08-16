// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {}, //方便引入文件
    "postcss-url": {}, //处理文件，比如图片文件、字体文件等引用路径的处理
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {} //自动处理浏览器前缀
  }
}
