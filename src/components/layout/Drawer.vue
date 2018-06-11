<template>
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
        <v-list dense class="grey lighten-4">
            <template v-for="(item, i) in menu.items">
                <v-layout v-if="item.heading" :key="i" row align-center>
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-flex>
                </v-layout>
                <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
                <v-list-tile v-else :key="i" @click="$root.$emit(item.event, item.payload)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text">
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import {AppMenu, AppMenuItem} from '@/components/layout/menu'
  import { MenuInterface } from '@/types/menu'

  @Component
  export default class Drawer extends Vue {
    name: string = 'Drawer'

    menu: MenuInterface = new AppMenu([
      new AppMenuItem({
        heading: 'Layout'
      }),
      new AppMenuItem({
        event: 'form:clear',
        icon: 'clear',
        text: 'Clear All'
      }),
      new AppMenuItem({
        event: 'form:export',
        icon: 'import_export',
        text: 'Export HTML'
      }),
      new AppMenuItem({
        divider: true
      }),
      new AppMenuItem({
        heading: 'Fields'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'TextField',
        icon: 'text_fields',
        text: 'Text'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'NumberField',
        icon: 'looks_one',
        text: 'Number'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'EmailField',
        icon: 'mail',
        text: 'Email'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'TextareaField',
        icon: 'notes',
        text: 'Textarea'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'SelectField',
        icon: 'arrow_drop_down_circle',
        text: 'Select'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'CheckboxField',
        icon: 'check_box',
        text: 'Checkbox'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'RadioField',
        icon: 'radio_button_checked',
        text: 'Radio'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'DateField',
        icon: 'event',
        text: 'Date'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'DatetimeField',
        icon: 'timer',
        text: 'Datetime'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'FileField',
        icon: 'attachment',
        text: 'File'
      }),
      new AppMenuItem({
        event: 'field:add',
        payload: 'UrlField',
        icon: 'link',
        text: 'URL'
      })
    ])

    @Prop(Boolean) drawer: boolean
  }
</script>
