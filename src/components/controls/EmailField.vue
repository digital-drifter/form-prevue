<template>
    <v-flex>
        <v-text-field :ref="config.uuid"
                      v-model="model"
                      v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      @input.capture="onInput($event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/FieldConfig'
  import maskInput from 'vanilla-text-mask/dist/vanillaTextMask.js'
  import emailMask from 'text-mask-addons/dist/emailMask'

  @Component
  export default class EmailField extends BaseControl {
    model: string | null = null
    maskedInput: Object = null

    onInput (event: any): void {
      try {
        if (!this.maskedInput) {
          this.maskedInput = maskInput({
            inputElement: event.target,
            mask: emailMask
          })
        }
      } catch (e) {
        // do nothing
      }
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
