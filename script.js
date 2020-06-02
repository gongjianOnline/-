let $siteList = $('.siteList')
let $lastLi = $siteList.find("li.last")
const data = JSON.parse(localStorage.getItem('data'))
const hashMap =data || [
    {
        logo:'a',
        url:"https://www.acfun.cn"        
    },
    {
        logo:'B',

        url:"https://www.bilibili.com"        
    }
];
const simplifUrl = (url)=>{
    return url.replace('http://',"").replace('https://','').replace('www.','').replace(/\/.*/,"")
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((item,index)=>{
        console.log(item)
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${item.logo}</div>
                <div class="link">${simplifUrl(item.url)}</div>
                <div class="close">X</div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(item.url)
        })
        $li.on('click',".close",(e)=>{
            e.stopPropagation() //阻止冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
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
            logo:simplifUrl(url)[0].toUpperCase(),
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

//监听键盘
$(document).on('keypress',(e)=>{
    const {key} = e;
    hashMap.forEach((item,index)=>{
        if(item.logo.toLowerCase() === key){
            window.open(item.url)
        }
    })
})

