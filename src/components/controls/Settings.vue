<template>
    <v-menu :close-on-content-click="false"
            :close-on-click="false"
            :position-x="config.menu.x"
            :position-y="config.menu.y"
            offset-y
            absolute
            v-model="open">
        <v-toolbar color="deep-purple darken-3" tabs dense dark>
            <v-tabs color="deep-purple darken-3" v-model="tab" grow>
                <v-tabs-slider color="lime accent-2"></v-tabs-slider>
                <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
            </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tab">
            <v-card style="min-width: 580px; min-height: 420px">
                <!-- Settings Tab -->
                <v-tab-item key="Settings">
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
                </v-tab-item>
                <!-- Options Tab -->
                <v-tab-item key="Options">
                    <v-card-text style="min-height: 366px">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-flex xs5>
                                    <div class="title grey--text text--lighten-1">Label</div>
                                </v-flex>
                                <v-flex xs5>
                                    <div class="title grey--text text--lighten-1">Value</div>
                                </v-flex>
                            </v-layout>
                            <v-layout row v-for="option in options" :key="option.uuid">
                                <v-flex xs5>
                                    <v-text-field :name="option.uuid" v-model="option.label"></v-text-field>
                                </v-flex>
                                <v-flex xs5>
                                    <v-text-field :name="option.uuid" v-model="option.value"></v-text-field>
                                </v-flex>
                                <v-flex xs1 offset-xs1>
                                    <v-btn flat icon @click="onRemoveOptionClicked(option)">
                                        <v-icon flat>clear</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-btn flat color="teal" @click="onAddOptionClicked">Add Option</v-btn>
                        </v-container>
                    </v-card-text>
                </v-tab-item>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="red--text" flat @click="onRemoveClicked">Remove</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="onCancelClicked">Cancel</v-btn>
                    <v-btn class="teal--text" flat @click="onSaveClicked">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-tabs-items>
    </v-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { FieldOptionInterface } from '../../types/options'

  @Component
  export default class Settings extends Vue {
    name: string = 'Settings'

    tab: string = null

    tabs: string[] = ['Settings', 'Options']

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

    get options (): FieldOptionInterface[] {
      return this.config.options
    }

    onAddOptionClicked (): void {
      this.$store.commit('FormModule/ADD_FIELD_OPTION', this.config.uuid)
    }

    onRemoveOptionClicked (option: FieldOptionInterface): void {
      this.$store.commit('FormModule/REMOVE_FIELD_OPTION', {
        uuid: this.config.uuid,
        option
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
