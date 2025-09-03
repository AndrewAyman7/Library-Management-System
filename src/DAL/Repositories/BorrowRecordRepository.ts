import { BorrowRecord } from "../Entities/BorrowRecordEntity";
import { GenericRepository } from "./Generic/GenericRepository";

export class BorrowRecordRepository extends GenericRepository<BorrowRecord> {
  constructor() { super(BorrowRecord); }
}