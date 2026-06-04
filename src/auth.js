import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
  async signIn({ profile }) {
    const allowedEmails = [
      "sarthakmishra.2431078@gmail.com",
    ];

    return allowedEmails.includes(profile.email);
  },

  async session({ session }) {
    return session;
  },
},
};