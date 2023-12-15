import {app} from "./app.js";
import {connectDB} from "./data/database.js"

connectDB();

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})