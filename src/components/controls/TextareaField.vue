<template>
    <v-flex>
        <v-text-field :ref="config.uuid"
                      v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      :rows="rows"
                      :cols="cols"
                      v-model="model"
                      textarea
                      @change="$emit('change', $event)"
                      @input="$emit('update', $event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'

  @Component
  export default class TextareaField extends BaseControl {
    model: string | null = null

    get rows (): boolean {
      return this.config.settings['rows']['value']
    }

    get cols (): boolean {
      return this.config.settings['cols']['value']
    }

    beforeCreate (): void {
      this.settings = new FieldSettings({
        label: new FieldSetting({
          label: 'Field Label',
          value: '',
          component: 'v-text-field'
        }),
        required: new FieldSetting({
          label: 'Required',
          value: false,
          component: 'v-switch'
        }),
        autofocus: new FieldSetting({
          label: 'Autofocus',
          value: false,
          component: 'v-switch'
        }),
        cols: new FieldSetting({
          label: 'Columns',
          value: 20,
          component: 'v-text-field',
          hint: 'Number of visible columns.'
        }),
        rows: new FieldSetting({
          label: 'Rows',
          value: 2,
          component: 'v-text-field',
          hint: 'Visible number of lines in a text area.'
        }),
        maxlength: new FieldSetting({
          label: 'Maximum Length',
          value: null,
          component: 'v-text-field',
          hint: 'Maximum number of characters allowed in the text area.'
        }),
        placeholder: new FieldSetting({
          label: 'Placeholder',
          value: null,
          component: 'v-text-field',
          hint: 'Short hint that describes the expected value of a text area.'
        }),
      })
    }
  }
</script>
