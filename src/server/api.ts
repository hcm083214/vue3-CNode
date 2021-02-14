/*
 * @Author: 黄灿民
 * @Date: 2021-02-14 14:17:36
 * @LastEditTime: 2021-02-14 14:39:39
 * @LastEditors: 黄灿民
 * @Description: APIList
 * @FilePath: \cnode\src\server\api.ts
 */
 const API = {
    login:'/accesstoken',
    messageCount:'/message/count',
    message:'/messages',
    topicList:'/topics',
    topicDetail:'/topic/',
    topicCollect:'/topic_collect/collect',
    cancelTopicCollect:'/topic_collect/de_collect',
    createTopic:'/topics',
    updateTopic:'/topics/update'
}
export default API;