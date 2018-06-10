<template>
    <v-text-field type="email"
                  v-model="model"
                  v-validate="rules"
                  :error-messages="errors.collect(name)"
                  :data-vv-name="name"
                  :data-vv-as="as"
                  :name="name"
                  :label="label"
                  :required="required"
                  prepend-icon="mail"
                  @change="$emit('change', $event)"
                  @update="$emit('update', $event)">
    </v-text-field>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class EmailField extends BaseControl {
    model: string | null = null
  }
</script>
