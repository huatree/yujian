<template>
  <nav class="navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <router-link class="navbar-brand" :to="'/'">喻鉴专栏</router-link>
      <ul class="list-inline mb-0" v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" :to="'/login'"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" :to="'/signup'"
            >注册</router-link
          >
        </li>
      </ul>
      <ul class="list-inline mb-0" v-else>
        <li class="list-inline-item">
          <dropdown :title="`你好${user.nickName}`">
            <dropdown-item
              ><router-link class="dropdown-item" to="/create"
                >新建文章</router-link
              ></dropdown-item
            >
            <dropdown-item
              ><router-link :to="`/column/${user.column}`" class="dropdown-item"
                >我的专栏</router-link
              ></dropdown-item
            >
            <dropdown-item disabled
              ><a class="dropdown-item" href="#">编辑资料</a></dropdown-item
            >
            <dropdown-item
              ><a class="dropdown-item" href="#" @click.prevent="onLogout"
                >退出登录</a
              ></dropdown-item
            >
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { useRouter } from 'vue-router'
import store, { UserProps } from '@/store'
import createMessage from '@/utils/createMessage'

export default defineComponent({
  name: 'GlobalHeader',
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const onLogout = () => {
      createMessage('登录成功，2秒后跳转首页', 'success')
      setTimeout(() => {
        store.commit('logout')
        router.push('/')
      }, 2000)
    }

    return { onLogout }
  }
})
</script>

