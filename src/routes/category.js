const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{

    let listCategory = await pool.query('SELECT * FROM category');

    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCategory: listCategory
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let category = await pool.query('SELECT * FROM category WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la category",
        category: category
    });
});

router.post('/create', async (req, res)=> {

    const { nombre } = req.body;

    const category = {
        nombre  
    };

    await pool.query('INSERT INTO category set ?', [category]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        category: category
    });
});

router.post('/update/:id', async (req, res)=>{

    const { id } = req.params;
    
    const { nombre } = req.body;

    const category = { nombre };

     await pool.query('UPDATE category SET ? WHERE id = ?', [category, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            category: category
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('DELETE FROM category WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;
