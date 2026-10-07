const musicModel = require('../models/music.model');
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")
const jwt = require('jsonwebtoken');

async function createMusic(req, res){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !=="artist"){
            return res.status(403).json({message:"You don't have access to create an music"})
        }


    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await music.Model.create({
        uri: result.uri,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        message: "Music created successfully",
        music:{
            id: music_id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })

     } catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthorized"})
    }
}

async function createAlbum(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorize"})
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role != "artist"){
            return res.status(403).json({message: "You don't have access to create an album"})
        }

        const {title, musics} = req.body;

        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musics,
        })

        res.status(201).json({
            message:"Album created successfully",
            album:{
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,

            }
        })


    }catch(err){
        console.log(err)
        return res.status(401).json({message: "Unauthorize"})
    }
}

module.exports = {createMusic, createAlbum}

//done