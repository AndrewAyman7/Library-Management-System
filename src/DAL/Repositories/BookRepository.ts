import { Book } from "../Entities/BookEntity";
import { GenericRepository } from "./Generic/GenericRepository";

export class BookRepository extends GenericRepository<Book> {
  constructor() { super(Book); }
}