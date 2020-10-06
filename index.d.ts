import { Validator, ValidatorOptions, ValidationError } from 'class-validator'
import { ClassTransformOptions } from 'class-transformer'

declare module 'egg' {

  interface Context {
    validate: <T>(type: any, data?: any, options?: ValidatorOptions) => Promise<T> | Promise<never>
  }

  interface Application {
    validator: Validator
  }

  interface EggAppConfig {
    classValidator: {
      /**
       * @description class-transformer option
       */
      classTransformOptions?: ClassTransformOptions
      handleError?: (ctx: Context, errors: ValidationError[]) => void
    }
  }
}
