const express = require('express');
const router = express.Router();
const {newNote, showNotes, editNote, deleteNote} = require('../../model/serviceNote');

//Enviando una nueva nota
router.post('/newnote', async(req, res)=>{
    const {title, note} = req.body;
    await newNote(title,note)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
    
})

//Trayendo todas las notas
router.post('/shownotes', async (req,res)=>{
    await showNotes()
    .then(result=>[
        res.json(result.res.rows)
    ]).catch(err=>{
        res.json(err)
    })
})

//Modificando una nota
router.put('/editnote', async(req,res)=>{
    const {id, title, note} = req.body;
    const columns = ["title", "note"];
    const values = [title, note];

    await editNote(id, columns, values)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
})

//Eliminando una nota
router.delete('/deletenote', async(req, res)=>{
    const {id} = req.body;
    await deleteNote(id)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
})



module.exports = router;