<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-form>
                    <v-flex v-for="(control, index) in controls" :key="`control${index}`" class="field-wrapper" @mouseover="toggleSettingsIcon(true)" @mouseleave="toggleSettingsIcon(false)">
                        <transition name="fade" mode="out-in">
                            <v-btn icon class="btn__settings" @click="toggleSettingsMenu($event, control.uuid)" ref="settingsIcon" v-show="settingsIcon">
                                <v-icon flat>settings</v-icon>
                            </v-btn>
                        </transition>
                        <dynamic-control :control="control"></dynamic-control>
                    </v-flex>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
  import uuidv4 from 'uuid'
  import { Component, Vue } from 'vue-property-decorator'
  import DynamicControl from '@/components/controls/DynamicControl.vue'
  import { DynamicControlConfigInterface } from '@/types/controls'

  @Component({
    components: {
      DynamicControl
    }
  })
  export default class FormPreview extends Vue {
    settingsIcon: boolean = false

    controls: DynamicControlConfigInterface[] = []

    created (): void {
      this.$root.$on('field:add', (field: string) => {
        this.$set(this.controls, this.controls.length, {
          field,
          uuid: uuidv4()
        })
      })
      this.$root.$on('field:remove', ({index, uuid}: { index: number, uuid: string }) => {
        this.controls.splice(index, 1)
        this.$store.dispatch('FormModule/removeField', uuid)
          .catch(error => {
            console.error(error)
          })
      })
      this.$root.$on('form:clear', () => {
        this.controls.splice(0, this.controls.length)
      })
      this.$store.dispatch('FormModule/create')
        .catch(error => {
          console.error(error)
        })
    }

    toggleSettingsIcon (value: boolean): void {
      this.settingsIcon = value
    }

    toggleSettingsMenu (event: MouseEvent, uuid: string): void {
      this.$store.dispatch('FormModule/toggleSettingsMenu', {
        uuid,
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
