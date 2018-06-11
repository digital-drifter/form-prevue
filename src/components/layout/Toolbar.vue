<template>
    <v-toolbar class="teal" app absolute clipped-left dark>
        <v-toolbar-side-icon @click.native="$emit('update:drawer', !drawer)"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Form Prevue</span>
        <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Toolbar extends Vue {
    name: string = 'Toolbar'

    @Prop(Boolean) drawer: boolean
  }
</script>
