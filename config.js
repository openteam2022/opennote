import { defineUserConfig } from 'vuepress'
import openote from './theme/node/index.js'
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'OpenNote',
    description: '一个记录笔记的博客站点',

    theme: openote({
        author: 'OpenNote',
        avator: '/imgs/opennote.jpg',
        summary: '一个记录日常笔记的博客站点',
        logo: '/imgs/opennote.jpg',
        categories:true,
        tags: true,
        navbar: [
            {text: '主页',link:'/'},
            {text: '归档',link:'/timeline.html'},
            {text: '公众号',link:'/guide/gongzhonghao.html'},
            // {text: 'github',link:'/guide/gongzhonghao.html'},
        ],
        footer:{
            name: 'openote',// 版权后面跟的名字
            startDate: '2016',//开始时间，结束时间会自动获取当前的年份
            icpText: 'ICP备案号',
            icpLink: 'https://beian.miit.gov.cn',
            beianText: '公安备案号',
            beianLink: 'http://baidu.com'
        },
        // 友情链接
        friends:[
            {
                name: '千途户外',
                text: '户外运动博客',
                link: 'http://qiantuhuwai.cn'
            },
        ]
    }),
    head: [['link', { rel: 'icon', href: '/imgs/opennote.jpg' }]],
})