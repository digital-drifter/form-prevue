<template>
    <v-menu :close-on-content-click="false"
            :close-on-click="false"
            :position-x="config.menu.x"
            :position-y="config.menu.y"
            offset-y
            absolute
            v-model="open">
        <v-card>
            <v-card-text>
                <component v-for="(item, index) in settings"
                           :key="index"
                           :is="item.setting.component"
                           :label="item.setting.label"
                           :hint="item.setting.hint"
                           :items="item.setting.options"
                           :multiple="item.setting.multiple"
                           :autocomplete="item.setting.autocomplete"
                           :mask="item.setting.mask"
                           item-text="label"
                           item-value="value"
                           v-model="item.setting.value"
                           :persistent-hint="true"
                           @input="onSettingChanged($event, item.key, item.setting)"
                           @change="onSettingChanged($event, item.key, item.setting)">
                </component>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn class="red--text" flat @click="onRemoveClicked">Remove</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat @click="onCancelClicked">Cancel</v-btn>
                <v-btn class="teal--text" flat @click="onSaveClicked">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class Settings extends Vue {
    name: string = 'Settings'

    initial: any

    @Prop(Object) config: any

    @Watch('open')
    onOpenChanged (current: boolean, previous: boolean) {
      if (this.config && current && !previous) {
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
          // console.error(error)
          return error
        })
    }

    onSettingChanged (value: any, key: string, setting: any): void {
      if (value instanceof Event) {
        // do nothing...
      } else {
        setting.value = value
        this.$store.dispatch('FormModule/updateFieldSetting', {
          uuid: this.config.uuid,
          key,
          setting
        })
          .catch(error => {
            // console.error(error)
            return error
          })
      }
    }

    onRemoveClicked (): void {
      this.$root.$emit('field:remove', {
        index: this.$store.getters['FormModule/findFieldIndex'](this.config.uuid),
        uuid: this.config.uuid
      })
    }

    onCancelClicked (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.config.uuid,
        settings: this.initial
      })
        .catch(error => {
          // console.error(error)
          return error
        })

      this.closeSettingsMenu()
    }

    onSaveClicked (): void {
      this.closeSettingsMenu()
    }
  }
</script>
