<template>
    <v-flex>
        <v-checkbox v-model="model"
                    :ref="config.uuid"
                    v-validate="config.validation.rules"
                    :error-messages="errors.collect(config.validation.name)"
                    :data-vv-name="config.validation.name"
                    :data-vv-as="config.validation.as"
                    :name="config.name"
                    :label="label"
                    :required="required"
                    @change="$emit('change', $event)"
                    @input="$emit('update', $event)">
        </v-checkbox>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class CheckboxField extends BaseControl {
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
      })
    })
  }
</script>
