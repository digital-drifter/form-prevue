<template>
    <v-menu :close-on-content-click="false" :close-on-click="false" :position-x="config.menu.x" :position-y="config.menu.y" offset-y absolute v-model="open">
        <v-card>
            <v-card-text>
                <component v-for="(item, index) in settings"
                           :key="index"
                           :is="item.setting.component"
                           :label="item.setting.label"
                           :hint="item.setting.hint"
                           v-model="item.setting.value"
                           :persistent-hint="true"
                           @input="onSettingChanged($event, item.key, item.setting)"
                           @change="onSettingChanged($event, item.key, item.setting)">
                </component>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="onCancelClicked">Cancel</v-btn>
                <v-btn color="primary" flat @click="onSaveClicked">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import FieldConfig from '@/configs/FieldConfig'
  import { FieldSettingInterface, FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class Settings extends Vue {
    name: string = 'Settings'

    initial: FieldSettingsInterface

    @Prop() config: FieldConfig

    @Watch('open')
    onOpenChanged (current: boolean, previous: boolean) {
      if (current && !previous) {
        this.initial = Object.assign({}, this.config.settings)
        Object.freeze(this.initial)
      }
    }

    get open (): boolean {
      return this.config.menu.open
    }

    get settings (): Object[] {
      return Object.keys(this.config.settings).map(key => {
        return {
          key,
          setting: Object.assign({}, this.config.settings[key])
        }
      })
    }

    closeSettingsMenu (): void {
      this.$store.dispatch('FormModule/toggleSettingsMenu', {
        uuid: this.config.uuid,
        options: {
          open: false,
          x: 0,
          y: 0,
        }
      })
        .catch(error => {
          console.error(error)
        })
    }

    onSettingChanged (value: any, key: string, setting: FieldSettingInterface): void {
      setting.value = value

      this.$store.dispatch('FormModule/updateFieldSetting', {
        uuid: this.config.uuid,
        key,
        setting
      })
        .catch(error => {
          console.error(error)
        })
    }

    onCancelClicked (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.config.uuid,
        settings: this.initial
      })
        .catch(error => {
          console.error(error)
        })

      this.closeSettingsMenu()
    }

    onSaveClicked (): void {
      this.closeSettingsMenu()
    }
  }
</script>
