import { info } from "tce-manifest";

function beforeSave(element: any, services: any) {
  console.log("Before save hook", element);
  return element;
}

function afterSave(element: any, services: any) {
  console.log("After save hook", element);
  return element;
}

function afterLoaded(element: any, services: any) {
  console.log("After loaded hook", element);
  return element;
}

function afterRetrieve(element: any, services: any) {
  console.log("After retrieve hook", element);
  return element;
}

const hooks = {
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
};

export const initState = () => ({});
export const type = 'TCE_EXAMPLE';
export const hooksMap = new Map(Object.entries(hooks));
export { beforeSave, afterSave, afterRetrieve, afterLoaded };
export default {
  ...hooksMap,
  type,
  initState
}
