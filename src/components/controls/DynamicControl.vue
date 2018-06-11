<template>
    <v-flex>
        <div @mouseover="toggleIconVisibility(true)" @mouseleave="toggleIconVisibility(false)" class="field-wrapper">
        <transition name="fade" mode="out-in">
            <v-btn icon class="btn__field-controls btn__handle" v-show="visible">
                <v-icon flat>reorder</v-icon>
            </v-btn>
        </transition>
        <transition name="fade" mode="out-in">
            <v-btn icon class="btn__field-controls btn__settings" @click="toggleSettingsMenu" :ref="control.uuid" v-show="visible">
                <v-icon flat>settings</v-icon>
            </v-btn>
        </transition>
        <component :is="control.field" :uuid="control.uuid"></component>
            </div>
    </v-flex>
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
    visible: boolean = false

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

    toggleIconVisibility (value: boolean): void {
      this.visible = value
    }

    toggleSettingsMenu (event: MouseEvent): void {
      this.$store.dispatch('FormModule/toggleSettingsMenu', {
        uuid: this.control.uuid,
        options: {
          open: true,
          x: event.clientX,
          y: event.clientY,
        }
      })
        .catch(error => {
          // console.error(error)
          return error
        })
    }
  }
</script>
