import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb://admin:logHY67@127.0.0.1:27017/users?authSource=users";
//mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
const client = new MongoClient(URI);
export async function connectToMongo() {
    try{
    await client.connect();
    let db = client.db("users")
    //console.log(db)
    //let dbs = await client.listDatabases()//listDatabases(client);
    
    //console.log("!!!!!!!!!!!!!!!!!",dbs)
    }catch(e){
        console.log("__Error__",e)
    }
}
/* db.createUser( { user: "admin",
                 pwd: "logHY67",
                 roles: [ { role: "dbOwner", db: "users" }]}) */