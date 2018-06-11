<template>
    <v-flex>
        <v-radio-group v-model="model"
                       :mandatory="false"
                       :ref="config.uuid"
                       row>
            <v-radio v-for="(radio, index) in options"
                     :key="index"
                     :label="radio.label"
                     :value="radio.value"
                     @change="$emit('change', $event)"
                     @input="$emit('update', $event)">
            </v-radio>
        </v-radio-group>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings, SettingOption } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'
  import { FieldOptionInterface } from '@/types/options'

  @Component
  export default class RadioField extends BaseControl {
    model: string | number | boolean | null = null

    options: FieldOptionInterface[] = []

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
      direction: new FieldSetting({
        label: 'Direction',
        value: 'Column',
        component: 'v-select',
        options: [
          new SettingOption({
            label: 'Column',
            value: 'Column'
          }),
          new SettingOption({
            label: 'Row',
            value: 'Row'
          })
        ]
      })
    })
  }
</script>
