import { Validator, ValidatorOptions, ValidationError } from 'class-validator'

declare module 'egg' {

  interface Context {
    validate: (type?: any, data?: any, options?: ValidatorOptions) => Promise<ValidationError[]>
  }

  interface Application {
    validator: Validator
  }

}