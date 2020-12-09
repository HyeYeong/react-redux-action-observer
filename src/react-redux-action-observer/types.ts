export interface Action<T = any> {
  type: T;
  [field: string]: any;
}

export type Observer = (action: Action) => void;
