<template>
    <v-select v-validate="rules"
              :ref="name"
              :error-messages="errors.collect(name)"
              :data-vv-name="name"
              :data-vv-as="as"
              :name="name"
              :label="label"
              :required="required"
              v-model="model"
              prepend-icon="arrow_drop_down_circle"
              @change="$emit('change', $event)"
              @update="$emit('update', $event)">
    </v-select>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class SelectField extends BaseControl {
    model: Array<any> = []
  }
</script>
