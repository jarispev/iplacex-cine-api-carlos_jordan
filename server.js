
import "dotenv/config";
import express, {urlencoded} from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const PORTS = 3000||4000;
const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex');
});

// Rutas personalizadas
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Conexión a MongoDB Atlas
await client.connect()
    .then(() => {
        console.log("Conectado al cluster de MongoDB Atlas");
        app.listen(PORTS, () => {
            console.log(`Servidor corriendo en http://localhost:${PORTS}`);
        });
    })
    .catch((err) => {
        console.error(`Ha ocurrido un error: ${err}`);
    });
