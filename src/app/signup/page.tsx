"use client"
import { FormEvent, FormEventHandler, MouseEventHandler, useRef, useState } from "react"
import { connectToMongo } from "../api/mongodb/mongodb"
//import db

export default function Form() {
    const name = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    let [error,setError]:[error:true|false,any] = useState(false)
    const onSubmit:FormEventHandler = async function(event:FormEvent){
        event.preventDefault()
        const username = name.current?name.current.value:null
        const password = pwd.current?pwd.current.value:null;
        const db = await connectToMongo()
        db.createCollection(username)
        db.collection("username").insertOne({pwd:password})
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