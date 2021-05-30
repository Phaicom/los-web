<template>
  <Multiselect
    class="select"
    v-model="selected"
    :options="options"
    :minChars="1"
    :canDeselect="false"
    :searchable="true"
  >
    <template v-slot:singlelabel="{ value }">
      <div class="multiselect-single-label">
        {{ formatLabel(value.label) }}
      </div>
    </template>
    <template v-slot:option="{ option }">
      <div class="multiselect-option-label">
        {{ option.label }}
      </div>
    </template>
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { cardTextFormatter } from "@/helpers/formatHelper";
import { ref, watch, onMounted } from "vue";

export default {
  components: { Multiselect },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    parentValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const selected = ref("");

    watch(
      () => selected.value,
      () => {
        emit("on-change", selected.value);
      }
    );

    onMounted(() => {
      selected.value = props.parentValue;
    });

    const formatLabel = (label) => {
      return cardTextFormatter(label, 25);
    };

    return { selected, formatLabel };
  },
};
</script>

<style lang="scss">
.select {
  .multiselect-option.is-selected {
    background-color: rgb(var(--v-theme-primary)) !important;

    .is-pointed {
      background-color: rgb(var(--v-theme-primary)) !important;
    }
  }

  .multiselect-input {
    height: 100%;
  }

  .multiselect-single-label,
  .multiselect-option-label {
    font-size: 14px;
  }
}
</style>

<style lang="scss" scoped>
.select {
  position: relative;
  border-radius: 0 2px 2px 0;
  height: 48px;
  width: 100%;
  background: #eaebeb;
  border: none;
  color: #1a1a1a;

  &:focus-visible {
    outline: none;
  }
}
</style>
