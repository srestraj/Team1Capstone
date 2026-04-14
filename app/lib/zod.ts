import { z } from "zod";

// Regex Definitions
const nameRegex = /^[a-zA-Z\s'-]+$/; // Letters, spaces, hyphens, and apostrophes only
const addressRegex = /^[a-zA-Z0-9\s,.'-]*$/; // Alphanumeric plus common address punctuation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name should be at least 3 characters")
    .regex(nameRegex, "First name can only contain letters"),
  
  lastName: z
    .string()
    .min(3, "Last name should be at least 3 characters")
    .regex(nameRegex, "Last name can only contain letters"),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    // Additional regex for strict email TLD validation if desired
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email format is invalid"),


  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .regex(addressRegex, "Address contains invalid characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
    role: z.enum(["user", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"), 
});