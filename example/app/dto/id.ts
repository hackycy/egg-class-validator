import { Expose } from 'class-transformer';
import {
    IsEmail,
  } from 'class-validator';

export class Id {

    @Expose()
    @IsEmail()
    email: string;

}