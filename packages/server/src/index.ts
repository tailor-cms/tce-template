import type {
  BeforeDisplayHook,
  ElementHook,
  HookMap,
  OnUserInteractionHook,
  ProcedureHandler,
  ServerModule,
} from '@tailor-cms/cek-common';
import { initState, mocks, type } from 'tce-manifest';
import type { Element } from 'tce-manifest';

// Detect if hooks are running in CEK (used for mocking end-system runtime)
const IS_CEK = process.env.CEK_RUNTIME;
// Don't use in production, use only when IS_CEK=true
const USER_STATE: any = {};

export const beforeSave: ElementHook<Element> = (element) => {
  console.log('Before save hook');
  return element;
};

export const afterSave: ElementHook<Element> = (element) => {
  console.log('After save hook');
  return element;
};

export const afterLoaded: ElementHook<Element> = (
  element,
  _services,
  runtime,
) => {
  console.log('After loaded hook', runtime);
  return element;
};

export const afterRetrieve: ElementHook<Element> = (
  element,
  _services,
  runtime,
) => {
  console.log('After retrieve hook', runtime);
  return element;
};

export const beforeDisplay: BeforeDisplayHook<Element> = (
  _element,
  context,
) => {
  console.log('beforeDisplay hook');
  console.log('beforeDisplay context', context);
  return { ...context, ...USER_STATE };
};

export const onUserInteraction: OnUserInteractionHook<Element> = (
  _element,
  context,
  payload,
) => {
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
};

// Server-side procedures callable from Edit components via the injected $rpc.
// Example:
//   myProcedure: async (services, payload) => {
//     const key = `exports/${payload.uid}.json`;
//     await services.storage.saveFile(key, JSON.stringify(payload.data, null, 2));
//     const url = await services.storage.getFileUrl(key);
//     return { url };
//   },
export const procedures: Record<string, ProcedureHandler> = {};

export const hookMap: HookMap<Element> = new Map(
  Object.entries({
    beforeSave,
    afterSave,
    afterLoaded,
    afterRetrieve,
    onUserInteraction,
    beforeDisplay,
  }),
);

const serverModule: ServerModule<Element> = {
  type,
  hookMap,
  procedures,
  initState,
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
  onUserInteraction,
  beforeDisplay,
  mocks,
};

export default serverModule;
export { type, initState, mocks };
