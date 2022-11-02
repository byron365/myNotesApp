const {insertDb, selectAllDb, editDb, deleteDb} = require('../controller/conectionDB');

//Funcion para crear una nueva nota
const newNote = async (title, note, date) =>{
    return new Promise((resolve,rejects)=>{
       insertDb("public.notes", ["title","note"], [title,note])
       .then(res=>{
            resolve({msg:"Se agrego la nota correctamente"})
       }).catch(err =>[
        rejects({error:"Ocurrio un error al agregar la nueva nota " + err})
       ]);
    })
}

//Funcion para ver todas las notas
const showNotes = ()=>{
    return new Promise((resolve,rejects)=>{
        selectAllDb("public.notes")
        .then(res=>{
            resolve({msg:"Se trajeron las notas correctamente", res})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al traer las notas " + err})
        ]);
     })
}

//Funcion para modificar una nota
const editNote = (id, columns, values)=>{
    return new Promise((resolve,rejects)=>{
        editDb("public.notes",id,columns,values)
        .then(res=>{
            resolve({msg:"Se modifico la nota correctamente"})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al modificar la nota " + err})
        ]);
     })
}

//Funcion para eliminar una nota
const deleteNote = (id) =>{
    return new Promise((resolve,rejects)=>{
        deleteDb("public.notes",id)
        .then(res=>{
            resolve({msg:"Se elimino la nota correctamente"})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al eliminar la nota " + err})
        ]);
     })
}

module.exports = {newNote, showNotes, editNote, deleteNote};