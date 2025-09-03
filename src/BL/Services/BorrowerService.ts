import { Borrower } from "../../DAL/Entities/BorrowerEntity";
import { BorrowerRepository } from "../../DAL/Repositories/BorrowerRepository";
import { BadRequestException } from "../../Shared/Utils/ErrorHandling";

export class BorrowerService {
  private readonly repo: BorrowerRepository;

  constructor() {
    this.repo = new BorrowerRepository();
  }

  async create(data: Partial<Borrower>): Promise<Borrower> {
    if (!data.email) {
      throw new BadRequestException("Email is required");
    }

    const existing = await this.repo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new BadRequestException(`Borrower with email ${data.email} already exists`);
    }

    return this.repo.createOne(data);
  }

  async getAll(): Promise<Borrower[]> {
    return this.repo.findMany({});
  }

  async getById(id: number): Promise<Borrower | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Borrower>): Promise<void> {
    if (data.email) {
      const existing = await this.repo.findOne({ where: { email: data.email } });

      if (existing && existing.id !== id) {
        throw new BadRequestException(`Email ${data.email} is already in use by another borrower`);
      }
    }

    await this.repo.updateOne({ id }, data);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
