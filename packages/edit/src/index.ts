import { ElementManifest } from '../interfaces';
import { info, initState } from '../index';
import Edit from './components/Edit.vue';
import SideToolbar from './components/SideToolbar.vue';
import TopToolbar from './components/TopToolbar.vue';

const manifest: ElementManifest = {
  ...info,
  initState,
  Edit,
  SideToolbar,
  TopToolbar,
  ui: {
    icon: 'mdi-help-circle',
    forceFullWidth: true,
  },
};

export default manifest;

export { Edit, SideToolbar, TopToolbar };
