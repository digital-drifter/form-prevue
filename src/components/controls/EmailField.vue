<template>
    <v-flex>
    <v-text-field type="email"
                  :ref="config.uuid"
                  v-model="model"
                  v-validate="config.validation.rules"
                  :error-messages="errors.collect(config.validation.name)"
                  :data-vv-name="config.validation.name"
                  :data-vv-as="config.validation.as"
                  :name="config.name"
                  :label="label"
                  :required="required"
                  @change="$emit('change', $event)"
                  @update="$emit('update', $event)">
    </v-text-field>
    <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FormControlSetting, FormControlSettings } from '@/components/controls/FormControlConfig'

  @Component
  export default class EmailField extends BaseControl {
    model: string | null = null

    created (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.uuid,
        settings: new FormControlSettings({
          label: new FormControlSetting({
            label: 'Email Field Label',
            value: '',
            component: 'v-text-field'
          }),
          required: new FormControlSetting({
            label: 'Required?',
            value: false,
            component: 'v-switch'
          }),
          autocomplete: new FormControlSetting({
            label: 'Autocomplete?',
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
