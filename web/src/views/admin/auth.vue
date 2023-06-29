<template>
  <div class="auth-page">
    <div v-if="isLogin" class="logout-button" @click="logout">Logout</div>
    <div v-else class="login-button" @click="setVisible">Login</div>
  </div>
  <acg-modal
    title="Auth"
    :visible="isVisible"
    @confirm="confirmHandle"
    @cancel="cancelHandle"
  >
    <div class="auth__form">
      <div class="form__user">
        <acg-input label-placeholder="Email" v-model:value="userRef.email">
          <template #preIcon>
            <email-icon :w="16" :h="16"></email-icon>
          </template>
        </acg-input>
      </div>
      <div class="form__pwd">
        <acg-input
          label-placeholder="Password"
          type="password"
          v-model:value="userRef.pwd"
        >
          <template #preIcon>
            <pwd-icon :w="16" :h="16"></pwd-icon>
          </template>
        </acg-input>
      </div>
    </div>
  </acg-modal>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, reactive } from 'vue'
import AcgModal from '@components/modal/modal.vue'
import AcgInput from '@components/input/index.vue'
import emailIcon from '@icons/email-icon.vue'
import pwdIcon from '@icons/pwd-icon.vue'
import { useUserStore } from '@stores/user.store'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@stores/menu.store'
import { router } from '@routes/index'
export default defineComponent({
  name: 'AuthPage',
  components: {
    AcgModal,
    AcgInput,
    emailIcon,
    pwdIcon
  },
  setup() {
    const isVisible = ref(false)
    const { proxy } = getCurrentInstance() as any
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    const { isLogin, user } = storeToRefs(useUserStore())
    const setVisible = () => {
      isVisible.value = !isVisible.value
    }
    const userRef = reactive({
      email: '',
      pwd: ''
    })

    const confirmHandle = async () => {
      /* TODO: user login / auth */
      if (!userRef.email.trim() || !userRef.pwd.trim()) {
        return proxy.$toast({
          msg: `Email or Password cannot be empty !`,
          color: 'error'
        })
      }
      await userStore.login(userRef.email, userRef.pwd)
      if (isLogin.value) {
        proxy.$toast({
          msg: `Login Success`,
          color: 'success'
        })
        menuStore.setAdminMenu()

        setTimeout(() => {
          setVisible()
        }, 600)
      } else {
        proxy.$toast({
          msg: `Login failed! Please check name or password`,
          color: 'error'
        })
      }
    }

    const logout = () => {
      proxy.$toast({
        msg: `${user.value.name} is logged out`,
        color: 'success'
      })
      // reread
      menuStore.getMenuList()
      userStore.logout()
      userRef.email = ''
      userRef.pwd = ''
      router.push({
        name: 'torrents'
      })
    }

    const cancelHandle = () => {
      setVisible()
      userRef.email = ''
      userRef.pwd = ''
    }
    return {
      isVisible,
      userRef,
      isLogin,
      setVisible,
      confirmHandle,
      cancelHandle,
      logout
    }
  }
})
</script>

<style lang="less" scoped>
.auth-page {
  cursor: pointer;

  .login-button {
    color: #fff;
  }

  .logout-button {
    color: #889096;
  }
}
.auth__form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
