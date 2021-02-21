/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 15:53:28
 * @LastEditTime: 2021-02-18 11:08:39
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\server\index.ts
 */
import axios from "axios";
import { Message } from 'element3';
import API from "./api";

const instance = axios.create({
    baseURL: '/api',
})

instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken') as string
    const defaultData = {
        accesstoken: accessToken
    };

    if (config.method === 'post') {
        config.data = Object.assign(defaultData, config.data);
    }

    if (config.method === 'get') {
        config.params = Object.assign(defaultData, config.params);
    }
    return config;
})
instance.interceptors.response.use(
    res => res,
    err => {
        let result
        const statusCode = err.response.status;
        if (statusCode == 404) {
            result = {
                success: false,
                msg: '接口已被关闭!'
            }
            Message.error('接口已被关闭!')
        } else {
            result = {
                success: false,
                msg: '请求超时或服务器出错!'
            }
            Message.error('请求超时或服务器出错!')
        }
        return Promise.reject(result);
    }
)

interface LoginResult { success?: boolean; loginname?: string; id?: number; avatar_url?: string }
export async function login(token: string) {
    const result = await instance.post<LoginResult>(API.login, {
        accesstoken: token
    })
    return result;
}

export async function getMessageCount() {
    const result = await instance.get<number>(API.messageCount)
    return result;
}


export async function getMessages() {
    const result = await instance.get(API.message)
    return result.data
}

type TabList = 'ask' | 'share' | 'job' | 'good' | 'dev' | 'all';
interface TopicsParams {
    tab: TabList;
    page: number;
    limit: number;
    mdrender: boolean;
}
export async function getTopicsData(params: TopicsParams) {
    const result = await instance.get(API.topicList, { params })
    return result.data
}

export async function getTopicData(id: string) {
    const result = await instance.get(`${API.topicDetail}${id}`)
    return result.data
}
interface TopicCollectParams {
    topicId: string;
}
export async function topicCollect(params: TopicCollectParams) {
    const result = await instance.post(API.topicCollect, params)
    return result;
}

export async function topicDeCollect(params: TopicCollectParams) {
    const result = await instance.post(API.cancelTopicCollect, params)
    return result;
}

interface LikeServeResult {
    success: boolean;
    action: string;
}
export async function likeServe(id: string) {
    const result = await instance.post<LikeServeResult>(`/reply/${id}/ups`)
    return result;
}

interface CreateTopicParams {
    title: string;
    tab: string;
    content: string;
}
export async function createTopicServe(params: CreateTopicParams) {
    const result = await instance.post(API.createTopic, params);
    return result;
}

interface EditTopicParams {
    topic_id: string;
    title: string;
    tab: string;
    content: string;
}
export async function editTopicServe(params: EditTopicParams) {
    const result = await instance.post(API.createTopic, params);
    return result;
}

export async function getUserInfoServe(params: string){
    const result = await instance.get(`${API.user}${params}`)
    return result;
}