<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light my-3"
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
          />
          <h5 class="card-title text-truncate">{{ column.title }}</h5>
          <p class="card-text text-left description text-secondary">
            {{ column.description }}
          </p>
          <router-link
            class="btn btn-outline-primary"
            :to="`/column/${column._id}`"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store'
import { addColumnAvatar } from '@/utils/helper'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        addColumnAvatar(column, 50, 50)
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style  scoped>
.description {
  line-height: 20px;
  height: 60px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
