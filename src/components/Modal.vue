<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="onClose"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
export default defineComponent({
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, ctx) {
    useDOMCreate('modal')
    const onClose = () => {
      ctx.emit('modal-on-close')
    }
    const onConfirm = () => {
      ctx.emit('modal-on-confirm')
    }
    return {
      onClose,
      onConfirm
    }
  }
})
</script>
