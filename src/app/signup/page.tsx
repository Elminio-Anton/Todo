"use client"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"

export default function Form() {
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    let [error, setError]: [error: true | false, any] = useState(false)
    const username:String | null = name.current?name.current.value:null
    const password = pwd.current?pwd.current.value:null;
    const onSubmit: FormEventHandler = async function (event: FormEvent) {
        event.preventDefault()
        console.log("before fetch:",pwd?.current?.value,name?.current?.value)
        fetch("../api/addCollection", { method: "POST", body: JSON.stringify({username,password}) })
        .then(resp=>console.log("response",resp))
        .catch(err=>{
            console.log(JSON.stringify(err))
            console.log(err)
        })
    }
    return (
        <form className={error ? "error" : ""} onSubmit={onSubmit} method="post" action="/api/auth/signin">
            <input name="" type="hidden" />
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