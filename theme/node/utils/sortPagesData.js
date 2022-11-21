export const sortPagesData = (data) => {
    data.sort((a,b)=>{
        const dateA = new Date(a.frontmatter.date).valueOf();
        const dateB = new Date(b.frontmatter.date).valueOf();
        if(dateA > dateB){
            return -1;
        }else{
            return 1;
        }

    })
    return data;
}