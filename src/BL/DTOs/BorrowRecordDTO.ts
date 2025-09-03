import { Expose } from 'class-transformer';
import { IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class BorrowRecordDTO {
  @Expose({ groups: ['GET'] })
  id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  bookId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  borrowerId!: number;

  @IsNotEmpty()
  @IsDateString()
  @Expose()
  dueDate!: string;
}
