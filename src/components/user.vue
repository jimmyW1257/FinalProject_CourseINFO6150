<template>
  <div class="user">
    <!-- Before log in -->
    <div @click="onOpenModal" class="login-trigger" v-if="!isLogin">
      <i class="user-icon iconfont icon-yonghu" />
      <p class="user-name">Not logged in</p>
    </div>
    <!-- After log in -->
    <div @click="onLogout" class="logined-user" v-else>
      <img v-lazy="$utils.genImgUrl(user.avatarUrl, 80)" class="avatar" />
      <p class="user-name">{{ user.nickname }}</p>
    </div>

    <!-- Login box -->
    <el-dialog
      :modal="false"
      :visible.sync="visible"
      :width="$utils.toRem(320)"
    >
      <p slot="title">Log in</p>
      <div class="login-body">
        <el-input
          class="input"
          placeholder="Please enter your NetEase Cloud Music uid"
          v-model="uid"
        />
        <div class="login-help">
          <p class="help">
            1、Please
            <a href="http://music.163.com" target="_blank"
              >Click me(http://music.163.com)</a
            >open the official website of NetEase Cloud Music
          </p>
          <p class="help">2. Click “Login” in the upper right corner of the page.</p>
          <p class="help">3、Click your avatar to enter my homepage</p>
          <p class="help">
            4, copy the browser address bar /user/home?id= the number behind (netease cloud UID)
          </p>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button
          :loading="loading"
          @click="onLogin(uid)"
          class="login-btn"
          type="primary"
          >Log in</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from "good-storage"
import { UID_KEY, isDef } from "@/utils"
import { confirm } from "@/base/confirm"
import {
  mapActions as mapUserActions,
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user"

export default {
  // Automatic login
  created() {
    const uid = storage.get(UID_KEY)
    if (isDef(uid)) {
      this.onLogin(uid)
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      uid: ""
    }
  },
  methods: {
    onOpenModal() {
      this.visible = true
    },
    onCloseModal() {
      this.visible = false
    },
    async onLogin(uid) {
      this.loading = true
      const success = await this.login(uid).finally(() => {
        this.loading = false
      })
      if (success) {
        this.onCloseModal()
      }
    },
    onLogout() {
      confirm("Sure you want to write it off?", () => {
        this.logout()
      })
    },
    ...mapUserActions(["login", "logout"])
  },
  computed: {
    ...mapUserState(["user"]),
    ...mapUserGetters(["isLogin"])
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
  }

  .logout {
    transform: translateY(1px);
    margin-left: 8px;
    color: var(--font-color-shallow-grey);
  }

  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .login-help {
      .help {
        margin-bottom: 4px;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 8px 0;
  }

  .logined-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      @include round(40px);
    }
  }
}
</style>
