const express = require('express');
const router = express.Router();
const {newContact,showContacts,editContact,deleteContact} = require('../../model/serviceContact');

//Enviando una nueva nota
router.post('/newcontact', async(req, res)=>{
    const {name,lastname,phone,secondPhone,imageUrl,address} = req.body;
    await newContact(name,lastname,phone,secondPhone,imageUrl,address)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
    
})

//Trayendo todas las notas
router.post('/showcontacts', async (req,res)=>{
    await showContacts()
    .then(result=>[
        res.json(result.res.rows)
    ]).catch(err=>{
        res.json(err)
    })
})

//Modificando una nota
router.put('/editcontact', async(req,res)=>{
    const {id,name,lastname,phone,secondPhone,imageUrl,address} = req.body;
    const columns = ["name","lastname","phone","secondphone","imageurl","address"];
    const values = [name,lastname,phone,secondPhone,imageUrl,address];

    await editContact(id,columns,values)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
})

//Eliminando una nota
router.delete('/deletecontact', async(req, res)=>{
    const {id} = req.body;
    await deleteContact(id)
    .then(result=>[
        res.json(result)
    ]).catch(err=>{
        res.json(err)
    })
})



module.exports = router;