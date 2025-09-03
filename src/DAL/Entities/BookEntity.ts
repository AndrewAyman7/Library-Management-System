import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowRecord } from './BorrowRecordEntity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ unique: true })
  isbn!: string;

  @Column()
  availableQuantity!: number;

  @Column()
  shelfLocation!: string;

  @OneToMany(() => BorrowRecord, (record) => record.book)
  borrowRecords!: BorrowRecord[];
}
