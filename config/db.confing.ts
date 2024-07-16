import { connect } from "mongoose"
const username = 'valentyn13git'
const password = '9RzSgEmJKeCBMOe9'

const connect_URL = `mongodb+srv://${username}:${password}@chats-cluster.gfmbqvd.mongodb.net/?retryWrites=true&w=majority&appName=chats-cluster`

const connectDb = async () => {
    try {
        await connect(connect_URL)
        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDb;