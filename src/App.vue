<template>
    <v-app>
        <drawer :drawer.sync="drawer"></drawer>
        <toolbar :drawer.sync="drawer"></toolbar>
        <v-content>
            <vuep :value="value" :scope="scope"></vuep>
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
      Toolbar
    }
  })
  export default class App extends Vue {
    drawer: boolean = true
    scope: Object = { FormPreview }
    value: string = `
<template>
    <div>
        <form-preview :controls="controls"></form-preview>
    </div>
</template>
<script>
    export default {
      components: {
        FormPreview
      },
      data () {
        return {
          control: '',
          controls: []
        }
      },
      created() {
        this.$root.$on('field:add', field => {
          this.$set(this.controls, this.controls.length, field)
        })
        this.$root.$on('form:clear', () => {
          this.controls = []
        })
      }
    }
<\/script>`
  }
</script>