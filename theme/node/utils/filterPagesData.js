// 过滤分类
export const filterPagesDataCategory = (data) => {
    let pageData = {};
    data.forEach(page=>{
        let categories = page.frontmatter.categories;
        if(categories){
            if(pageData[categories]){
                pageData[categories].push(page);
            }else{
                pageData[categories] = [page];
            }
        }
    })
    return pageData;
}

// 过滤标签
export const  filterPagesDataTags = (data) => {
    let pageData = {};
    data.forEach(page=>{
        let tags = page.frontmatter.tags;
        if(tags){
            if(pageData[tags]){
                pageData[tags].push(page);
            }else{
                pageData[tags] = [page];
            }
        }
    })
    return pageData;
}
