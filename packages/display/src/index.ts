import { info, initState } from '../index.js';
import Display from './components/Display.vue';
import { ElementManifest } from '../interfaces';

const manifest: ElementManifest = {
  ...info,
  initState,
  Display,
  ui: {
    icon: 'mdi-help-circle',
    forceFullWidth: true,
  },
};

export default manifest;

export { Display };
