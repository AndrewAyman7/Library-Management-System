import { BorrowRecord } from "../../DAL/Entities/BorrowRecordEntity";
import { BookRepository } from "../../DAL/Repositories/BookRepository";
import { BorrowerRepository } from "../../DAL/Repositories/BorrowerRepository";
import { BorrowRecordRepository } from "../../DAL/Repositories/BorrowRecordRepository";
import { BorrowStatus } from "../../Shared/Enums/BorrowStatus";
import { BadRequestException } from "../../Shared/Utils/ErrorHandling";

export class BorrowingService {
  private readonly borrowRepo: BorrowRecordRepository;
  private readonly bookRepo: BookRepository;
  private readonly borrowerRepo: BorrowerRepository;

  constructor() {
    this.borrowRepo = new BorrowRecordRepository();
    this.bookRepo = new BookRepository();
    this.borrowerRepo = new BorrowerRepository();
  }

  async borrowBook(bookId: number, borrowerId: number, dueDate: string): Promise<BorrowRecord> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book || book.availableQuantity < 1) {
      throw new BadRequestException("Book not available");
    }

    const borrower = await this.borrowerRepo.findOne({ where: { id: borrowerId } });
    if (!borrower) {
      throw new BadRequestException("Borrower not found");
    }

    const borrowDate = new Date();
    const due = new Date(dueDate);
    if (due <= borrowDate) throw new BadRequestException("Due date must be in the future");

    const existingBorrow = await this.borrowRepo.findOne({
      where: {
        book: { id: bookId },
        borrower: { id: borrowerId },
        status: BorrowStatus.BORROWED,
      },
    });

    if (existingBorrow) {
      throw new BadRequestException("Borrower already borrowed this book");
    }

    book.availableQuantity -= 1;
    await this.bookRepo.updateOne({ id: book.id }, { availableQuantity: book.availableQuantity });

    return this.borrowRepo.createOne({
      book,
      borrower,
      borrowDate,
      dueDate: due,
      status: BorrowStatus.BORROWED,
    });
  }

  async returnBook(recordId: number): Promise<BorrowRecord> {
    const record = await this.borrowRepo.findOne({
      where: { id: recordId },
      relations: ["book"],
    });

    if (!record) {
      throw new BadRequestException("Record not found");
    }

    record.status = BorrowStatus.RETURNED;
    record.returnDate = new Date();
    await this.borrowRepo.updateOne({ id: record.id }, record);

    record.book.availableQuantity += 1;
    await this.bookRepo.updateOne(
      { id: record.book.id },
      { availableQuantity: record.book.availableQuantity },
    );

    return record;
  }

  async getBorrowerBooks(borrowerId: number): Promise<BorrowRecord[]> {
    return this.borrowRepo.findMany({
      where: { borrower: { id: borrowerId } },
      relations: ["book"],
    });
  }

  async getOverdueBooks(): Promise<BorrowRecord[]> {
    const today = new Date();
    return this.borrowRepo.findMany({
      where: { dueDate: today, status: BorrowStatus.BORROWED },
      relations: ["book", "borrower"],
    });
  }
}
