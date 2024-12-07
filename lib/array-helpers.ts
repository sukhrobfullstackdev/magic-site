/**
 * Cast `value` to array. Returns the original value if it is already an array.
 */
export function ensureArray<T>(value?: T | T[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Remove falsey values from the given array `value`.
 */
export function cleanArray<T extends any>(value: T[]): Exclude<T, false | null | undefined>[] {
  return value.filter(Boolean) as Exclude<T, false | null | undefined>[];
}
