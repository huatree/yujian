import { createStore } from 'vuex'
import {
  reqColumns,
  reqColumn,
  reqPosts,
  reqLogin,
  reqCurrentUser,
  reqCreatePost,
  reqPost,
  reqUpdatePost,
  reqDeletePost
} from '@/api'
import axios from 'axios'
import { objToArr, arrToObj } from '@/utils/helper'

interface ListProps<P> {
  [id: string]: P
}

export interface ResponseTypeProps<P> {
  code: number
  msg: string
  data: P
}

export interface LoginProps {
  email: string
  password: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  isLoading: boolean
  columns: ListProps<ColumnProps>
  posts: ListProps<PostProps>
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    isLoading: false,
    columns: {},
    posts: {},
    user: { isLogin: false }
  },
  mutations: {
    createPost(state, newPost) {
      state.posts[newPost._id] = newPost
    },
    getColumns(state, rawData) {
      state.columns = arrToObj(rawData.data.list)
    },
    getColumn(state, rawData) {
      state.columns[rawData.data._id] = rawData.data
    },
    getPosts(state, rawData) {
      state.posts = arrToObj(rawData.data.list)
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    getPost(state, rawData) {
      state.posts[rawData.data._id] = rawData.data
    },
    updatePost(state, { data }) {
      state.posts[data._id] = data
    },
    deletePost(state, { data }) {
      delete state.posts[data._id]
    }
  },
  actions: {
    async getColumns(ctx) {
      const res = await reqColumns()
      ctx.commit('getColumns', res.data)
    },
    async getColumn({ commit }, cid: string) {
      const res = await reqColumn(cid)
      commit('getColumn', res.data)
    },
    async getPosts({ commit }, cid: string) {
      const res = await reqPosts(cid)
      commit('getPosts', res.data)
    },
    async login({ commit }, payload: LoginProps) {
      const res = await reqLogin(payload)
      commit('login', res.data)
    },
    async getCurrentUser({ commit }) {
      const res = await reqCurrentUser()
      commit('getCurrentUser', res.data)
    },
    loginAndCurrentUser({ dispatch }, loginData: LoginProps) {
      return dispatch('login', loginData).then(() => {
        return dispatch('getCurrentUser')
      })
    },
    async createPost({ commit }, payload: PostProps) {
      const res = await reqCreatePost(payload)
      commit('createPost', res.data)
    },
    async getPost({ commit }, id: string) {
      const res = await reqPost(id)
      commit('getPost', res.data)
      return res.data
    },
    async updatePost({ commit }, payload: PostProps) {
      const res = await reqUpdatePost(payload)
      commit('updatePost', res)
    },
    async deletePost({ commit }, id: string) {
      const res = await reqDeletePost(id)
      commit('deletePost', res)
      return res.data
    }
  },
  getters: {
    getColumns: state => {
      return objToArr(state.columns)
    },
    getColumnById: state => (id: string) => {
      return state.columns[id]
    },
    getPostsById: state => (cid: string) => {
      return objToArr(state.posts).filter(post => post.column === cid)
    },
    getCurrentPost: state => (id: string) => {
      return state.posts[id]
    }
  }
})

export default store
