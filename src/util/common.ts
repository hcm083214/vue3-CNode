// import { login as loginServe } from "@/server";
// import { useRouter } from "vue-router";
import { Store } from "vuex";

/*
 * @Author: 黄灿民
 * @Date: 2021-02-09 22:06:52
 * @LastEditTime: 2021-02-21 10:11:22
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\util\common.ts
 */
export function timeFormat(time: Date) {
    const now = new Date();
    const start = new Date(time);
    const diffTime = now.getTime() - start.getTime();
    const day = Math.floor(diffTime / (24 * 3600 * 1000));
    const hours = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000));
    const month = Math.floor(diffTime / (24 * 3600 * 1000) / 31);
    const year = Math.floor(diffTime / (24 * 3600 * 1000) / 31 / 12);
    const fromNow =
        day > 365
            ? `${year}年前`
            : day > 31
                ? `${month}月前`
                : day > 1
                    ? `${day}天前`
                    : `${hours}小时前`;
    return fromNow;
}
interface Topic {
    top: boolean;
    good: boolean;
    tab: string;
}
export function tag(topic: Topic) {
    if (topic.top) {
        return {
            text: "置顶",
            className: "top",
        };
    }
    if (topic.good) {
        return {
            text: "精华",
            className: "good",
        };
    }
    switch (topic.tab) {
        // 问答
        case "ask":
            return {
                text: "问答",
                className: topic.tab,
            };
        // 分享
        case "share":
            return {
                text: "分享",
                className: topic.tab,
            };
        // 招聘
        case "job":
            return {
                text: "招聘",
                className: topic.tab,
            };
        // 精华
        case "good":
            return {
                text: "精华",
                className: topic.tab,
            };
        // 测试
        case "dev":
            return {
                text: "测试",
                className: topic.tab,
            };
        default:
            return {
                text: "",
                className: "default",
            };
    }
}

export function tabToName(tab: string) {
    switch (tab) {
        case 'top': return '置顶'
        case 'good': return '精华'
        case 'ask': return '问答'
        case 'share': return '分享'
        case 'job': return '招聘'
        case 'dev': return '测试'
    }
}
interface LoginParams {
    isRequireLogin: boolean;
}
// interface LoginResult { success?: boolean; loginname?: string; id?: number; avatar_url?: string }
// export async function asyncLogin(options: LoginParams) {
//     const router = useRouter();
//     const store = useStore();
//     const accessToken = localStorage.getItem('accessToken') as string;
//     const saveUserInfo = (userInfo: LoginResult) => store.commit('saveUserInfo', userInfo);
//     if (accessToken) {
//         const result = await loginServe(accessToken)
//         saveUserInfo(result.data)
//     } else {
//         options.isRequireLogin ?
//             router.push({
//                 name: "Login"
//             }) : ''
//     }
// }

export async function isLoginFn(store: Store<any>, isRequireLogin = false) {
    let isLogin = false
    const accessToken = localStorage.getItem('accessToken') as string;
    const asyncLogin = (options: LoginParams) => store.dispatch('login', options)
    if (!accessToken) {
        store.commit('saveAccessToken', '');
        isLogin = false
    } else {
        store.commit('saveAccessToken', accessToken);
        await asyncLogin({
            isRequireLogin
        });
        isLogin = true;
    }
    return isLogin
} 
