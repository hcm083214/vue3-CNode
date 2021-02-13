/*
 * @Author: 黄灿民
 * @Date: 2021-02-10 11:39:38
 * @LastEditTime: 2021-02-13 10:31:55
 * @LastEditors: 黄灿民
 * @Description: 收藏
 * @FilePath: \cnode\src\views\topic\collect.ts
 */
import { topicCollect, topicDeCollect } from "@/server";
 function handleCollectionButton(
    isCollect: boolean,
    topicId: string
) {
    isCollect ? topicDeCollect({ topicId }) : topicCollect({ topicId });
}

export default{
    handleCollectionButton
}