const updateBtn = document.getElementById("updateBtn"),
    noteCtn = document.getElementById('noteCtn'),
    contactCtn = document.getElementById('contactCtn'),
    noteTitle = document.getElementById('noteTitle'),
    noteText = document.getElementById('noteText'),
    addNoteBtn = document.getElementById('addNote'),
    contactName = document.getElementById('contactName'),
    contactLastname = document.getElementById('contactLastname'),
    contactPhone = document.getElementById('contactPhone'),
    contactSecondphone = document.getElementById('contactSecondphone'),
    contactAddress = document.getElementById('contactAddress'),
    addContactBtn = document.getElementById('addContact'),
    trashNotesBtns = document.getElementsByClassName('trashBtn'),
    trashContactBtns = document.getElementsByClassName('trashContact'),
    editNoteBtns = document.getElementsByClassName('editNoteBtns'),
    editContactsBtns = document.getElementsByClassName('editContactsBtns'),
    notaOpen = document.getElementById('NotaOpen'),
    contactOpen = document.getElementById('ContactOpen'),
    addBtn = document.getElementById('addBtn'),
    darkNoteCtn = document.getElementsByClassName('darkNote'),
    darkContact = document.getElementsByClassName('darkContact'),
    editNoteBtn = document.getElementById('editNote'),
    editContactBtn = document.getElementById('editContact'),
    selectOpBtn = document.getElementById('selectOpBtn'),
    selectOp = document.getElementById('selectOp'),
    plusBtn = document.getElementById('plusBtn')


const toastDanger = new bootstrap.Toast(liveToast);
const toastSuccess = new bootstrap.Toast(liveToastSuccess);

//Actualizando informacion por primera vez
window.addEventListener('load',()=>{
    showUpdate();
    if(window.outerWidth > 650){
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>Contactos': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Notas';
        updateBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>Actualizar';
        plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Agregar';
    }else{
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        updateBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    }
})

//Boton de actualizar
updateBtn.addEventListener('click', async () => {
    await showUpdate();
})

//Codigo para enviar nota
//Funcion para manejar el evento del boton enviar nota
noteTitle.addEventListener('change', () => {
    if (noteTitle.value != "") addNoteBtn.disabled = true;
    addNoteBtn.disabled = false;
})
addNoteBtn.addEventListener('click', async ()=>{
    const data = newNote(noteTitle.value, noteText.value);
    if (data) {
        //Insertar nueva
        await reqFunc('POST', '/notes/newnote', data)
        .then(async res => {
            toastShow('Hecho', 'Se agrego la nota correctamente', "Success");
            formClear();
            await showUpdate();
        })
        .catch(err => {
            toastShow('Error', 'Ocurrio un error al crear la nota, verifica que los campos no esten vacíos', "Danger")
        })
    }else{
        toastShow('Error', 'Ocurrio un error al crear la nota, verifica que los campos no esten vacíos', "Danger")
    }
});


//Codigo para enviar contactos
contactName.addEventListener('change', () => {
    if ((contactName.value != "" && contactLastname.value != "") && contactPhone.value != "") addContactBtn.disabled = true;
    addContactBtn.disabled = false;
})

addContactBtn.addEventListener('click', async () => {
    const data = newContact(
        contactName.value,
        contactLastname.value,
        contactPhone.value,
        contactSecondphone.value,
        contactAddress.value
    );
    if (data) {
        await reqFunc('POST', '/contacts/newcontact', data)
            .then(async res => {
                toastShow('Hecho', 'Se agrego el contact correctamente', "Success");
                formClear();
                await showUpdate();
            })
            .catch(err => {
                toastShow('Error', 'Ocurrio un error al crear el contacto, verifica que los no esten vacíos', "Danger")
            })
    } else {
        toastShow('Campos Vacíos', 'El contacto debe poseer un nombre, apellido y un teléfono', "Danger")
    }
})

//Boton de cambio
selectOpBtn.addEventListener('click', ()=>{
    if(window.outerWidth > 650){
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>Contactos': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Notas';
    }else{
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    }
})
window.addEventListener('resize',()=>{
    if(window.outerWidth > 650){
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>Contactos': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Notas';
        updateBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>Actualizar';
        plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Agregar';
    }else{
        (selectOp.checked)? selectOpBtn.innerHTML = '<i class="fa-solid fa-user"></i>': selectOpBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        updateBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    }
})

//Funciones

//Codigo para limpiar formularios
const opBtns = document.querySelectorAll("label");
const formClear = () => {
    noteText.value = "";
    noteTitle.value = "";
    contactName.value = "";
    contactLastname.value = "";
    contactPhone.value = "";
    contactSecondphone.value = "";
    contactAddress.value = "";
    addNoteBtn.disabled = true;
    addContactBtn.disabled = true;
    darkNoteCtn[0].childNodes[1].childNodes[1].childNodes[1].innerHTML = "Nueva Nota";
    darkContact[0].childNodes[1].childNodes[1].childNodes[1].innerHTML = "Nuevo Contacto";
    notaOpen.checked = false;
    contactOpen.checked = false;
    addBtn.checked = false;
    addNoteBtn.style.visibility = '';
    editNoteBtn.style.visibility = '';
    addContactBtn.style.position = '';
    editContactBtn.style.position = '';
    editNoteBtn.disabled = true;
    addNoteBtn.style.position = '';
    editNoteBtn.style.position = '';
    addContactBtn.style.visibility = '';
    editContactBtn.style.visibility = '';
}

opBtns.forEach(x => {
    if(x.htmlFor == "NotaClosed" || x.htmlFor == "ContactClosed" || x.htmlFor == "NotaOpen" || x.htmlFor == "ContactOpen"){
        x.addEventListener('click',formClear);
    }
})

//funcion para crear un nuevo contacto
const newContact = (name, lastname, phone, secondphone, address) => {
    const data = {
        name: name,
        lastname: lastname,
        phone: phone,
        secondPhone: secondphone,
        address: address
    }

    if ((data.name && data.lastname) && data.phone) return data;
    return null;
}

//funcion para editar un nuevo contacto
const editContact = (id,name, lastname, phone, secondphone, address) => {
    const data = {
        id:id,
        name: name,
        lastname: lastname,
        phone: phone,
        secondPhone: secondphone,
        address: address
    }

    if ((data.name && data.lastname) && data.phone) return data;
    return null;
}

//Funcion para crear una nueva nota
const newNote = (title, note) => {
    const data = {
        title: title,
        note: note
    }

    if (data.note && data.title) return data;
    return null;
}

//Funcion para crear una nueva nota
const editNote = (id, title, note) => {
    const data = {
        id: id,
        title: title,
        note: note
    }

    if (data.note && data.title) return data;
    return null;
}

//Funcion para actualizar la informacion
const showUpdate = async () => {
    //Pidiendo notas
    await reqFunc('POST', '/notes/shownotes', {})
        .then(res => {
            let id, title, note;
            //Mostrando notas
            showNotes(res)
            //Configurando la funcion de eliminar contacts
            for (var i = 0; i < trashNotesBtns.length; i++) {
                trashNotesBtns[i].addEventListener('click', async e => {
                    id = e.path[2].childNodes[1].name;
                    if (confirm('La nota se eliminara!')) {
                        if (id != "") {
                            await reqFunc('DELETE', '/notes/deletenote', { id: id })
                                .then(async res => {
                                    toastShow('Hecho', 'Se elimino la nota', 'Success')
                                    await showUpdate()
                                })
                                .catch(e => {
                                    toastShow('Error', 'Ocurrio un error al eliminar la nota', 'Danger')
                                })
                        } else {
                            toastShow('Error', 'Ocurrio un error al eliminar la nota', 'Danger')
                        }
                    }
                })
            }

            //Configurando la opcion de editar las notas
             for (var i = 0; i < editNoteBtns.length; i++) {
                 editNoteBtns[i].addEventListener('click', (e) => {
                     id = e.path[2].childNodes[1].name;
                     title = e.path[2].childNodes[3].innerHTML;
                     note = e.path[2].childNodes[5].innerHTML;
                     //Abriendo menu y cambiando datos
                     notaOpen.checked = true;
                     noteTitle.value = title;
                     noteText.value = note;
                     darkNoteCtn[0].childNodes[1].childNodes[1].childNodes[1].innerHTML = "Editar Nota";
                     //Activando segundo boton
                     addNoteBtn.style.position = 'absolute';
                     editNoteBtn.style.position = 'initial';
                     addNoteBtn.style.visibility = 'hidden';
                     editNoteBtn.style.visibility = 'visible';
                 })
             }
            let elements = [noteTitle, noteText];
            elements.map(e => {
                e.addEventListener('change', () => {
                    if (e.value != "") editNoteBtn.disabled = true;
                    editNoteBtn.disabled = false;
                })
            })
            editNoteBtn.addEventListener('click', async ()=>{
                //Editar  nota
                const data = editNote(id, noteTitle.value, noteText.value);
                if (data) {
                await reqFunc('PUT', '/notes/editnote', data)
                .then(async res => {
                    toastShow('Hecho', 'Se edito la nota correctamente', "Success");
                    formClear();
                    document.location.href = document.location.href;
                })
                .catch(err => {
                    toastShow('Error', 'Ocurrio un error al editar la nota, verifica que los campos no esten vacíos', "Danger")
                })
                } else {
                    toastShow('Campos Vacíos', 'La nota debe poseer un titulo y un texto', "Danger")
                }
            });
        })
        .catch(err => toastShow('Error', 'Ocurrio un error de conexión con el servidor, intenta recargar la página', "Danger"))

    //Pidiendo los contactos
    await reqFunc('POST', '/contacts/showcontacts', {})
        .then(res => {
            let id,name="", lastname="", phone, secondphone,address;
            //Mostrando contactos
            showContacts(res)
            //Configurando la funcion de eliminar contacts
            for (var i = 0; i < trashContactBtns.length; i++) {
                trashContactBtns[i].addEventListener('click', async e => {
                    id = e.path[2].childNodes[1].name;
                    if (confirm('El contacto se eliminara!')) {
                        if (id != "") {
                            await reqFunc('DELETE', '/contacts/deletecontact', { id: id })
                                .then(async res => {
                                    toastShow('Hecho', 'Se elimino el contacto', 'Success')
                                    await showUpdate()
                                })
                                .catch(e => {
                                    toastShow('Error', 'Ocurrio un error al eliminar el contacto', 'Danger')
                                })
                        } else {
                            toastShow('Error', 'Ocurrio un error al eliminar el contacto', 'Danger')
                        }
                    }

                })
            }

            //Configurando la opcion de editar los contactos
            for (var i = 0; i < editContactsBtns.length; i++) {
                editContactsBtns[i].addEventListener('click', (e) => {
                    id = e.path[2].childNodes[1].name;
                    name = e.path[2].childNodes[1].alt;
                    lastname = e.path[2].childNodes[1].value;
                    phone = e.path[2].childNodes[5].innerHTML.replace("<strong>Teléfono:</strong> ", "");
                    secondphone = e.path[2].childNodes[7].innerHTML.replace("<strong>Segundo Teléfono:</strong> ","");
                    address = e.path[2].childNodes[9].innerHTML.replace("<strong>Dirección:</strong> ","");
                    // Abriendo menu y cambiando datos
                    contactOpen.checked = true;
                    contactName.value = name;
                    contactLastname.value = lastname;
                    contactPhone.value = phone;
                    contactSecondphone.value = secondphone;
                    contactAddress.value = address;
                    darkContact[0].childNodes[1].childNodes[1].childNodes[1].innerHTML = "Editar Contacto";
                    //Activando segundo boton
                    addContactBtn.style.position = 'absolute';
                    editContactBtn.style.position = 'initial';
                    addContactBtn.style.visibility = 'hidden';
                    editContactBtn.style.visibility = 'visible';
                })
            }
           let elements = [contactName, contactLastname,contactPhone, contactSecondphone,contactAddress];
           elements.map(e => {
               e.addEventListener('change', () => {
                   if (e.value != "") editContactBtn.disabled = true;
                   editContactBtn.disabled = false;
               })
           })
           editContactBtn.addEventListener('click', async ()=>{
               //Editar  nota
               const data = editContact(
                    id,
                    contactName.value,
                    contactLastname.value,
                    contactPhone.value,
                    contactSecondphone.value,
                    contactAddress.value
                )
               if (data) {
               await reqFunc('PUT', '/contacts/editcontact', data)
               .then(async res => {
                   toastShow('Hecho', 'Se edito el contacto correctamente', "Success");
                   formClear();
                   document.location.href = document.location.href;
               })
               .catch(err => {
                   toastShow('Error', 'Ocurrio un error al editar el contacto, verifica que los campos no esten vacíos', "Danger")
               })
               } else {
                   toastShow('Campos Vacíos', 'El contacto debe poseer un nombre, apellido y un teléfono', "Danger")
               }
           });
        }).catch(err => toastShow('Error', 'Ocurrio un error de conexión con el servidor, intenta recargar la página', "Danger"))
}


//Funcion para mostrar las notas
const showNotes = (notes = []) => {
    let newElements = ``;
    let AscNotes = [];
    //ordenando notas de z-a
    for (var i = 0; i < notes.length; i++) {
        AscNotes[i] = notes[notes.length - 1 - i];
    }
    AscNotes.map(note => {
        newElements += `
        <div class="noteItem rounder animate_animated animate__bounceIn">
            <input type="hidden" name="${note.id}">
            <h4>${note.title}</h4>
            <p>${note.note}</p>
            <div>
                <i class="fa-solid fa-pen-to-square btn btn-info editNoteBtns" style="line-height: inherit;"></i>
                <i class="fa-solid fa-trash trashBtn btn btn-danger" style="line-height: inherit;"></i>
            </div>
        </div>
        `
    })

    noteCtn.innerHTML = newElements;
}

//Funcion para mostrar los contactos
const showContacts = (contacts = []) => {
    let newElements = ``;
    let AscContacts = [];
    //ordenando notas de z-a
    for (var i = 0; i < contacts.length; i++) {
        AscContacts[i] = contacts[contacts.length - 1 - i];
    }
    AscContacts.map(contact => {
        newElements += `
        <div class="noteItem rounder animate_animated animate__bounceIn">
            <input type="hidden" name="${contact.id}" value="${contact.lastname}" alt="${contact.name}">
            <h4>${contact.name} ${contact.lastname}</h4>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
            <p><strong>Segundo Teléfono:</strong> ${(contact.secondphone) ? contact.secondphone : ""}</p>
            <p><strong>Dirección:</strong> ${contact.address}</p>
            <div>
                <i class="fa-solid fa-pen-to-square btn btn-info editContactsBtns" style="line-height: inherit;"></i>
                <i class="fa-solid fa-trash trashContact btn btn-danger" style="line-height: inherit;"></i>
            </div>
        </div>
        `
    })
    contactCtn.innerHTML = newElements;
}

//Funcion para realizar peticiones
const reqFunc = (method, url, data = {}) => {
    return new Promise(async (resolve, reject) => {
        await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => resolve(res.json()))
            .catch(err => reject({ error: "Ocurrio un error con la solicitud" + err }))
    })
}

//Funcion para mostrar un toast
const toastShow = (title, content, type) => {
    if (type == "Success") {
        liveToastSuccess.childNodes[1].childNodes[3].innerHTML = title;
        liveToastSuccess.childNodes[3].innerHTML = content;
        liveToastSuccess.childNodes[3].style.color = 'white';
        toastSuccess.show();
    } else if (type == "Danger") {
        liveToast.childNodes[1].childNodes[3].innerHTML = title;
        liveToast.childNodes[3].innerHTML = content;
        liveToast.childNodes[3].style.color = 'white';
        toastDanger.show();
    }

}