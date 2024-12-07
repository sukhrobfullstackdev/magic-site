const canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

export const IS_SERVER = !canUseDOM;
export const IS_CLIENT = !!canUseDOM;
