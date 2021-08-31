/**
 * 请求方法
 */
import base from "./config";
import axios, { get, post } from "../utils/request";

const api = {
    /**
     * 登录请求  username  password
     */
    getLogin(params) {
        // return axios.post(base.login,params)
        return post(base.login, params)
    },
    /**
     * 注册
     */
    /**
     * 商品列表接口  projectList  {page:1}
     */
    getProjectList(params) {//{page:xxx}
        return get(base.projectList, params)
    },
    /**
     * 搜索列表  {search:xxx}
     */
    getSearch(params) {
        return axios.get(base.search, { params })
    },
    /**
     * 类目选择
     */
    getSelectCategory(params) {//{id:cid}
        return get(base.selectCategory, params)
    },
    /**
     * 商品添加
     * 参数： title cid  category sellPoint price num desc paramsInfo image
     */
    getAddProduct(params) {//{}
        return get(base.addProduct, params)
    },
    /**
     * 删除商品 {id:''}
     */
    getDeleteProduct(params) {
        return get(base.deleteProduct, params)
    },
    /**
     * 编辑商品
     */
    updateProduct(params) {
        return get(base.updateProduct, params)
    },
    /**
     * 规格参数
     */
    getParams(params) {
        return get(base.getParams, params)
    },
    /**
     * 规格参数配置
     * itemCatId  content  specsName
     */
    addRulesParams(params) {
        return get(base.addRulesParams, params)
    },
    /**
     * 获取商品规格参数配置
     */
    getRulesParams(params) {
        return get(base.getRulesParams, params)
    },
    /**
     * 广告分类内容
     */
    getAdvertList(params) {
        return get(base.getAdvertList, params)
    },
    /**
     * 增加子广告分类  pid  name
     */
    addAdvertChild(params) {
        return get(base.addAdvertChild, params)
    },
    /**
     * 内容分类管理 内容查询
     */
    addAdvertContent(params) {
        return get(base.addAdvertContent, params)
    }
}

export default api