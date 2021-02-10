import { computed } from "vue";
import { useStore } from "vuex";

/*
 * @Author: 黄灿民
 * @Date: 2021-02-09 22:06:52
 * @LastEditTime: 2021-02-10 10:53:14
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

export function isLoginFn(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    const store = useStore();
    const isLogin = computed(
      () =>
        !!Object.keys(store.state.userInfo).length ||
        !!Object.keys(userInfo).length
    );
    return isLogin
} 