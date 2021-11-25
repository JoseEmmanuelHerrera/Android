const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listProduct = await pool.query('SELECT * FROM product');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listProduct: listProduct
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let product = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el producto",
        product: product
    });
});

router.post('/create', async (req, res)=> {
    const { name, description, category, code } = req.body;
    var created = new Date().toISOString();
    
    const product ={
        name, description, category, code, dateCreated: created
    };

    await pool.query('INSERT INTO product set ?', [product]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        product: product
    });
});
router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    var updated = new Date().toISOString();
    const { name, description, category, code } = req.body;

    const product = { 
        name, description, category, code, dateUpdated: updated  
     };

     await pool.query('UPDATE product SET ? WHERE id = ?', [product, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            product: product
        });
});

router.post('/delete/:id', async(req, res) =>{
    const { id } = req.params;

   await pool.query('DELETE FROM product WHEREh product.id = ?', [id]);
   res.json({
       status: 200,
       message: "Se ha eliminado corectamente"
   });
});

module.exports = router;