import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
export const type = 'ORG/CUSTOM_ELEMENT';

// Display name (e.g. shown to the author)
export const name = 'Custom element';

// Function which inits element state (data property on the Content Element
// entity)
export const initState: DataInitializer = (): ElementData => ({});

// Can be loaded from package.json
export const version = '1.0';

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-cube',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: true,
};

const manifest: ElementManifest = {
  type,
  version: '1.0',
  name,
  initState,
  ui,
};

export default manifest;
export * from './interfaces';
