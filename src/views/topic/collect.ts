/*
 * @Author: 黄灿民
 * @Date: 2021-02-10 11:39:38
 * @LastEditTime: 2021-02-10 15:23:32
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\topic\collect.ts
 */
import { topicCollect, topicDeCollect } from "@/server";
export function handleCollectionButton(
    isCollect: boolean,
    topicId: string
) {
    isCollect ? topicDeCollect({ topicId }) : topicCollect({ topicId });
}