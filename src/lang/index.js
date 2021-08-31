import Vue from 'vue';
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import EnLocale from "./enLocale";
import ZhLocale from "./zhLocale";
Vue.use(VueI18n)

// 准备的语言环境
const messages={
    en:{//英语
        ...EnLocale,
        ...enLocale
    },
    zh:{//中文
        ...ZhLocale,
        ...zhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
  })

// 配置element支持vuei18n
Element.i18n((key, value) => i18n.t(key, value))

export default i18n