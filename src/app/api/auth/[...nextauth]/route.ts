import NextAuth from "next-auth";
import Reddit from "next-auth/providers/reddit";

export const authOptions = {
	providers: [
		Reddit({
			clientId: process.env.REDDIT_ID,
			clientSecret: process.env.REDDIT_SECRET,
		})
	],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };