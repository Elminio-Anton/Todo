"use client"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"
import { useSearchParams } from "next/navigation";
import styles from "../signin/styles.module.scss"

export default function Form() {
    const searchParams = useSearchParams();
    //const error = searchParams.get("error");
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    let [error, setError]: [error: true | false, any] = useState(false)
    let username: String | null = name.current ? name.current.value : null
    let password: String | null = pwd.current ? pwd.current.value : null;
    const onSubmit: FormEventHandler = async function (event: FormEvent) {
        event.preventDefault()
        console.log("before fetch:", pwd?.current?.value, name?.current?.value)
        console.log("before fetch:", password, username)
        fetch("../api/addCollection", {
            method: "POST",
            body: JSON.stringify({ password: pwd?.current?.value, username: name?.current?.value })
        })
            .then(resp => {
                if(resp.status!==200){
                    setError(resp.statusText)
                }
                console.log("response!!", resp)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
                console.log("catched!", err)
                setError(err)
            })
    }
    return (
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={onSubmit} method="post" action="/api/auth/signin">
                {error ? <span className={styles.error_text}>{error}</span> : ""}
                <label className={styles.name_label}>
                    Login name:
                    <input className={styles.name_input} required ref={name} type="text" id="name" name="name" />
                </label>
                <label className={styles.pwd_label}>
                    Password:
                    <input className={styles.pwd_input} required ref={pwd} type="password" id="pwd" name="pwd" />
                </label>
                <button className={styles.button} type="submit">Sign up</button>
            </form>
        </div>
    )
} 