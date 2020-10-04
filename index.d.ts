import { Validator, ValidatorOptions, ValidationError } from 'class-validator'

declare module 'egg' {

  interface Context {
    validate: (data?: any, options?: ValidatorOptions) => Promise<ValidationError[]>
  }

  interface Application {
    validator: Validator
  }

}