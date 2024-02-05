"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"
import styles from "./styles.module.scss"

export default function Form() {
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    /*     console.log("!!!!!")
        console.log("searchParams",searchParams)
        console.log("searchParams",searchParams.keys())
        console.log("get error",searchParams.get("error"))
        console.log("get callbackUtl",searchParams.get("callbackUrl"))
        console.log("!!!!!") */
    const onSubmit: FormEventHandler = function (event: FormEvent) {
        event.preventDefault()
        let user = signIn("credentials", {
            username: name.current ? name.current.value : null,
            password: pwd.current ? pwd.current.value : null,
            redirect: true,
            callbackUrl: searchParams.get("callbackUrl") || undefined,
        })
    }
    //console.log("State error:",error)
    return (
        <div className={styles.form_container}>
            <form className={`${error ? `error ${styles.error_text}` : ""} ${styles.form}`} onSubmit={onSubmit} method="post" action="/api/auth/signin">
                {error ? <span>Wrong name or pass</span> : ""}
                <label className={styles.name_label}>
                    Login name:
                    <input className={styles.name_input} required ref={name} type="text" id="name" name="name" />
                </label>
                <label className={styles.pwd_label}>
                    Password:
                    <input className={styles.pwd_input} required ref={pwd} type="password" id="pwd" name="pwd" />
                </label>
                <button className={styles.button} type="submit">Sign in</button>
            </form>
        </div>
    )
}

/* 
http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin%3FcallbackUrl%3Dhttp%253A%252F%252Flocalhost%253A3000%252F&error=CredentialsSignin
http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
*/