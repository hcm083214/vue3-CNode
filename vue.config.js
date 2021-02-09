/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 15:45:07
 * @LastEditTime: 2021-02-08 15:48:13
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\vue.config.js
 */
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://cnodejs.org/api/v1",
                pathRewrite: { "^/api": "" }
            }
        }
    }
}