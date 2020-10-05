import {
    IsEmail,
  } from 'class-validator';

export class Id {
  
    @IsEmail()
    email: string;

}