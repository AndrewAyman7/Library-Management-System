import { Borrower } from "../Entities/BorrowerEntity";
import { GenericRepository } from "./Generic/GenericRepository";

export class BorrowerRepository extends GenericRepository<Borrower> {
  constructor() { super(Borrower); }
}