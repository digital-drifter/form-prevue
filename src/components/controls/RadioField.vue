<template>
    <v-radio v-validate="rules"
             :error-messages="errors.collect(name)"
             :data-vv-name="name"
             :data-vv-as="as"
             :label="label"
             :required="required"
             v-model="model"
             prepend-icon="radio_button_checked"
             @change="$emit('change', $event)"
             @update="$emit('update', $event)">
    </v-radio>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class RadioField extends BaseControl {
    model: string | null = null

    @Prop({default: undefined})
    name: string
  }
</script>
