"use client"
import { signOut } from "next-auth/react";
//import { RedirectType, redirect } from "next/navigation";
import { useRouter } from "next/navigation";
/* import {useDeferredValue} from "react" */
export function SignOutLink({userName}:{userName:string}){
    const router = useRouter()
/*     let sessionInfo = useDeferredValue(fetch(`http://localhost:3000/api/session`,{
        method:"GET"})
        .then(response=>{
            console.log("/user/sessionResponse.status:",response.status)
            if(response.status===200){
                console.log(response)
                return response.json()
            }else
                return null
        })) */
    return <span onClick={() => {
        console.log("signout")
        signOut({redirect:true});
        console.log("aftersignout")
        //router.push("http://localhost:3000")
        router.push("/")
        //redirect("http://localhost:3000",RedirectType.replace);
        console.log("after redirect")}}
    >
        You ar Signed as {userName}<br /> Sign out
    </span>
}