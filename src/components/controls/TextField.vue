<template>
    <v-flex>
        <v-text-field v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      v-model="model"
                      :ref="config.uuid"
                      @change="$emit('change', $event)"
                      @update="$emit('update', $event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import Settings from '@/components/controls/Settings.vue'
  import { FormControlSetting, FormControlSettings } from './FormControlConfig'

  @Component({
    components: {
      Settings
    }
  })
  export default class TextField extends BaseControl {
    model: string | null = null

    get label (): string {
      return this.config.settings['label']['value']
    }

    get required (): boolean {
      return this.config.settings['required']['value']
    }

    created (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.uuid,
        settings: new FormControlSettings({
          label: new FormControlSetting({
            label: 'Text Field Label',
            value: '',
            component: 'v-text-field'
          }),
          required: new FormControlSetting({
            label: 'Required?',
            value: false,
            component: 'v-switch'
          }),
        })
      })
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>
