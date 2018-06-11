<template>
    <v-app>
        <drawer :drawer.sync="drawer"></drawer>
        <toolbar :drawer.sync="drawer"></toolbar>
        <v-content>
            <form-preview></form-preview>
        </v-content>
    </v-app>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {
      'drawer': () => import('@/components/layout/Drawer.vue'),
      'toolbar': () => import('@/components/layout/Toolbar.vue'),
      'form-preview': () => import('@/components/FormPreview.vue')
    }
  })
  export default class App extends Vue {
    drawer: boolean = true
  }
</script>
