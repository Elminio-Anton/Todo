"use client"

import { signIn } from "next-auth/react"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"



export default function Form() {
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    let [error,setError]:[error:true|false,any] = useState(false)
    const onSubmit:FormEventHandler = async function(event:FormEvent){
        event.preventDefault()
        let user = await signIn("credentials",{
            username:name.current?name.current.value:null,
            password:pwd.current?pwd.current.value:null,
            redirect:true,
        })
        if(!user) setError(true)
        console.log("USER:",user)
        console.log(name.current?name.current.value:null)
        console.log(pwd.current?pwd.current.value:null)
    }
    return (
        <form className={error?"error":""} onSubmit={onSubmit} method="post" action="/api/auth/signin">
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