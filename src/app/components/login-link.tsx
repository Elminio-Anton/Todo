"use client"
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
//import { getServerSession } from "next-auth";
////////import { authOptions } from "../api/auth/[...nextauth]/route";


export default function SignInLink({ className="",sessionInfo }: { className?:string,sessionInfo: Session | null }) {

    return sessionInfo
        ? <span className={className} onClick={() => {
            console.log("signin")
            signOut();}}
        >
            You ar Signed as {sessionInfo.user?.name}<br /> Sign out
        </span>
        : <span className={className} onClick={() => {
            console.log("awaited signin")
            signIn();
        }}>
            Sign in
        </span>

}