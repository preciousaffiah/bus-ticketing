import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, //Limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.", //send when request exceeds max
});

export default rateLimiter;