const express = require('express');

const {conectar} = require('./basededatos/basededatos.js')

const {error} = require('console');

const port = 3000;

const app = new express();

const datab = conectar();

app.use(express.json());

app.get('/tareas',(req,res)=>{
    datab.query('SELECT * FROM todo', (error, resultado)=>{
        if(error){ //manejador de errores
            console.log('Ocurrio un error.', error);
            return res.status(500).send('Ocurrio un error.')} 
            res.json(resultado);
  })

})

//get especifico
app.get('/tareas/:index',(req,res)=>{
    datab.query('SELECT * FROM todo WHERE id='+ req.params.index, (error, resultado)=>{
        if(error){ //manejador de errores
            console.log('Ocurrio un error.', error);
            return res.status(500).send('Ocurrio un error.')} 
            res.json(resultado);
  })

})

//post para agregar una tarea
app.post('/tareas',(req,res)=>{
    datab.query('INSERT INTO todo (name, description, created_at ,updated_at , status) values ("'+req.body.name+'", "'+req.body.description+'", "'+req.body.created_at+'", "'+req.body.updated_at+'", "'+req.body.status+'")', (error, resultado)=>{
        if(error){ //manejador de errores
            console.log('Ocurrio un error.', error);
            return res.status(500).send('Ocurrio un error.')} 
            res.json(resultado);
  }) 
}

)

// PUT para actualizar una tarea
app.put('/tareas/:index',(req,res)=> {
    datab.query('UPDATE todo SET name = "'+req.body.name+'", description = "'+req.body.description+'", created_at = "'+req.body.created_at+'", updated_at = "'+req.body.updated_at+'", status = "'+req.body.status+'" WHERE id='+req.params.index, (error, resultado)=> {
        if(error){ //manejador de errores
            console.log('Ocurrio un error.', error);
            return res.status(500).send('Ocurrio un error.')} 
            res.json(resultado);
    })
})

// DELETE para eliminar una tarea especifica
app.delete('/tareas/:index',(req,res)=> {
    datab.query('DELETE FROM todo WHERE id='+req.params.index, (error, resultado)=> {
        if(error){ //manejador de errores
            console.log('Ocurrio un error.', error);
            return res.status(500).send('Ocurrio un error.')} 
            res.json(resultado);
    })
})

//metodo listen abre el servidor
app.listen(port, () => {
    console.log(`El servidor se esta iniciando en http://localhost:${port}`)
})

