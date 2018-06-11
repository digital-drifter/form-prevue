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
  /* eslint-disable no-useless-escape */

  import { Component, Vue } from 'vue-property-decorator'
  import { Drawer, Toolbar } from '@/components/layout'
  import FormPreview from './components/FormPreview.vue'

  @Component({
    components: {
      Drawer,
      Toolbar,
      FormPreview
    }
  })
  export default class App extends Vue {
    drawer: boolean = true
  }
</script>
