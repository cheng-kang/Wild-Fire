const wildfireConfig = {
  database: 'firebase',
  databaseConfig: {
    apiKey: 'AIzaSyCLsuRlCYjLyetc40v0-yFKHZVhumi85bs',
    authDomain: 'wildfirewebsite-35a4f.firebaseapp.com',
    databaseURL: 'https://wildfirewebsite-35a4f.firebaseio.com',
    projectId: 'wildfirewebsite-35a4f',
    storageBucket: '',
    messagingSenderId: '911552849262'
  },
  siteId: 'wildfire',
  pageURL: 'http://chengkang.me/wildfire',
  pageTitle: 'Wildfire Demo',
  locale: 'zh-CN'
}

const {
  database = 'firebase',
  databaseConfig, // required
  siteId, // required
  pageTitle = document.title,
  pageURL = window.location.href,
  locale = 'en'
// } = window.wildfireConfig
} = wildfireConfig

window._wildfire = {
  currentUser: null,
  config: {
    database,
    databaseConfig,
    siteId,
    pageTitle,
    pageURL,
    locale,
    defaultAvatarURL: 'http://7u2sl0.com1.z0.glb.clouddn.com/wildfire/firefighter-avatar.png',
    anonymousUserId: 'anonymous'
  }
}

Vue.prototype.$config = window._wildfire.config

import Vue from 'vue'
import firebase from 'firebase'
import moment from 'moment'
import VueFire from 'vuefire'
import i18next from 'i18next'
import App from './App'

Vue.config.productionTip = true
Vue.use(VueFire)
Vue.prototype.$i18next = i18next
Vue.prototype.$moment = moment

import { iView } from './loadiView'
Vue.use(iView)

const userAppConfig = {
  apiKey: 'AIzaSyB39UJBnIUYAQxu3zKkpyzjTZDDfHt7lzc',
  authDomain: 'wild-fire-ee770.firebaseapp.com',
  databaseURL: 'https://wild-fire-ee770.firebaseio.com',
  projectId: 'wild-fire-ee770',
  storageBucket: 'wild-fire-ee770.appspot.com',
  messagingSenderId: '655484997793'
}
window._wildfire.userApp = firebase.initializeApp(userAppConfig, 'userApp')

Vue.prototype.$userApp = window._wildfire.userApp

window._wildfire.userApp.database().ref('/sites/' + siteId).once('value').then((snapshot) => {
  const result = snapshot.val()
  if (result) {
    console.log('Site Exist.')
    return
  }

  console.error('Site Does Not Exist!')
  return
})

moment.locale(locale.toLowerCase())

i18next.init({
  lng: locale,
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        'button/reply': 'Reply',
        'button/cancel': 'Cancel',
        'button/hide': 'Hide',
        'button/delete': 'Delete',
        'button/post': 'Post',
        'button/reset': 'Reset',
        'button/comments': 'Comments',
        'button/signUp': 'Sign Up',
        'button/signIn': 'Sign in',
        'button/signOut': 'Sign out',
        'button/posting': 'Posting',
        'text/loadingComments': 'Loading comments',
        'textarea/joinTheConversation': 'Join the discusstion...',
        'textarea/joinTheConversationAnonymously': 'Join the discusstion as Anonymous User',
        'textarea/replyToUserComment': 'reply to {{username}}\'s comment',
        'text/anonymousUser': 'Anoymous User',
        'text/add_wildfire_to_your_site': 'Add Wildfire to your site',
        'text/postTheFirstComment': 'Post the first comment!',
        'text/showMoreDiscussion': 'Show more...',
        'text/showLessDiscussion': 'Show less...',
        'text/loadingCommentContent...': 'Loading comment content...',
        'text/commentPosted': 'Comment posted!',
        'text/areYouSureToDeleteThisComment': 'Are you sure to delete this comment?',
        'error/noSiteId': 'Please check your config: missing "siteId".',
        'error/notValidSiteId': 'Please set a valid "siteId".',
        'error/notValidServiceProvider': 'Please check your config: "sercive" should be "firebase" or "wilddo"g.',
        'error/noDatabaseConfig': 'Please check your config: missing "databaseConfig"',
        'error/failedToLoadComments': 'Failed to load comments.',
        'error/failedToPostComment': 'Failed to post comment.'
      }
    },
    'zh-CN': {
      translation: {
        'button/reply': '回复',
        'button/cancel': '取消',
        'button/hide': '收起',
        'button/delete': '删除',
        'button/post': '发送',
        'button/reset': '清空',
        'button/comments': '条评论',
        'button/signUp': '注册',
        'button/signIn': '登录',
        'button/signOut': '注销',
        'button/posting': '发送中',
        'text/loadingComments': '评论加载中',
        'textarea/joinTheConversation': '一起来发言吧...',
        'textarea/joinTheConversationAnonymously': '以 匿名用户 身份发言...',
        'textarea/replyToUserComment': '回复 {{username}} 的评论',
        'text/anonymousUser': '匿名用户',
        'text/add_wildfire_to_your_site': '在你的网站使用 Wildfire',
        'text/postTheFirstComment': '快来发布第一条评论吧！',
        'text/showMoreDiscussion': '展开更多讨论...',
        'text/showLessDiscussion': '收起更多讨论...',
        'text/loadingCommentContent...': '加载评论内容中...',
        'text/commentPosted': '评论成功！',
        'text/areYouSureToDeleteThisComment': '你确定要删除这条评论吗？',
        'error/noSiteId': '请检查你的配置：找不到 "siteId。"',
        'error/notValidSiteId': '请设置一个有效的 "siteId。"',
        'error/notValidServiceProvider': '请检查你的配置： "sercive" 应该为 "firebase" 或者 "wilddog"。',
        'error/noDatabaseConfig': '请检查你的配置： 找不到 "databaseConfig"',
        'error/failedToLoadComments': '加载评论失败。',
        'error/failedToPostComment': '发送评论失败。'
      }
    }
  }
}, (err, t) => {
  if (err) {
    console.error(err)
  } else {
    console.log('i18next Initialized!')
  }
})

window._wildfire.commentDB = firebase.initializeApp(window._wildfire.config.databaseConfig).database()

Vue.prototype.$commentDB = window._wildfire.commentDB

/* eslint-disable no-new */
new Vue({
  el: '#wildfire',
  template: '<App/>',
  components: { App }
})
