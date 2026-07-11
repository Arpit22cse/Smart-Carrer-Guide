const { z } = require("zod");

exports.signupSchema = z.object({
  name: z.string().min(3),

  email: z.string().email(),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/),
});

exports.loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});