const package = require('../../package.json');
module.exports = {
  title: 'chrisworkalx的博客',
  description: '用心记录每一天的生活',
  base: `/${package.name}/`, // 以/${package.name}作为基准base
  dest: './docs', //打包到指定的目录中
  head: [['link', { rel: 'icon', href: `/superhuman.jpg` }]],
  evergreen: true,
  themeConfig: {
    lastUpdated: '最后更新时间',
    sidebar: require('./sidebar').sidebar,
    nav: require('./sidebar').nav,
    displayAllHeaders: true
  }
};
