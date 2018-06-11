<template>
    <component :is="control.field" :uuid="control.uuid"></component>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import * as Controls from '@/components/controls'
  import FieldConfig from '@/configs/FieldConfig'
  import ValidationConfig from '@/configs/ValidationConfig'
  import { SettingsMenu } from '@/configs/SettingsConfig'

  @Component({
    components: {
      ...Controls
    },
    name: 'DynamicControl'
  })
  export default class DynamicControl extends Vue {
    @Prop() control: { [key: string]: any }

    created () {
      this.$store.commit('FormModule/ADD_FORM_FIELD', new FieldConfig({
        uuid: this.control.uuid,
        type: this.control.field,
        name: this.control.field,
        options: null,
        settings: null,
        validation: new ValidationConfig({
          name: this.control.field,
          as: this.control.field,
          rules: null
        }),
        menu: new SettingsMenu({
          open: false,
          x: 0,
          y: 0
        })
      }))
    }
  }
</script>
