import baseManifest from 'tce-manifest';
import type { ElementManifest } from 'tce-manifest';

import Display from './components/Display.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Display,
};

export default manifest;
export { Display };
