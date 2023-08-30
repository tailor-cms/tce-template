import { info, initState } from 'tce-manifest';
import { ElementManifest } from 'tce-manifest/dist/interfaces';

import Display from './components/Display.vue';

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
