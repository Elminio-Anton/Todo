"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"



export default function Form() {
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    console.log("!!!!!")
    console.log("searchParams",searchParams)
    console.log("searchParams",searchParams.keys())
    console.log("get error",searchParams.get("error"))
    console.log("get callbackUtl",searchParams.get("callbackUrl"))
    console.log("!!!!!")
    const onSubmit:FormEventHandler = function(event:FormEvent){
        event.preventDefault()
        let user = signIn("credentials",{
            username:name.current?name.current.value:null,
            password:pwd.current?pwd.current.value:null,
            redirect:true,
            callbackUrl:searchParams.get("callbackUrl") || undefined,
        })
/*         .then((user)=>{
            console.log("USER:",user)
            console.log(name.current?name.current.value:null)
            console.log(pwd.current?pwd.current.value:null)
        }) */
    }
    console.log("State error:",error)
    return (
        <form className={error?"error":""} onSubmit={onSubmit} method="post" action="/api/auth/signin">
            {error?<span>Wrong name or pass</span>:""}
            <input name="" type="hidden"/>
            <label>
                Login name:
                <input required ref={name} type="text" id="name" name="name" />
            </label>
            <label>
                Password:
                <input required ref={pwd} type="password" id="pwd" name="pwd" />
            </label>
            <button type="submit">Sign in with name</button>
        </form>
    )
}

/* 
http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin%3FcallbackUrl%3Dhttp%253A%252F%252Flocalhost%253A3000%252F&error=CredentialsSignin
http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
*/