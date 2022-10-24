
const {Pool} = require('pg');
const pool = new Pool({
    // user:process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

//Funcoin general para insertar registros
const insertDb = (table = "", columns = [], values=[])=>{
    return new Promise((resolve,rejects)=>{
        //Se prepara una sentencia sql automatica, coloca las columnas y valores que se le indiquen por parametros sin especificar la cantidad
        const query = `INSERT INTO ${table} (${columns.map(x=> x).toString()}) VALUES (${values.map((x,i)=> `$${i+1}`).toString()})`;
        pool.connect()
        .then(async client => {
            await client.query(query, values, (err,res)=>{
                if(err) rejects("Ocurrio un error" + err);
                resolve(res);
            })
        })
    })
}

//Funcion general para seleccionar todos los registros
const selectAllDb = (table = "") =>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT * FROM ${table}`;
        pool.connect()
        .then(async client => {
            await client.query(query,(err,res)=>{
                if(err) reject("Ocurrio un error" + err);
                resolve(res);
            })
        })
    })
}

//Funcion general para editar un registro
const editDb = (table = "", id, columns = [], values = [])=>{
    return new Promise((resolve, reject)=>{
        //Crea la setencia sql dependiendo del numero de columnas y valores se quiera modificar, de un id dado
        const query = `UPDATE ${table} SET ${columns.map((col,i) => `${col}=$${i+2}`).toLocaleString()} WHERE id=$1`;
        //indexando el id al inicio
        values.unshift(id)
        pool.connect()
        .then(async client => {
            await client.query(query,values,(err,res)=>{
                if(err) reject("Ocurrio un error" + err);
                resolve(res);
            })
        })
    })
}

//Funcion general para borrar un registro
const deleteDb = (table = "", id) =>{
    return new Promise((resolve,reject)=>{
        const query = `DELETE FROM ${table} WHERE id=$1`;
        const values = [id];

        pool.connect()
        .then(async client => {
            await client.query(query,values,(err,res)=>{
                if(err) reject("Ocurrio un error" + err);
                resolve(res);
            })
        })
    })
}

module.exports = {insertDb, selectAllDb, editDb, deleteDb};