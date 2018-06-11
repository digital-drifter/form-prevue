<template>
    <vue-drag-resize :is-active="open" :is-draggable="true" @dragging="onDragging">
        <v-menu :close-on-content-click="false"
                :close-on-click="false"
                :position-x="config.menu.x"
                :position-y="config.menu.y"
                offset-y
                absolute
                v-model="open">

            <v-toolbar color="teal darken-4" tabs dense>
                <v-tabs color="teal darken-4" v-model="tab" dark>
                    <v-tabs-slider color="green accent-3" style="min-height: 4px"></v-tabs-slider>
                    <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-icon dark class="menu-handle">reorder</v-icon>
            </v-toolbar>
            <v-tabs-items v-model="tab">
                <v-card class="settings__wrapper">
                    <!-- Settings Tab -->
                    <v-tab-item key="Settings">
                        <v-card-text class="settings__panel">
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
                        <v-card-text class="settings__panel">
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
                                        <v-text-field :name="option.uuid" v-model="option.label" hide-details class="option__input"></v-text-field>
                                    </v-flex>
                                    <v-flex xs5>
                                        <v-text-field :name="option.uuid" v-model="option.value" hide-details class="option__input"></v-text-field>
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
                    <!-- Layout Tab -->
                    <v-tab-item key="Layout">
                        <v-card-text class="settings__panel">
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
                                        <v-text-field :name="option.uuid" v-model="option.label" hide-details class="option__input"></v-text-field>
                                    </v-flex>
                                    <v-flex xs5>
                                        <v-text-field :name="option.uuid" v-model="option.value" hide-details class="option__input"></v-text-field>
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
    </vue-drag-resize>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { FieldOptionInterface } from '@/types/options'
  import vuedraggable from 'vuedraggable/dist/vuedraggable.js'

  @Component({
    components: {
      vuedraggable
    }
  })
  export default class Settings extends Vue {
    name: string = 'Settings'

    position: Object = []

    tab: string = ''

    tabs: string[] = ['Settings', 'Options', 'Layout']

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

    onDragging(event): void {
      console.log(event)
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
