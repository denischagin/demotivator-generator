export interface Validator {
  validate(...args: unknown[]): string[];
}
