import { likeServe } from "@/server"

/*
 * @Author: 黄灿民
 * @Date: 2021-02-11 16:47:35
 * @LastEditTime: 2021-02-13 10:42:19
 * @LastEditors: 黄灿民
 * @Description: 点赞
 * @FilePath: \cnode\src\views\topic\like.ts
 */
function handleLikeButton(id: string) {
    const result = likeServe(id);
    
}

export default {
    handleLikeButton
}