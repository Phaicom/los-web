<template>
  <button
    class="common__button"
    :class="{ '--muted': isMuted, '--transparent': transparent }"
    :disabled="isMuted"
    type="button"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    isMuted: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.common__button {
  height: 48px;
  border: 0;
  border-radius: 2px;
  background-color: rgb(var(--v-theme-primary));
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.16);
  color: #fff;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
  font-weight: 600;

  &:active {
    background-color: rgba(var(--v-theme-primary), 0.95);
  }

  &.--transparent {
    background-color: rgba(var(--v-theme-primary), 0.1);
    box-shadow: none;
    color: rgb(var(--v-theme-primary));
  }

  &.--muted {
    background-color: #8a8a8a !important;
  }
}
</style>
