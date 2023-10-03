import mongoose from "mongoose";

const dbConnection = () => mongoose.connect('')
    .then(() => console.log('DB is connection .......'))
    .catch((err) => console.log({ DbError: err }))

export default dbConnection