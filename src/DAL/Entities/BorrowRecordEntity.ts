import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Book } from './BookEntity';
import { Borrower } from './BorrowerEntity';
import { BorrowStatus } from '../../Shared/Enums/BorrowStatus';


@Entity()
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Book, (book) => book.borrowRecords, { onDelete: 'CASCADE' })
  book!: Book;

  @ManyToOne(() => Borrower, (borrower) => borrower.borrowRecords, { onDelete: 'CASCADE' })
  borrower!: Borrower;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate!: Date | null;

  @Column({ type: 'timestamp' })
  dueDate!: Date;

  @Column({ type: 'enum', enum: BorrowStatus, default: BorrowStatus.BORROWED })
  status!: BorrowStatus;
}
