import { Expose } from 'class-transformer';
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
  } from 'class-validator';

export class Post {
    @Expose()
    @Length(10, 20)
    title: string;

    @Expose()
    @Contains('hello')
    text: string;

    @Expose()
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsFQDN()
    site: string;

    @Expose()
    @IsDate()
    createDate: Date;
  }