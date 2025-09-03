import { ILike } from "typeorm";
import { Book } from "../../DAL/Entities/BookEntity";
import { BookRepository } from "../../DAL/Repositories/BookRepository";
import { BadRequestException, NotFoundException } from "../../Shared/Utils/ErrorHandling";

export class BookService {
  private readonly repo: BookRepository;

  constructor() {
    this.repo = new BookRepository();
  }

  async create(data: Partial<Book>): Promise<Book> {
    const existingBook = await this.repo.findOne({ where: { isbn: data.isbn! } });
    if (existingBook) {
      throw new BadRequestException(`Book with ISBN ${data.isbn} already exists`);
    }

    return this.repo.createOne(data);
  }

  async getAll(): Promise<Book[]> {
    return this.repo.findMany({});
  }

  async getById(id: number): Promise<Book | null> {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, data: Partial<Book>): Promise<void> {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    if (data.isbn) {
      const existingBook = await this.repo.findOne({ where: { isbn: data.isbn } });
      if (existingBook && existingBook.id !== id) {
        throw new BadRequestException(`Another book with ISBN ${data.isbn} already exists`);
      }
    }

    await this.repo.updateOne({ id }, data);
  }

  async delete(id: number): Promise<void> {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    await this.repo.delete({ id });
  }

  async search(query: string): Promise<Book[]> {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query cannot be empty');
    }

    return this.repo.findMany({
      where: [
        { title: ILike(`%${query}%`) },
        { author: ILike(`%${query}%`) },
        { isbn: ILike(`%${query}%`) },
      ],
    });
  }
}

