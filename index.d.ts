import { Validator, ValidatorOptions } from 'class-validator'
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
    }
  }
}
