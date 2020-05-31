let $siteList = $('.siteList')
let $lastLi = $siteList.find("li.last")
const data = JSON.parse(localStorage.getItem('data'))
const hashMap =data || [
    {
        logo:'a',
        logoType:'text',
        url:"https://www.acfun.cn"        
    },
    {
        logo:'./images/bilibili.png',
        logoType:'img',
        url:"https://www.bilibili.com/"        
    }
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((item,index)=>{
        const $li = $(`
        <li>
            <a href="${item.url}">
                <div class="site">
                    <div class="logo">${item.logo[0]}</div>
                    <div class="link">${item.url}</div>
                </div>
            </a>
        </li>
        `).insertBefore($lastLi)
    })
}
render()

$('.addButton').on("click",()=>{
    let url = window.prompt('请输入您添加的网址')
    if(url.indexOf('http' !== 0)){
        url = 'http://' + url
    }
    console.log($lastLi)
    hashMap.push(
        {
            logo:url[0],
            logoType:'text',
            url:url
        }
    )
    render()
});

/**用户关闭页面之前触发 */
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('data',string)
}


