<template>
    <v-text-field v-validate="rules"
                  :ref="name"
                  :error-messages="errors.collect(name)"
                  :data-vv-name="name"
                  :data-vv-as="as"
                  :name="name"
                  :label="label"
                  :required="required"
                  v-model="model"
                  textarea
                  prepend-icon="notes"
                  @change="$emit('change', $event)"
                  @update="$emit('update', $event)">
    </v-text-field>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class TextareaField extends BaseControl {
    model: string | null = null
  }
</script>
