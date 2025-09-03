import { Request, Response } from "express";
import { BorrowReportService } from "../../BL/Services/BorrowReportService";
import { StatusCodes } from "../../Shared/Enums/StatusCodes";


export class BorrowReportController {

  private readonly borrowReportService: BorrowReportService;

  constructor() {
    this.borrowReportService = new BorrowReportService();
  }

  public async getBorrowsInPeriod(req: Request, res: Response) {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(StatusCodes.BadRequest).json({ message: "startDate and endDate are required" });
  }

  const data = await this.borrowReportService.getBorrowsInPeriod(
    new Date(startDate as string),
    new Date(endDate as string)
  );

  return res.status(StatusCodes.OK).json(data);
}

  public async exportBorrowsCSV(req: Request, res: Response) {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
    return res.status(StatusCodes.BadRequest).json({ message: "startDate and endDate are required" });
    }

    const data = await this.borrowReportService.getBorrowsInPeriod(
    new Date(startDate as string),
    new Date(endDate as string)
    );

    const csv = await this.borrowReportService.exportToCSV(data);
    res.header("Content-Type", "text/csv");
    res.attachment("borrows.csv");
    return res.send(csv);
  }

  public async exportBorrowsXLSX(req: Request, res: Response) {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
    return res.status(StatusCodes.BadRequest).json({ message: "startDate and endDate are required" });
    }

    const data = await this.borrowReportService.getBorrowsInPeriod(
    new Date(startDate as string),
    new Date(endDate as string)
    );

    const xlsx = await this.borrowReportService.exportToXLSX(data);
    res.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.attachment("borrows.xlsx");
    return res.send(xlsx);
  }


  public async exportAllLastMonthCSV(req: Request, res: Response) {
    const data = await this.borrowReportService.getAllBorrowsLastMonth();
    const csv = await this.borrowReportService.exportToCSV(data);
    res.header("Content-Type", "text/csv");
    res.attachment("all-borrows.csv");
    return res.send(csv);
  }

  public async exportAllLastMonthXLSX(req: Request, res: Response) {
    const data = await this.borrowReportService.getAllBorrowsLastMonth();
    const xlsx = await this.borrowReportService.exportToXLSX(data);
    res.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.attachment("all-borrows.xlsx");
    return res.send(xlsx);
  }
}
