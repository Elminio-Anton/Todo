import SignInLink from "./components/login-link"
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import {headers} from "next/headers"
import Link from "next/link";

export default async function Home() {
    let session:any = await fetch(`http://localhost:3000/api/session`,{
        method:"GET",
        headers:headers(),
        mode: 'no-cors',
        cache: 'default'})
        .then(response=>{
            console.log("Response.status:",response.status)
            if(response.status===200){
                //console.log(response.json())
                return response.json()
            }else
                return null
        })// satisfies Session
        console.log("button session",session)
    return (
        <>
            <p>
                Hi, it's a TODO application with time management authentication and database.
                Vercel storage is not limited, so this application is also limited by 10 accounts 3 groups of 10 taasks for each.
            </p>
            <SignInLink sessionInfo={session}/>
            <Link href="/signup">Sign up</Link>
            {/* todo sign up button */}
        </>
    )
}
