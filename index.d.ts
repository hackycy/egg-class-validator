import { Validator, ValidatorOptions, ValidationError } from 'class-validator'

declare module 'egg' {

  interface Context {
    validate: <T>(type: any, data?: any, options?: ValidatorOptions) => Promise<T>
  }

  interface Application {
    validator: Validator
  }

}