const path = require('path');
const fs = require('fs');

const nav = [
  { text: '首页', link: '/' },
  {
    text: 'Vue',
    items: [
      {
        text: 'vue2',
        link: '/vueFolder/vue2/1.介绍.md'
      },
      {
        text: 'vue3',
        link: '/vueFolder/vue3/1.介绍.md'
      },
      {
        text: 'vuex',
        link: '/vueFolder/vuex/1.介绍.md'
      },
      {
        text: 'vueRouter',
        link: '/vueFolder/vueRouter/1.介绍.md'
      },
      {
        text: 'Repos',
        link: '/vueFolder/repos/1.介绍.md'
      }
    ]
  },
  {
    text: 'React',
    items: [
      {
        text: 'react_16.3',
        link: '/reactFolder/react_class_before_16.3/1.介绍.md'
      },
      {
        text: 'react_hooks',
        link: '/reactFolder/react_hooks/1.介绍.md'
      },
      {
        text: 'redux',
        link: '/reactFolder/redux/1.介绍.md'
      },
      {
        text: 'react-router',
        link: '/reactFolder/react-router/1.介绍.md'
      }
    ]
  },
  { text: 'JS', link: '/js/1.介绍.md' },
  { text: 'HTML', link: '/html/1.介绍.md' },
  { text: 'CSS', link: '/css/1.介绍.md' },
  { text: '浏览器', link: '/web/1.介绍.md' }
];

let sideBarConfigArr = [];
function generateSideBar(pathline, sideBarConfig, url, item) {
  // 获取路径下的所有文件和文件夹名称
  let mdDirs = fs.readdirSync(pathline);
  const hasReadme = mdDirs.some((e) => e.includes('README'));
  mdDirs = mdDirs.filter((dir) => !dir.startsWith('.'));

  // 如果当前目录没有readme 需要删掉父级path属性
  if (!hasReadme) {
    delete item.path;
  }

  // 遍历
  mdDirs.forEach((dir) => {
    // 获取当前文件或文件夹路径
    const fullpath = path.resolve(pathline, dir);
    const stats = fs.statSync(fullpath);

    // 如果是文件夹继续递归
    if (stats.isDirectory()) {
      const item = {
        title: dir,
        path: `${url}/${dir}/`.replace(/\/+/g, '/'),
        children: []
      };
      generateSideBar(
        path.resolve(pathline, dir),
        item.children,
        `${url}/${dir}/`.replace(/\/+/g, '/'),
        item
      );
      sideBarConfig.push(item);
      // 如果是个文件
    } else if (stats.isFile()) {
      // 如果是readme
      if (dir.includes('README')) {
        // sideBarConfig.push(url)
      } else {
        //一级目录是文件直接放置在children数组中
        sideBarConfig.push(`${url}/${dir}`.replace(/\/+/g, '/'));
      }
    }
  });
}
generateSideBar(
  path.resolve(__dirname, '../../documents'),
  sideBarConfigArr,
  ''
);

// 单独处理最顶层分类
sideBarConfigArr = sideBarConfigArr.reduce(
  (config, item) => ((config[item.path] = item.children), config),
  {}
);

console.log('sideBarConfigArr', sideBarConfigArr);

module.exports = {
  sidebar: sideBarConfigArr,
  nav
};
