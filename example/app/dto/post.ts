import { Expose } from 'class-transformer';
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    // IsFQDN,
    // IsDate,
    Min,
    Max,
  } from 'class-validator';

export class Post {
    
    @Length(10, 20)
    @Expose()
    title: string;

    @Expose()
    @Contains('hello')
    text: string;

    
    @IsInt()
    @Min(0)
    @Max(10)
    @Expose()
    rating: number;

    
    @IsEmail()
    @Expose()
    email: string;
  }