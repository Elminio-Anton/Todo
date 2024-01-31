import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsProviderType } from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectToMongo } from "../../mongodb/mongodb";

type User = {
    id: string,
    name: string,
    email: string,
    image: null
} | null

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "nickname" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const db = await connectToMongo()
                if (!credentials?.username || !credentials?.password)
                    return null
                //const user = await "seach in db" login(credentials?.username,credentials?.password)
                console.log("authorize called", credentials)
                //let user:User = { id: "1", name: "user1", email: "qwerty",image:null }
                let [compare] = await db.collection(credentials?.username)
                .find({ pwd: credentials?.password })
                .toArray()
                console.log("user:", compare)
                if (compare) {
                    console.log("return user:", {user:{id:credentials?.username,name:credentials?.username}})
                    return {id:credentials?.username,name:credentials?.username}
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }