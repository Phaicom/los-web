<template>
  <div>
    <AppLayoutLinks>
      <v-container fluid>
        <slot />
      </v-container>
    </AppLayoutLinks>
  </div>
</template>

<script>
import AppLayoutLinks from "@/layouts/AppLayoutLinks";
export default {
  name: "AppLayoutAbout",
  components: { AppLayoutLinks },
};
</script>
