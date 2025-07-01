import { z } from "zod";

const jobCategories = [
  "Software Engineering",
  "UI/UX Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "Product Management",
  "Data Science",
  "DevOps",
] as const;
export const jobFormSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters long")
    .max(100, "Job title must not exceed 100 characters")
    .nonempty("Job title is required"),
  category: z.enum(jobCategories, {
    errorMap: () => ({ message: "Please select a valid job category" }),
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(2000, "Description must not exceed 2000 characters")
    .nonempty("Description is required"),
  status: z.enum(["open", "closed"], {
    errorMap: () => ({ message: "Status must be either 'open' or 'closed'" }),
  }),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"], {
    errorMap: () => ({
      message:
        "Job type must be one of: full-time, part-time, contract, internship",
    }),
  }),
  workMode: z.enum(["remote", "in-office", "hybrid"], {
    errorMap: () => ({
      message: "Work mode must be one of: remote, in-office, hybrid",
    }),
  }),
  salary: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^\$?\d{1,12}(,\d{3})*(\.\d{2})?(\/year|\/month|\/hour)?$/.test(
          val.trim()
        ),
      {
        message:
          "Salary must be a valid format (e.g., Rs. 60,000/year or 60000)",
      }
    ),
  timing: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^\d{1,2}(:\d{2})?\s*(AM|PM)\s*-\s*\d{1,2}(:\d{2})?\s*(AM|PM)$/i.test(
          val.trim()
        ),
      {
        message: "Timing must be a valid time range (e.g., 9 AM - 5 PM)",
      }
    ),
});

export type JobFormData = z.infer<typeof jobFormSchema>;
