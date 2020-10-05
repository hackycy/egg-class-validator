import { Validator, ValidatorOptions, ValidationError } from 'class-validator'

declare module 'egg' {

  interface Context {
    validate: (type?: any, data?: any, options?: ValidatorOptions) => void
  }

  interface Application {
    validator: Validator
  }

}