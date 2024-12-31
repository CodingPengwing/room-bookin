import { date, z } from "zod";

export type ActionState = {
  errorMessage: string;
};

const pick = <T extends {}, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  ) as Pick<T, K>;

const UserRoleEnum = z.enum(["USER", "ADMIN"]);

const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

const UserChecks = {
  id: z.string().min(3, "ID must be at least 3 characters long"), // Example: enforce minimum length for id
  role: UserRoleEnum,
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .refine((username) => /^[a-zA-Z0-9 ]+$/.test(username), {
      message: "Name must only contain alphanumeric characters and spaces.",
    }),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "Email is not in a valid format.",
    }),
  password: z
    .string()
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        ),
      {
        message:
          "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
  createdAt: z.date(),
  status: UserStatusEnum,
};

// The User schema with custom validation logic
export const UserSchema = z.object(UserChecks);

export const CreateUserSchema = z.object(
  pick(UserChecks, "name", "email", "password", "role")
);

const RoomChecks = {
  id: z.string().min(3, "ID must be at least 3 characters long"), // Example: enforce minimum length for id
  name: z.string().min(3, "Name must be at least 3 characters long"), // Enforce name length >= 3
  createdAt: z.date(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"), // Enforce description length >= 10
};

// The Room schema with custom validation logic
export const RoomSchema = z.object(RoomChecks);

export const CreateRoomSchema = z.object({
  name: RoomChecks.name,
  description: RoomChecks.description,
});

const BookingChecks = {
  id: z.string(),
  createdAt: z.date(),
  date: z.date(),
  roomId: z.string(),
  userId: z.string(),
};

// Booking Schema
export const BookingSchema = z.object(BookingChecks);

export const CreateBookingSchema = z.object(
  pick(BookingChecks, "date", "userId", "roomId")
);
