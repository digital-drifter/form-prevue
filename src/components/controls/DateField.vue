<template>
    <v-flex>
        <v-text-field data-input
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
  import { default as Flatpickr } from 'flatpickr'
  import { Instance } from 'flatpickr/dist/types/instance'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class DateField extends BaseControl {
    model: string = (new Date()).toISOString().substring(0, 10)

    flatpickr: Instance | Instance[] = Flatpickr(this.element, {
      enableTime: false,
      defaultDate: this.model,
      onChange: (selectedDates: Date[], dateStr: string) => {
        this.model = dateStr
      }
    })

    settings: FieldSettingsInterface = new FieldSettings({
      label: new FieldSetting({
        label: 'Field Label',
        value: '',
        component: 'v-text-field'
      }),
      required: new FieldSetting({
        label: 'Required?',
        value: false,
        component: 'v-switch'
      })
    })
  }
</script>
<style type="text/css">
    @import '~flatpickr/dist/flatpickr.min.css';
    @import '~flatpickr/dist/themes/airbnb.css';
</style>
