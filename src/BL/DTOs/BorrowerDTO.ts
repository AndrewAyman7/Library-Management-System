import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class BorrowerDTO {
  @Expose({ groups: ['GET'] })
  id!: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email!: string;
}
