import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb://admin:logHY67@127.0.0.1:27017?authSource=users";
//mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000

//export db
let client = null;
let db = null;


export async function connectToMongo() {
    if (db) return db
    try {
        client = new MongoClient(URI)
        await client.connect();
        db = client.db("users")
        //console.log(db)
        //let dbs = await client.listDatabases()//listDatabases(client);
        let databasesList = await client.db().admin().listDatabases();
        let anton = await db.collection("anton").find({}).toArray()
        //console.log(anton)
        //console.log("!!!!!!!!!!!!!!!!!", databasesList)
    } catch (e) {
        console.log("__Error__", e)
    }
    return db
}
/* db.createUser( { user: "admin",
                 pwd: "logHY67",
                 roles: [ { role: "dbOwner", db: "users" }]}) */