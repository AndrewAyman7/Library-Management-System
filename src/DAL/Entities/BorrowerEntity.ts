import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowRecord } from './BorrowRecordEntity';

@Entity()
export class Borrower {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredDate!: Date;

  @OneToMany(() => BorrowRecord, (record) => record.borrower)
  borrowRecords!: BorrowRecord[];
}
