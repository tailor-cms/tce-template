import type { HookServices, ServerRuntime } from '@tailor-cms/cek-common';
import { initState, mocks, type } from 'tce-manifest';
import type { Element } from 'tce-manifest';

// Detect if hooks are running in CEK (used for mocking end-system runtime)
const IS_CEK = process.env.CEK_RUNTIME;
// Don't use in production, use only when IS_CEK=true
const USER_STATE: any = {};

export function beforeSave(element: Element, _services: HookServices) {
  console.log('Before save hook');
  return element;
}

export function afterSave(element: Element, _services: HookServices) {
  console.log('After save hook');
  return element;
}

export function afterLoaded(
  element: Element,
  _services: HookServices,
  _runtime: ServerRuntime,
) {
  console.log('After loaded hook');
  return element;
}

export function afterRetrieve(
  element: Element,
  _services: HookServices,
  _runtime: ServerRuntime,
) {
  console.log('After retrieve hook');
  return element;
}

export function beforeDisplay(_element: Element, context: any) {
  console.log('beforeDisplay hook');
  console.log('beforeDisplay context', context);
  return { ...context, ...USER_STATE };
}

export function onUserInteraction(
  _element: Element,
  context: any,
  payload: any,
): any {
  console.log('onUserInteraction', context, payload);
  // Simulate user state update within CEK
  if (IS_CEK) {
    // Only for showcase purposes
    USER_STATE.interactionTimestamp = new Date().getTime();
    // Can be reset to initial / mocked state via UI
    context.contextTimestamp = USER_STATE.interactionTimestamp;
    Object.assign(USER_STATE, payload);
  }
  // Can have arbitrary return value (interpreted by target system)
  // FE is updated if updateDisplayState is true
  return { updateDisplayState: true };
}

export const hookMap = new Map(
  Object.entries({
    beforeSave,
    afterSave,
    afterLoaded,
    afterRetrieve,
    onUserInteraction,
    beforeDisplay,
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
  onUserInteraction,
  beforeDisplay,
  mocks,
};

export { type, initState, mocks };
