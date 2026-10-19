import e from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = e();

// Trust proxy (for rate limiting IP behind reverse proxy)
app.set("trust proxy", 1);

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:8080 ws://localhost:5173;"
  );
  next();
});

// Body parser
app.use(e.json({ limit: "10kb" }));

// Cookie parser (required for httpOnly auth cookies)
app.use(cookieParser());

// CORS with credentials for auth cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Morgan logging in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting for auth endpoints (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests per window per IP
  message: { success: false, message: "অতিরিক্ত চেষ্টা। ৫ মিনিট পর আবার চেষ্টা করুন।" },
  standardHeaders: true,
  legacyHeaders: false,
});

export { app, authLimiter };

