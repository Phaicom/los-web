<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <h3>
              <slot name="header"> default header </slot>
            </h3>
          </div>

          <div class="modal__body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal__footer">
            <slot name="footer">
              default footer
              <button class="modal-default__button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  // props: {
  //   onClick: {
  //     type: Function,
  //     require: true,
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal__wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal__container {
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;

      .modal__header h3 {
        margin-top: 0;
        color: rgb(var(--v-theme-primary));
      }

      .modal__body {
        margin: 20px 0;
      }

      .modal-default__button {
        display: block;
        margin-top: 1rem;
      }
    }
  }
}
</style>
