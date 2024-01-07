import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsProviderType } from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

type User = {
    id:string,
    name:string,
    email:string,
    image:null
} | null

/* export default function SignIn({
    csrfToken,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
    )
  } */

const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "nickname" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials,req) {
                if(!credentials?.username || !credentials?.password)
                    return null
                //const user = await "seach in db" login(credentials?.username,credentials?.password)
                console.log("authorize called",credentials)
                let user:User = { id: "1", name: "user1", email: "qwerty",image:null }
                //let user = null
                //console.log("user:",user)
                if (user) {
                    console.log("return user:",user)
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages:{
        signIn:"/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }