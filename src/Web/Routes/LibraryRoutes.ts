import { Router } from 'express';
import { BookRouter } from './BookRouter';
import { BorrowerRouter } from './BorrowerRouter';
import { BorrowingRouter } from './BorrowingRouter';
import { ReportsRouter } from './ReportsRouter';

const apiRouter = Router();

apiRouter.use('/books', new BookRouter().getRouter());
apiRouter.use('/borrowers', new BorrowerRouter().getRouter());
apiRouter.use('/borrowings', new BorrowingRouter().getRouter());
apiRouter.use('/reports', new ReportsRouter().getRouter());

export default apiRouter;
