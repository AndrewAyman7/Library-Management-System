import rateLimit from "express-rate-limit";

export const borrowLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Too many borrow attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const reportLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10,
  message: { error: "Too many report requests, slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const bookRetrievalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Too many report requests, slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});