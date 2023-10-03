import mongoose from "mongoose";

const dbConnection = () => mongoose.connect(process.env.DB_ONLINE)
    .then(() => console.log('DB is connection .......'))
    .catch((err) => console.log({ DbError: err }))

export default dbConnection