import {ObjectId} from "mongodb";
import client from "../common/db.js";
import {Pelicula} from "./pelicula.js";

const db = client.db("cine-db");
const peliculaCollection = db.collection("peliculas");

// Insertar una nueva película
async function handleInsertPeliculaRequest(req, res){
    let data = req.body;
    let pelicula = {...Pelicula};

    delete pelicula._id;
    pelicula.nombre = data.nombre;
    pelicula.generos = data.generos;
    pelicula.anioEstreno = data.anioEstreno;

    await peliculaCollection.insertOne(pelicula)
        .then((data) =>{
            if(data === null) return res.status(400).send("No se pudo insertar la película");
            return res.status(201).send(data);
        })
        .catch((err) =>{
            return res.status(500).send(`Error al insertar la película: ${err}`);
        })
}

// Obtener todas las películas
async function handleGetPeliculasRequest(req, res){
    await peliculaCollection.find({}).toArray()
        .then((data) =>{
            return res.status(200).send(data);
        })
        .catch((err) =>{
            return res.status(500).send(`Error al obtener las películas: ${err}`);
        })
}

// Obtener una película por su ID
async function handleGetPeliculaByIdRequest(req, res){
    let id = req.params.id;

    try{
        let oid = ObjectId.createFromHexString(id);
        await peliculaCollection.findOne({_id: oid})
            .then((data) =>{
                if(data === null) return res.status(404).send("No se encontró la película");
                return res.status(200).send(data);
            })
            .catch((err) =>{
                return res.status(500).send({code: err.code, message: err.message});
            })
    }catch(err){
        return res.status(400).send("Error Id mal formado");
    }
}

// Actualizar una película por su ID
async function handleUpdatePeliculaByIdRequest(req, res){
    let id = req.params.id;
    let pelicula = req.body;

    try{
        let oid = ObjectId.createFromHexString(id);
        let query = {$set: pelicula};

        await peliculaCollection.updateOne({_id: oid}, query)
            .then((data) =>{
                if(data.matchedCount === 0) return res.status(404).send("No se encontró la película");
                return res.status(200).send(data);
            })
            .catch((err) =>{
                return res.status(500).send({code: err.code, message: err.message});
            })
    }catch(err){
        return res.status(400).send("Error Id mal formado");
    }
}

// Eliminar una película por su ID
async function handleDeletePeliculaByIdRequest(req, res){
    let id = req.params.id;

    try{
        let oid = ObjectId.createFromHexString(id);
        await peliculaCollection.deleteOne({_id: oid})
            .then((data) =>{
                if(data.deletedCount === 0) return res.status(404).send("No se encontró la película");
                return res.status(200).send(data);
            })
            .catch((err) =>{
                return res.status(500).send({code: err.code, message: err.message});
            })
    }catch(err){
        return res.status(400).send("Error Id mal formado");
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};