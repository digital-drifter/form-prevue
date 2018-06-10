<template>
    <v-flex style="position: relative" @mouseover="toggleSettingsIcon(true)" @mouseleave="toggleSettingsIcon(false)">
        <transition name="fade" mode="out-in">
            <v-btn icon class="btn__settings" @click="toggleSettingsMenu" ref="settingsIcon" v-show="settingsIcon">
                <v-icon flat>settings</v-icon>
            </v-btn>
        </transition>
        <component :is="control" :uuid="uuid"></component>
    </v-flex>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import * as Controls from '@/components/controls'
  import uuidv4 from 'uuid'
  import FieldConfig, { SettingsMenu } from '@/configs/FieldConfig'
  import ValidationConfig from '@/configs/ValidationConfig'

  @Component({
    components: {
      ...Controls
    },
    name: 'DynamicControl'
  })
  export default class DynamicControl extends Vue {
    uuid: string = uuidv4()

    settingsIcon: boolean = false

    @Prop() control: string

    created () {
      this.$store.dispatch('FormModule/addField', new FieldConfig({
        uuid: this.uuid,
        type: this.control,
        name: this.control,
        options: null,
        settings: null,
        validation: new ValidationConfig({
          name: this.control,
          as: this.control,
          rules: null
        }),
        menu: new SettingsMenu({
          open: false,
          x: 0,
          y: 0
        })
      }))
        .catch(error => {
          console.error(error)
        })
    }

    toggleSettingsIcon (value: boolean): void {
      this.settingsIcon = value
    }

    toggleSettingsMenu (event: MouseEvent): void {
      this.$store.dispatch('FormModule/toggleSettingsMenu', {
        uuid: this.uuid,
        options: {
          open: true,
          x: event.clientX,
          y: event.clientY,
        }
      })
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>
