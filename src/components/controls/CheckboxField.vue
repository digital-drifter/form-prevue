<template>
    <v-checkbox v-model="model"
                v-validate="rules"
                :error-messages="errors.collect(name)"
                :data-vv-name="name"
                :data-vv-as="as"
                :name="name"
                :label="label"
                :required="required"
                prepend-icon="check_box"
                @change="$emit('change', $event)"
                @update="$emit('update', $event)">
    </v-checkbox>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class CheckboxField extends BaseControl {
    model: Array<any> = []
  }
</script>
