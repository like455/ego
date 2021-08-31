/**
 * 基础接口地址
 */
const base={
 baseUrl:'http://localhost:3434',
 login:'/api/login',//登录接口
 projectList:'/api/projectList',//商品列表
 search:'/api/search',//搜索接口
 selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
 uploadUrl:'/upload',//上传图片
 addProduct:'/api/backend/item/insertTbItem',//商品添加
 deleteProduct:'/api/backend/item/deleteItemById',//删除接口
 updateProduct:'/api/backend/item/updateTbItem',//修改商品
 getParams:'/api/backend/itemParam/selectItemParamAll',//规格参数列表
 addRulesParams:"/api/backend/itemParam/insertItemParam",//规格参数的配置
 getRulesParams:'/api/category/data',//规格参数类目结构数据获取 cid
 getAdvertList:'/api/content/selectContentCategoryByParentId',//广告分类内容
 addAdvertChild:'/api/content/insertContentCategory',//增加子广告分类
 addAdvertContent:'/api/content/selectTbContentAllByCategoryId',//广告分类管理 内容增加
}

export default base