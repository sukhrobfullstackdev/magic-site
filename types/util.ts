export type AnyDict = Record<string, any>;

export type Nominal<T, Brand extends string> = T & { __brand: Brand };

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;
