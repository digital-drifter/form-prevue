<template>
    <v-flex v-if="config">
        <file-pond
                name="test"
                :ref="config.uuid"
                class-name="my-pond"
                label-idle="Drop files here..."
                allow-multiple="true"
                :accepted-file-types="acceptedFileTypes"
                :files="files"
                @init="handleFilePondInit">
        </file-pond>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import vueFilePond from 'vue-filepond/dist/vue-filepond.esm.js'
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import { FieldSettingsInterface } from '@/types/controls'
  import mimeTypes from '@/assets/mime-types.json'

  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

  @Component({
    components: {
      FilePond
    }
  })
  export default class FileField extends BaseControl {
    model: string | null = null

    files: string[] = []

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
      }),
      'accepted-file-types': new FieldSetting({
        label: 'Accepted File Types',
        value: null,
        component: 'v-select',
        options: Object.keys(mimeTypes).map(key => {
          return {
            label: mimeTypes[key],
            value: mimeTypes[key]
          }
        }),
        multiple: true,
        autocomplete: true
      }),
      'allow-multiple': new FieldSetting({
        label: 'Allow Multiple',
        value: false,
        component: 'v-switch',
        hint: 'Allow the user to upload multiple files.'
      }),
      'max-files': new FieldSetting({
        label: 'Max Files',
        value: 1,
        component: 'v-text-field',
        mask: '###',
        hint: 'The maximum number of files that the user can upload.'
      }),
    })

    get acceptedFileTypes (): string {
      return this.config.settings['accepted-file-types'].value
    }

    handleFilePondInit (): void {
    }
  }
</script>
<style type="text/css">
    @import '~filepond/dist/filepond.min.css';
    @import '~filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
</style>
