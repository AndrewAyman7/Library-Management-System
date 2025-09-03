import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class BookDTO {
  @Expose({ groups: ['GET'] })
  id!: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  author!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  isbn!: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  availableQuantity!: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  shelfLocation!: string;
}
