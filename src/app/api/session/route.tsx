import { getServerSession } from "next-auth";

async function GET() {
    const session = await getServerSession()
    console.log("/api/session/route.js GET session:",session)
    if (session) {
        return new Response(JSON.stringify(session), { status: 200 }) 
    }
    else
        return new Response("Not authorized", { status: 401 })
}

export { GET }