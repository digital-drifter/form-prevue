<template>
    <v-flex v-if="config">
        <v-text-field v-validate="validation.rules"
                      :error-messages="errors.collect(validation.name)"
                      :data-vv-name="validation.name"
                      :data-vv-as="validation.as"
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
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class TextField extends BaseControl {
    model: string | null = null

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
      autocomplete: new FieldSetting({
        label: 'Autocomplete',
        value: false,
        component: 'v-switch'
      }),
    })
  }
</script>
