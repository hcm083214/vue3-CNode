<!--
 * @Author: 黄灿民
 * @Date: 2021-02-09 16:04:57
 * @LastEditTime: 2021-02-15 16:25:51
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\topic\Topic.vue
-->
<template>
  <section class="topic index-section">
    <div class="topics-container" v-if="detail">
      <div class="detail">
        <div class="loading" v-show="loading">loading...</div>
        <div class="topic-top">
          <div class="topic-title">
            <span class="tag" v-if="detail.top || detail.good">{{
              tag(detail).text
            }}</span>
            <h1>{{ detail.title }}</h1>
          </div>
          <div class="topic-bottom">
            <div class="topic-info">
              <span>• 发布于 {{ timeFormat(detail.create_at) }} • 作者 </span>
              <router-link :to="`/user/${detail.author.loginname}`">{{
                detail.author.loginname
              }}</router-link>
              <span>
                • {{ detail.visit_count }} 次浏览 • 最后一次编辑是
                {{ timeFormat(detail.last_reply_at) }} • 来自
                {{ tabToName(detail.tab) }}</span
              >
            </div>
            <div class="collection user-select-none" v-if="isLogin">
              <button
                @click="handleCollectionButton(detail.is_collect, detail.id)"
              >
                {{ detail.is_collect ? "取消收藏" : "收藏" }}
              </button>
            </div>
            <div
              class="operation-edit"
              v-if="isLogin && detail.author_id === userInfo.id"
            >
              <router-link :to="{name:'Create', query:{id:detail.id}}">
                <!-- <Icon type="compose" title="编辑"></Icon> -->
                编辑
              </router-link>
            </div>
          </div>
        </div>
        <div class="content markdown-body" v-html="detail.content"></div>
      </div>
      <!-- 回复区域 -->
      <div class="reply" v-show="detail.reply_count > 0">
        <div class="reply-count">{{ detail.reply_count }} 回复</div>
        <ul>
          <li v-for="(item, index) of detail.replies" :key="item.id">
            <div class="avatar">
              <router-link :to="`/user/${item.author.loginname}`">
                <img :src="item.author.avatar_url" alt="头像" />
              </router-link>
            </div>
            <div class="right">
              <div class="reply-right">
                <div class="reply-author">
                  <router-link :to="`/user/${item.author.loginname}`">{{
                    item.author.loginname
                  }}</router-link>
                  <span
                    >{{ index + 1 }}楼•{{ timeFormat(item.create_at) }}</span
                  >
                  <strong
                    v-if="detail.author.loginname == item.author.loginname"
                    >作者</strong
                  >
                </div>
                <div class="operation user-select-none">
                  <div>
                    <span class="like" @click="handleLikeButton(item.id, index)"
                      >👍
                      <!-- <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianzan"></use>
                      </svg> -->
                    </span>
                    <!-- <Icon  :type="item.is_uped ? 'ios-heart' : 'ios-heart-outline'"/> -->
                    <em>{{ item.ups.length }}</em>
                  </div>
                  <div
                    @click="replyOthers(item.author.loginname)"
                    v-if="isLogin"
                  >
                    ◀
                    <!-- <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-huifu"></use>
                    </svg> -->
                  </div>
                </div>
              </div>

              <div
                class="reply-content markdown-body"
                v-html="item.content"
              ></div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 新建评论 -->
      <div class="insert-reply" :class="{ hidden: !isLogin }">
        <div class="tip">添加回复</div>
        <textarea id="markdown-editor"></textarea>
        <div class="reply-btn">
          <button type="button" @click="insertReply">
            {{ insertBtnText }}
          </button>
        </div>
      </div>
    </div>
    
  </section>
  <side-bar :author="detail.author" from="topic" v-if="detail"/>
</template>

<script lang="ts">
import { getTopicData, likeServe } from "@/server";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { timeFormat, tag, tabToName, isLoginFn } from "@/util/common.ts";
import collect from "./collect";
import SideBar from "@/components/siderbar/SideBar.vue";
export default defineComponent({
  name:'Topic',
  components: { SideBar },
  setup() {
    const route = useRoute();
    const detail = ref();
    const loading = ref(true);

    const userInfo = ref();
    userInfo.value =
      localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo") as string);
    getTopicData(route.params.id as string).then((res) => {
      loading.value = false;
      detail.value = res;
      // console.log(
      //   "🚀 ~ file: Topic.vue ~ line 97 ~ getTopicData ~ detail.value",
      //   detail.value
      // );
    });

    const isLogin = isLoginFn();

    const { handleCollectionButton } = collect;
    const handleLikeButton = (id: string, index: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      likeServe(id).then((res) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        detail.value.replies[index].is_uped = !detail.value.replies[index]
          .is_uped;
        detail.value.replies[index].is_uped
          ? detail.value.replies[index].ups.push(Date.now())
          : detail.value.replies[index].ups.pop();
      });
    };

    const insertBtnText = ref("回复");
    const replyOthers = () => {
      //todos 新建评论待完成
    };

    return {
      detail,
      timeFormat,
      loading,
      tag,
      tabToName,
      isLogin,
      userInfo,
      handleCollectionButton,
      handleLikeButton,
      replyOthers,
      insertBtnText,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.topic {
  .detail {
    position: relative;
    min-height: 300px;
    background: #fff;

    .loading {
      z-index: 666;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding-top: 100px;
      background: #fff;
      text-align: center;
    }

    .topic-top {
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
    }

    .topic-title {
      overflow: hidden;

      .tag {
        float: left;
        margin-top: 3px;
        font-size: 12px;
        background: #80bd01;
        color: #fff;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
        white-space: nowrap;
      }

      h1 {
        float: left;
        width: calc(100% - 50px);
        margin: -4px 5px 0 10px;
        font-weight: bold;
        color: #000;
        font-size: 22px;
      }
    }

    .topic-bottom {
      margin-top: 10px;

      span,
      a {
        font-size: 12px;
      }

      a {
        color: #333;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .collection {
      text-align: right;

      button {
        position: relative;
        padding: 5px 10px;
        background: #80bd01;
        color: #fff;
        border: none;
        font-weight: 500;
        border-radius: 3px;

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 3px;
          background: #000;
          opacity: 0;
        }

        &:active:after {
          opacity: 0.2;
        }
      }
    }

    .operation-edit {
      i {
        cursor: pointer;
        font-size: 22px;
      }
    }

    .content {
      padding: 10px 20px;
      img {
        width: 100%;
      }
    }
  }

  .reply {
    margin-top: 15px;
    border-radius: 3px;
    .reply-count {
      padding: 10px;
      background: #f6f6f6;
    }
    li {
      padding: 10px 10px 30px 10px;
      overflow: hidden;
      background: #fff;
      @include flex();
      justify-content: flex-start;

      .avatar {
        float: left;
        width: 30px;
        overflow: hidden;
        img {
          width: 30px;
          height: 30px;
          background: #f7f7f7;
          object-fit: cover;
          border-radius: 3px;
        }
      }
      .right {
        width: calc(100% - 30px);
        .reply-right {
          float: left;
          width: 100%;
          overflow: hidden;
          padding: 0 10px 0 10px;
          @include flex();
          justify-content: space-between;
          .reply-author {
            float: left;

            a {
              font-size: 12px;
              color: #000;
            }

            span {
              margin-left: 5px;
              font-size: 12px;
              color: #08c;
            }

            strong {
              margin-left: 5px;
              font-size: 12px;
              background: #80bd01;
              color: #fff;
              padding: 1px;
              border-radius: 1px;
              font-weight: bold;
            }
          }

          .operation {
            float: right;

            i {
              cursor: pointer;
              font-size: 16px;
              vertical-align: middle;
            }

            em {
              margin-left: 3px;
            }

            > div {
              float: left;
              margin-left: 7px;
            }
          }
        }
      }

      .reply-content {
        clear: left;
        padding-left: 15px;
      }
    }
  }

  // 新建评论
  .insert-reply {
    margin-top: 15px;
    background: #fff;

    &.hidden {
      z-index: -1111;
      position: fixed;
      top: -1000px;
      left: -1000px;
      visibility: hidden;
    }

    .tip {
      padding: 10px;
      background: #f6f6f6;
    }

    .reply-btn {
      padding: 0 0 10px 10px;

      button {
        position: relative;
        color: #fff;
        background: #08c;
        border-radius: 3px;
        padding: 5px 10px;
        font-weight: 500;
        border: none;

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 3px;
          background: #000;
          opacity: 0;
        }

        &:active:after {
          opacity: 0.1;
        }
      }
    }
  }
}
</style>