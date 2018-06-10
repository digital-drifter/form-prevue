<template>
    <v-flex>
        <v-text-field v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      :autocomplete="autocomplete"
                      v-model="model"
                      :ref="config.uuid"
                      @change="$emit('change', $event)"
                      @input="$emit('update', $event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/FieldConfig'

  @Component
  export default class TextField extends BaseControl {
    model: string | null = null

    get autocomplete (): boolean {
      return this.config.settings['autocomplete']['value']
    }

    created (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.uuid,
        settings: new FieldSettings({
          label: new FieldSetting({
            label: 'Field Label',
            value: '',
            component: 'v-text-field'
          }),
          required: new FieldSetting({
            label: 'Required?',
            value: false,
            component: 'v-switch'
          }),
          autocomplete: new FieldSetting({
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
