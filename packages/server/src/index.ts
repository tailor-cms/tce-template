import { initState, type } from 'tce-manifest';
import type { Element } from 'tce-manifest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function beforeSave(element: Element, services: any) {
  console.log('Before save hook', element);
  return element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function afterSave(element: Element, services: any) {
  console.log('After save hook', element);
  return element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function afterLoaded(element: Element, services: any) {
  console.log('After loaded hook', element);
  return element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function afterRetrieve(element: Element, services: any) {
  console.log('After retrieve hook', element);
  return element;
}

export default {
  type,
  initState,
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
};

export { type, initState };
