import { Validator, ValidatorOptions } from 'class-validator'

declare module 'egg' {

  interface Context {
    validate: <T>(type: any, data?: any, options?: ValidatorOptions) => Promise<T> | Promise<never>
  }

  interface Application {
    validator: Validator
  }

}