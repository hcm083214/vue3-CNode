/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 15:53:28
 * @LastEditTime: 2021-02-09 22:00:22
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\server\index.ts
 */
import axios from "axios";
import { Message } from 'element3'

const instance = axios.create({
    baseURL: '/api',
})

instance.interceptors.request.use((config) => {
    return config;
})
instance.interceptors.response.use(
    res => res.data,
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

interface LoginResult { success: boolean; loginname?: string; id?: number; avatar_url?: string }
export async function login(token: string) {
    const result =await instance.post<LoginResult>('/accesstoken', {
        accesstoken: token
    })
    return result;
}


type TabList = 'ask' | 'share' | 'job' | 'good' | 'dev' | 'all';
interface TopicsParams {
    tab: TabList;
    page: number;
    limit: number;
    mdrender: boolean;
}
export async function getTopicsData(params: TopicsParams) {
    const result =await instance.get('/topics', { params })
    return result.data
}

export async function getTopicData(id: string) {
    const result =await instance.get(`/topic/${id}`)
    return result.data
}