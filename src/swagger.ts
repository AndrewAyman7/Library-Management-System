export const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Library Management System",
    description: "API documentation for managing books, borrowers, borrowing process, and reports",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:5000",
  basePath: "/api",
  schemes: ["http"],
  tags: [
    { name: "Books", description: "Manage books" },
    { name: "Borrowers", description: "Manage borrowers" },
    { name: "Borrowings", description: "Borrowing process" },
    { name: "Reports", description: "Borrowing reports and exports" },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],

  paths: {
    "/books": {
      post: {
        tags: ["Books"],
        summary: "Create a new book",
        parameters: [
          { in: "body", name: "body", required: true, schema: { $ref: "#/definitions/BookDTO" } },
        ],
        responses: { 200: { description: "Book created" }, 400: { description: "Bad Request" } },
      },
      get: {
        tags: ["Books"],
        summary: "Get all books",
        responses: { 200: { description: "List of books" } },
      },
    },
    "/books/search": {
      get: {
        tags: ["Books"],
        summary: "Search books by title, author, or ISBN",
        parameters: [{ name: "q", in: "query", type: "string", required: true }],
        responses: { 200: { description: "Search results" } },
      },
    },
    "/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Get book by ID",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Book found" }, 404: { description: "Not found" } },
      },
      put: {
        tags: ["Books"],
        summary: "Update a book",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { in: "body", name: "body", required: true, schema: { $ref: "#/definitions/BookDTO" } },
        ],
        responses: { 200: { description: "Book updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete a book",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Book deleted" } },
      },
    },

    "/borrowers": {
      post: {
        tags: ["Borrowers"],
        summary: "Create a new borrower",
        parameters: [
          { in: "body", name: "body", required: true, schema: { $ref: "#/definitions/BorrowerDTO" } },
        ],
        responses: { 200: { description: "Borrower created" }, 400: { description: "Bad Request" } },
      },
      get: {
        tags: ["Borrowers"],
        summary: "Get all borrowers",
        responses: { 200: { description: "List of borrowers" } },
      },
    },
    "/borrowers/{id}": {
      get: {
        tags: ["Borrowers"],
        summary: "Get borrower by ID",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Borrower found" }, 404: { description: "Not found" } },
      },
      put: {
        tags: ["Borrowers"],
        summary: "Update borrower",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { in: "body", name: "body", required: true, schema: { $ref: "#/definitions/BorrowerDTO" } },
        ],
        responses: { 200: { description: "Borrower updated" } },
      },
      delete: {
        tags: ["Borrowers"],
        summary: "Delete borrower",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Borrower deleted" } },
      },
    },

    "/borrowings/borrow": {
      post: {
        tags: ["Borrowings"],
        summary: "Borrow a book",
        parameters: [
          { in: "body", name: "body", required: true, schema: { $ref: "#/definitions/BorrowRecordDTO" } },
        ],
        responses: { 200: { description: "Book borrowed" }, 400: { description: "Bad Request" } },
      },
    },
    "/borrowings/return/{id}": {
      post: {
        tags: ["Borrowings"],
        summary: "Return a borrowed book",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Book returned" } },
      },
    },
    "/borrowings/borrower/{id}": {
      get: {
        tags: ["Borrowings"],
        summary: "Get books borrowed by a borrower",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: { 200: { description: "Borrower’s borrowed books" } },
      },
    },
    "/borrowings/overdue": {
      get: {
        tags: ["Borrowings"],
        summary: "Get overdue books",
        responses: { 200: { description: "List of overdue books" } },
      },
    },

    "/reports/period": {
      get: {
        tags: ["Reports"],
        summary: "Get borrows in a specific period",
        parameters: [
          { name: "start", in: "query", required: true, type: "string", format: "date-time" },
          { name: "end", in: "query", required: true, type: "string", format: "date-time" },
        ],
        responses: { 200: { description: "Borrows in the period" } },
      },
    },
    "/reports/period/csv": {
      get: {
        tags: ["Reports"],
        summary: "Export borrows in period (CSV)",
        produces: ["text/csv"],
        responses: { 200: { description: "CSV file" } },
      },
    },
    "/reports/period/xlsx": {
      get: {
        tags: ["Reports"],
        summary: "Export borrows in period (XLSX)",
        produces: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        responses: { 200: { description: "XLSX file" } },
      },
    },
    "/reports/all/last-month/csv": {
      get: {
        tags: ["Reports"],
        summary: "Export all borrows of last month (CSV)",
        produces: ["text/csv"],
        responses: { 200: { description: "CSV file" } },
      },
    },
    "/reports/all/last-month/xlsx": {
      get: {
        tags: ["Reports"],
        summary: "Export all borrows of last month (XLSX)",
        produces: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        responses: { 200: { description: "XLSX file" } },
      },
    },
  },

  definitions: {
    BookDTO: {
      type: "object",
      required: ["title", "author", "isbn", "availableQuantity", "shelfLocation"],
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        isbn: { type: "string" },
        availableQuantity: { type: "integer" },
        shelfLocation: { type: "string" },
      },
    },
    BorrowerDTO: {
      type: "object",
      required: ["name", "email"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    },
    BorrowRecordDTO: {
      type: "object",
      required: ["bookId", "borrowerId", "dueDate"],
      properties: {
        bookId: { type: "integer" },
        borrowerId: { type: "integer" },
        dueDate: { type: "string", format: "date-time" },
      },
    },
  },
};
