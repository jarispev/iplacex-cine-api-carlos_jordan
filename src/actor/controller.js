
import {ObjectId} from "mongodb";
import client from "../common/db.js";
import {Actor} from "./actor.js";

const db = client.db("cine-db");
const actorCollection = db.collection("actores");
const peliculaCollection = db.collection("peliculas");

// Insertar un nuevo actor
async function handleInsertActorRequest(req, res){
    let data = req.body;
    let actor = {...Actor};

    delete actor._id;

    // Validar que la película exista
    let pelicula = await peliculaCollection.findOne({nombre: data.idPelicula})
        .catch((err) => {
            return res.status(500).send(`Error al buscar la película: ${err}`);
        });

    if(res.headersSent) return;

    if(pelicula === null){
        return res.status(404).send("No se encontró la película");
    }

    actor.idPelicula = pelicula._id.toString();
    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;

    await actorCollection.insertOne(actor)
        .then((data) => {
            if(data === null) return res.status(400).send("No se pudo insertar el actor");
            return res.status(201).send(data);
        })
        .catch((err) => {
            return res.status(500).send(`Error al insertar el actor: ${err}`);
        });
}

// Obtener todos los actores
async function handleGetActoresRequest(req, res){
    await actorCollection.find({}).toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send(`Error al obtener los actores: ${err}`);
        });
}

// Obtener un actor por su ID
async function handleGetActorByIdRequest(req, res){
    let id = req.params.id;

    try{
        let oid = ObjectId.createFromHexString(id);

        await actorCollection.findOne({_id: oid})
            .then((data) => {
                if(data === null) return res.status(404).send("No se encontró el actor");
                return res.status(200).send(data);
            })
            .catch((err) => {
                return res.status(500).send({code: err.code, message: err.message});
            });
    }catch(err){
        return res.status(400).send("Error Id mal formado");
    }
}

// Obtener actores asociados a una película
async function handleGetActoresByPeliculaIdRequest(req, res){
    let id = req.params.pelicula;

    try{
        let oid = ObjectId.createFromHexString(id);

        await actorCollection.find({idPelicula: oid.toString()}).toArray()
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((err) => {
                return res.status(500).send({code: err.code, message: err.message});
            });
    }catch(err){
        return res.status(400).send("Error Id mal formado");
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
