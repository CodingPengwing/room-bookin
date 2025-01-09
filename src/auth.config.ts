import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
// import bcrypt from "bcryptjs";
import { getUserByEmail } from "./db/users";
import { Prisma, User } from "@prisma/client";

export const authConfig: NextAuthOptions = {
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url);
      console.log(baseUrl);
      // If the URL is relative, resolve it relative to the base URL
      if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      // If the URL starts with the base URL, allow it
      if (url.startsWith(baseUrl)) {
        // Parse the URL and extract the query parameters
        const params = new URLSearchParams(new URL(url).search);

        // Get the `callbackUrl` value and decode it
        const callbackUrl = decodeURIComponent(params.get("callbackUrl") || "");
        if (callbackUrl) {
          return new URL(callbackUrl, baseUrl).toString();
        }
        return url;
      }
      // Fallback to the base URL
      return baseUrl;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = password === user.password;

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
};
