import { NextResponse, NextRequest } from "next/server"
import { connectToMongo } from "../mongodb/mongodb"
import { CollectionInfo } from "mongodb"
import "server-only"

async function AddCollection(req: NextRequest) {
    let { username, password } = await req.json()
    const db = await connectToMongo()
    const collections = await await db.listCollections(/* {name:"anton"} */).toArray()
    const collectionAmount = collections.length;
    const collectionExists = collections.find((collection: CollectionInfo) => collection.name === username);

    if (collectionExists) {
        console.log("addCollection:collection exists")
        //throw new Error("User exists")
        return NextResponse.json({ error: "User exists" }, { statusText: "User exists already", status: 507 })
    }
    if (collectionAmount >= 10){
        return NextResponse.json({ error: "Reached collection limit" }, { statusText: "Reached collection limit", status: 507 })
    }
    await db.createCollection(username)
    await db.collection(username).insertOne({ pwd: password })

    return NextResponse.json({ status: 200 })
}

export { AddCollection as GET, AddCollection as POST }