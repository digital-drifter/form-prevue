<template>
    <v-menu :close-on-content-click="false" :close-on-click="false" :position-x="config.menu.x" :position-y="config.menu.y" offset-y absolute v-model="config.menu.open">
        <v-card>
            <v-card-text>
                <component v-for="(item, index) in settings"
                           :key="index"
                           :is="item.setting.component"
                           :label="item.setting.label"
                           v-model="item.setting.value"
                           @change="onSettingChanged($event, item)">
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
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { FormControlConfig } from '@/components/controls/FormControlConfig'

  @Component
  export default class Settings extends Vue {
    name: string = 'Settings'

    @Prop() config: FormControlConfig

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

    onSettingChanged (value, {key, setting}): void {
      setting.value = value
      this.$store.dispatch('FormModule/updateFormControlSetting', {
        uuid: this.config.uuid,
        key,
        setting
      })
        .catch(error => {
          console.error(error)
        })
    }

    onCancelClicked (): void {
      this.closeSettingsMenu()
    }

    onSaveClicked (): void {
      this.closeSettingsMenu()
    }
  }
</script>
