const db = require("mongoose")
const {POOL_DATA, MONGO_URI} = require("../utilities/config")

const conectarDB = async () => {
    try {
            await db.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology:true
            })
        } catch (error) {
            console.log(error)
            process.exit(1) //detener app
        }
}
console.log("Conectado a la base de datos")

module.exports = {conectarDB}
