<template>
  <div class="firework__container">
    <div class="firework" id="firework1">
      <div class="explosion" v-for="i in 12" :key="'1' + i"></div>
    </div>
    <div class="firework" id="firework2">
      <div class="explosion" v-for="i in 12" :key="'2' + i"></div>
    </div>
    <div class="firework" id="firework3">
      <div class="explosion" v-for="i in 12" :key="'3' + i"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
.firework__container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .firework {
    position: absolute;

    .explosion {
      position: absolute;
      left: -2px;
      bottom: 0;
      width: 4px;
      height: 80px;
      transform-origin: 50% 100%;
      overflow: hidden;

      &:nth-child(1) {
        transform: rotate(0deg) translateY(-15px);
      }

      &:nth-child(2) {
        transform: rotate(30deg) translateY(-15px);
      }

      &:nth-child(3) {
        transform: rotate(60deg) translateY(-15px);
      }

      &:nth-child(4) {
        transform: rotate(90deg) translateY(-15px);
      }

      &:nth-child(5) {
        transform: rotate(120deg) translateY(-15px);
      }

      &:nth-child(6) {
        transform: rotate(150deg) translateY(-15px);
      }

      &:nth-child(7) {
        transform: rotate(180deg) translateY(-15px);
      }

      &:nth-child(8) {
        transform: rotate(210deg) translateY(-15px);
      }

      &:nth-child(9) {
        transform: rotate(240deg) translateY(-15px);
      }

      &:nth-child(10) {
        transform: rotate(270deg) translateY(-15px);
      }

      &:nth-child(11) {
        transform: rotate(300deg) translateY(-15px);
      }

      &:nth-child(12) {
        transform: rotate(330deg) translateY(-15px);
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 40px;
        background-color: #f5cf52;
      }
    }
  }

  #firework1 {
    left: 50%;
    top: 50%;
    transform: scale(1);
  }
  #firework1 .explosion::before {
    animation: explosion 2s ease-in-out infinite;
  }

  #firework2 {
    left: 20%;
    top: 45%;
    transform: scale(0.7);
  }
  #firework2 .explosion::before {
    animation: explosion 2s 0.6s ease-in-out infinite;
  }

  #firework3 {
    left: 80%;
    top: 65%;
    transform: scale(0.4);
  }
  #firework3 .explosion::before {
    animation: explosion 2s 0.4s ease-in-out infinite;
  }
}

@keyframes explosion {
  0% {
    top: 100%;
  }
  33%,
  100% {
    top: -50%;
  }
}
</style>
