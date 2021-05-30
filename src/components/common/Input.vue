<template>
  <div class="common__input" @click="onEnter">
    <p class="input__title" :class="[!isEnter ? 'input__leave' : null]">
      {{ title }}
    </p>
    <input
      ref="inputBox"
      v-model="id"
      class="input__box"
      :class="[!isEnter ? 'input__leave' : null]"
      :type="type"
      @input="onInput($event)"
      @focusout="onLeave"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    parentValue: {
      type: [Number, String],
      default: "",
    },
  },
  setup(props, { emit }) {
    const id = ref(null);
    const isEnter = ref(false);
    const inputBox = ref(null);

    onMounted(() => {
      if (props.parentValue) {
        id.value = props.parentValue;
        onEnter();
      }
    });

    const onEnter = () => {
      isEnter.value = true;
      inputBox.value.focus();
    };

    const onInput = () => {
      emit("input-change", id.value);
    };

    const onLeave = () => {
      if (id.value) {
        return;
      }
      isEnter.value = false;
    };

    return {
      id,
      isEnter,
      inputBox,
      onEnter,
      onInput,
      onLeave,
    };
  },
};
</script>
<style lang="scss" scoped>
.common__input {
  position: relative;
  padding: 5px 15px;
  border-radius: 0 2px 2px 0;
  height: 48px;
  background: #eaebeb;
  border: none;
  color: #1a1a1a;

  .input__title {
    font-size: 11px;
    margin: 0;
    color: #999999;
    transition: font-size 0.3s;

    &.input__leave {
      font-size: 14px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      cursor: text;
    }
  }

  .input__box {
    background: transparent;
    border: none;
    font-size: 14px;
    padding: 0;
    height: auto;
    color: #1a1a1a;
    border-radius: 0;
    caret-color: rgb(var(--v-theme-primary));
    width: 100%;
    outline: none;

    &.input__leave {
      position: absolute;
      opacity: 0;
      overflow: hidden;
      width: 80%;
    }
  }
}
</style>
