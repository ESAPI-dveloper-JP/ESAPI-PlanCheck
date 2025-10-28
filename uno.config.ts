import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  safelist: [
    'i-tabler:brain',
    'i-uim:rocket',
    'i-mdi:target-arrow',
    'i-uil:medical-square-full',
  ],
})
