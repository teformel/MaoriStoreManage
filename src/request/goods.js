import http from "../axios";
//获取商品列表
function getGoodList(page,tab,title){
    //一定要把网络请求的结果返回
    return http.get('/goods/'+page, {
        params:{
            tab,
            title
        }
    })
}

export default {
    getGoodList
}