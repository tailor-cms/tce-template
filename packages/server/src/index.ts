import { initState, type } from 'tce-manifest';
import type { Element } from 'tce-manifest';

type Runtime = 'authoring' | 'delivery';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function beforeSave(element: Element, services: any, runtime: Runtime) {
  console.log('Before save hook');
  return element;
}

export function afterSave(element: Element, services: any, runtime: Runtime) {
  console.log('After save hook');
  return element;
}

export function afterLoaded(element: Element, services: any, runtime: Runtime) {
  console.log('After loaded hook');
  return element;
}

export function afterRetrieve(
  element: Element,
  services: any,
  runtime: Runtime,
) {
  console.log('After retrieve hook');
  return element;
}

export const hookMap = new Map(
  Object.entries({
    beforeSave,
    afterSave,
    afterLoaded,
    afterRetrieve,
  }),
);

export default {
  type,
  hookMap,
  initState,
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
};

export { type, initState };
