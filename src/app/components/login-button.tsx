"use client"
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth";
////////import { authOptions } from "../api/auth/[...nextauth]/route";


export default function Button({ sessionInfo }: { sessionInfo: Session | null }) {

    return sessionInfo
        ? <button onClick={async () => {
            await signOut();
            console.log("signin")
        }}>
            You ar Signed as {sessionInfo.user?.name}<br /> Sign out
        </button>
        : <button onClick={async () => {
            await signIn("credentials");
            console.log("awaited signin")
        }}>
            Sign in
        </button>

}