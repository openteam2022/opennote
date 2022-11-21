import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { containerPlugin } from '@vuepress/plugin-container';
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon';
import { gitPlugin } from '@vuepress/plugin-git';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { palettePlugin } from '@vuepress/plugin-palette';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { themeDataPlugin } from '@vuepress/plugin-theme-data';
import { fs, getDirname, path } from '@vuepress/utils';
import { assignDefaultLocaleOptions, resolveContainerPluginOptions, } from './utils/index.js';
import { createPage} from '@vuepress/core'
import {sortPagesData} from './utils/sortPagesData.js'
import {filterPagesDataCategory,filterPagesDataTags} from './utils/filterPagesData.js'
import { tocPlugin } from '@vuepress/plugin-toc'
import { searchPlugin } from '@vuepress/plugin-search'
const __dirname = getDirname(import.meta.url);
const openote = ({ themePlugins = {}, ...localeOptions } = {}) => {
    assignDefaultLocaleOptions(localeOptions);
    return {
        name: 'vuepress-theme-openote',
        templateBuild: path.resolve(__dirname, '../templates/build.html'),
        alias: {
            // use alias to make all components replaceable
            ...Object.fromEntries(fs
                .readdirSync(path.resolve(__dirname, '../client/components'))
                .filter((file) => file.endsWith('.vue'))
                .map((file) => [
                `@theme/${file}`,
                path.resolve(__dirname, '../client/components', file),
            ])),
            // workaround for https://github.com/vitejs/vite/issues/7621
            '@vuepress/theme-default/client': path.resolve(__dirname, '../client/index.js'),
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        // 创建新页面
        async onInitialized(app){
            // 创建分类页面
            const category =  await createPage(app, {
                    path: '/category.html',
                    frontmatter: {
                      layout: 'category',
                    },
                    content: `<Category/>`,
                });
            // 创建标签页
            const tags =  await createPage(app, {
                    path: '/tags.html',
                    frontmatter: {
                      layout: 'tags',
                    },
                    content: `<Tags/>`,
                });
            // 创建归档页
            const timeline =  await createPage(app, {
                    path: '/timeline.html',
                    frontmatter: {
                      layout: 'timeline',
                    },
                    content: `<Timeline/>`,
                });
            // 添加新页面到全局pages数组
            app.pages.push(category)
            app.pages.push(tags)
            app.pages.push(timeline)
        },
        async onPrepared(app) {
            // 统计所有页面数据
            let pages = [];
            app.pages.forEach(page=>{
                let content = {
                    path: page.data.path,
                    title: page.data.title,
                    frontmatter: page.data.frontmatter
                }
                // 过滤首页和其他单独布局页面
                if(!content.frontmatter.home && !content.frontmatter.layout &&!content.frontmatter.page){
                    pages.push(content)
                }
            })
            // 按时间排序
            const pagesData = sortPagesData(pages);
            // 获取分类
            const categoryData = filterPagesDataCategory(pagesData);
            // 获取标签
            const tagsData = filterPagesDataTags(pagesData);
            // 页面数据写入临时文件pagesData.js文件
            await app.writeTemp('pagesData.js', `export const pagesData = ${JSON.stringify(pagesData)}`)
            // 分类数据写入临时文件categoryData.js文件
            await app.writeTemp('categoryData.js', `export const categoryData = ${JSON.stringify(categoryData)}`)
            // 标签数据写入临时文件tagsData.js文件
            await app.writeTemp('tagsData.js', `export const tagsData = ${JSON.stringify(tagsData)}`)
        },
        extendsPage: (page) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative;
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title;
        },
        plugins: [
            tocPlugin({
              // 配置项
            }),
            searchPlugin({
              // 配置项
            }),
            // @vuepress/plugin-active-header-link
            themePlugins.activeHeaderLinks !== false
                ? activeHeaderLinksPlugin({
                    headerLinkSelector: 'a.sidebar-item',
                    headerAnchorSelector: '.header-anchor',
                    // should greater than page transition duration
                    delay: 300,
                })
                : [],
            // @vuepress/plugin-back-to-top
            themePlugins.backToTop !== false ? backToTopPlugin() : [],
            // @vuepress/plugin-container
            themePlugins.container?.tip !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
                : [],
            themePlugins.container?.warning !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'warning'))
                : [],
            themePlugins.container?.danger !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'danger'))
                : [],
            themePlugins.container?.details !== false
                ? containerPlugin({
                    type: 'details',
                    before: (info) => `<details class="custom-container details">${info ? `<summary>${info}</summary>` : ''}\n`,
                    after: () => '</details>\n',
                })
                : [],
            themePlugins.container?.codeGroup !== false
                ? containerPlugin({
                    type: 'code-group',
                    before: () => `<CodeGroup>\n`,
                    after: () => '</CodeGroup>\n',
                })
                : [],
            themePlugins.container?.codeGroupItem !== false
                ? containerPlugin({
                    type: 'code-group-item',
                    before: (info) => `<CodeGroupItem title="${info}">\n`,
                    after: () => '</CodeGroupItem>\n',
                })
                : [],
            // @vuepress/plugin-external-link-icon
            themePlugins.externalLinkIcon !== false
                ? externalLinkIconPlugin({
                    locales: Object.entries(localeOptions.locales || {}).reduce((result, [key, value]) => {
                        result[key] = {
                            openInNewWindow: value.openInNewWindow ?? localeOptions.openInNewWindow,
                        };
                        return result;
                    }, {}),
                })
                : [],
            // @vuepress/plugin-git
            themePlugins.git !== false
                ? gitPlugin({
                    createdTime: false,
                    updatedTime: localeOptions.lastUpdated !== false,
                    contributors: localeOptions.contributors !== false,
                })
                : [],
            // @vuepress/plugin-medium-zoom
            themePlugins.mediumZoom !== false
                ? mediumZoomPlugin({
                    selector: '.theme-default-content > img, .theme-default-content :not(a) > img',
                    zoomOptions: {},
                    // should greater than page transition duration
                    delay: 300,
                })
                : [],
            // @vuepress/plugin-nprogress
            themePlugins.nprogress !== false ? nprogressPlugin() : [],
            // @vuepress/plugin-palette
            palettePlugin({ preset: 'sass' }),
            // @vuepress/plugin-prismjs
            themePlugins.prismjs !== false ? prismjsPlugin() : [],
            // @vuepress/plugin-theme-data
            themeDataPlugin({ themeData: localeOptions }),
        ],
    };
};

export default opennote;