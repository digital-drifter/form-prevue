<template>
    <v-flex>
        <v-select :ref="config.uuid"
                  v-validate="config.validation.rules"
                  :error-messages="errors.collect(config.validation.name)"
                  :data-vv-name="config.validation.name"
                  :data-vv-as="config.validation.as"
                  :name="config.name"
                  :label="label"
                  :required="required"
                  v-model="model"
                  @change="$emit('change', $event)"
                  @input="$emit('update', $event)">
        </v-select>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class SelectField extends BaseControl {
    model: Array<any> = []

    settings: FieldSettingsInterface = new FieldSettings({
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
      placeholder: new FieldSetting({
        label: 'Placeholder',
        value: null,
        component: 'v-text-field',
        hint: 'Short hint that describes the expected value of a text area.'
      }),
    })
  }
</script>
