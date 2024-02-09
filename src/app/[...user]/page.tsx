import { signOut } from "next-auth/react"
import styles from "./page.module.scss"
import { getServerSession } from "next-auth"
import { redirect,RedirectType } from "next/navigation"
import {SignOutLink} from "./signOutLink"

export default async function Page({params}:{params:{user:string}}){
    const user:string = params.user
    const sessionInfo = await fetch(`http://localhost:3000/api/session`,{
        method:"GET",
        mode: 'no-cors',
        cache: 'default'})
        .then(response=>{
            console.log("/user/sessionResponse.status:",response.status)
            if(response.status===200){
                console.log("/user/page.tsx",response)
                return response.json()
            }else
                return null
        })
    console.log("!!!!!!")
    console.log("!!!!!!")
    console.log(sessionInfo)
    console.log("!!!!!!")
    console.log("!!!!!!")
/*     if(!sessionInfo){
        redirect("/",RedirectType.replace)
    } */
    //todo get groups
    return <>
    <header className={styles.header}>
    <SignOutLink userName={sessionInfo?sessionInfo.user.name:"55"}></SignOutLink>
    </header>
    <nav className={styles.nav}>
    <div className={styles.group}>placeholder</div>
    <div className={styles.group}>placeholder</div>
    <div className={styles.group}>placeholder</div>
    </nav>
    <main className={styles.main}>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    <div className={styles.task}>placeholder</div>
    </main>
    <div className={styles.controls}>
        <button>add task</button>
        <button>start task</button>
        <button>close task</button>
        <button>delete task</button>
    </div>
    </>
}