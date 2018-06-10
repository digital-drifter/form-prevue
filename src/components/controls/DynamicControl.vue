<template>
    <v-flex style="position: relative" @mouseover="toggleSettingsIcon(true)" @mouseleave="toggleSettingsIcon(false)">
        <transition name="fade" mode="out-in">
            <v-btn icon class="btn__settings" @click="toggleSettingsMenu" ref="settingsIcon" v-show="settingsIcon">
                <v-icon flat>settings</v-icon>
            </v-btn>
        </transition>
        <component :is="control" :uuid="uuid"></component>
    </v-flex>
    <!--<component :is="control" v-validate="control.rules"-->
    <!--:error-messages="errors.collect(control.name)"-->
    <!--:data-vv-name="control.name"-->
    <!--:data-vv-as="control.as"-->
    <!--:name="control.name"-->
    <!--v-model="control.model"-->
    <!--:counter="10"-->
    <!--:label="control.label"-->
    <!--:required="control.required">-->
    <!--</component>-->
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import * as Controls from '@/components/controls'
  import uuidv4 from 'uuid'
  import FormControlConfig, { SettingsMenu } from '@/components/controls/FormControlConfig'
  import ValidationConfig from '@/components/controls/ValidationConfig'
  import { FormControlSettings } from './FormControlConfig'

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
      this.$store.dispatch('FormModule/addField', new FormControlConfig({
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

    toggleSettingsIcon (value): void {
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

      // this.config.menu.open = false
      // this.config.menu.x = event.clientX
      // this.config.menu.y = event.clientY
      //
      // this.$nextTick(() => {
      //   this.config.menu.open = true
      // })
    }
  }
</script>
