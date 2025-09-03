import { Between, Repository } from "typeorm";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import * as XLSX from "xlsx";
import { Parser } from "json2csv";
import { BorrowRecord } from "../../DAL/Entities/BorrowRecordEntity";
import { BorrowStatus } from "../../Shared/Enums/BorrowStatus";
import { BorrowRecordRepository } from "../../DAL/Repositories/BorrowRecordRepository";

export class BorrowReportService {
  private readonly borrowRepo: BorrowRecordRepository;
  constructor() {
    this.borrowRepo = new BorrowRecordRepository();
  }

  async getBorrowsInPeriod(startDate: Date, endDate: Date): Promise<BorrowRecord[]> {
    return this.borrowRepo.findMany({
      where: {
        borrowDate: Between(startDate, endDate),
      },
      relations: ["book", "borrower"],
    });
  }


  async getAllBorrowsLastMonth(): Promise<BorrowRecord[]> {
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));

    return this.borrowRepo.findMany({
      where: {
        borrowDate: Between(lastMonthStart, lastMonthEnd),
      },
      relations: ["book", "borrower"],
    });
  }
  

  async exportToCSV(data: BorrowRecord[]): Promise<string> {
    const parser = new Parser({
      fields: ["id", "book.title", "borrower.name", "borrowDate", "dueDate", "status"],
    });
    return parser.parse(data);
  }

  async exportToXLSX(data: BorrowRecord[]): Promise<Buffer> {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((d) => ({
        id: d.id,
        book: d.book.title,
        borrower: d.borrower.name,
        borrowDate: d.borrowDate,
        dueDate: d.dueDate,
        status: d.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Borrows");
    return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  }
}
