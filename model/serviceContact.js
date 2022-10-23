const {insertDb, selectAllDb, editDb, deleteDb} = require('../controller/conectionDB');

//Funcion para crear una nueva nota
const newContact = async (name, lastname, phone, secondPhone, imageUrl, address) =>{
    return new Promise((resolve,rejects)=>{
       insertDb("contacts", ["name", "lastname", "phone", "secondphone", "imageurl", "address"], [name, lastname, phone, secondPhone, imageUrl, address])
       .then(res=>{
            resolve({msg:"Se agrego el contacto correctamente"})
       }).catch(err =>[
        rejects({error:"Ocurrio un error al agregar el contacto nota " + err})
       ]);
    })
}

//Funcion para ver todas las notas
const showContacts = ()=>{
    return new Promise((resolve,rejects)=>{
        selectAllDb("contacts")
        .then(res=>{
            resolve({msg:"Se trajeron l0s contactos correctamente", res})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al traer los contactos " + err})
        ]);
     })
}

//Funcion para modificar una nota
const editContact = (id, columns, values)=>{
    return new Promise((resolve,rejects)=>{
        editDb("contacts",id,columns,values)
        .then(res=>{
            resolve({msg:"Se modifico el contacto correctamente"})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al modificar el contacto " + err})
        ]);
     })
}

//Funcion para eliminar una nota
const deleteContact = (id) =>{
    return new Promise((resolve,rejects)=>{
        deleteDb("contacts",id)
        .then(res=>{
            resolve({msg:"Se elimino el contacto correctamente"})
        }).catch(err =>[
         rejects({error:"Ocurrio un error al eliminar el contacto " + err})
        ]);
     })
}

module.exports = {newContact, showContacts, editContact, deleteContact};