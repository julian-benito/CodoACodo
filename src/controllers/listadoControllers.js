const { conn } = require('../db/db.js')
const path = require('path')

module.exports = {

  getListadoTienda: async (req, res) => {
    //res.sendFile(path.resolve(__dirname + './../views/listado.html'));
    try {
      const [ registros ] = await conn.query(`SELECT productos.*, categorias.nombre AS nombre_categoria 
        FROM productos 
        JOIN categorias ON productos.categoria_id = categorias.id`)
      res.json(registros)
    } catch (error) {
      throw error
    } finally{
      conn.releaseConnection()
    }
},

  getListado: async (req, res) => {
      //res.sendFile(path.resolve(__dirname + './../views/listado.html'));
      try {
        const [ registros ] = await conn.query(`SELECT productos.*, categorias.nombre AS nombre_categoria 
        FROM productos 
        JOIN categorias ON productos.categoria_id = categorias.id`)
        res.json(registros)
      } catch (error) {
        throw error
      } finally{
        conn.releaseConnection()
      }
  },

  crearRegistro: async (req, res) => {
    const sql = `INSERT INTO productos (nombre, origen, precio, urlimagen, categoria_id) VALUES (?, ?, ?, ?, ?)`;
    const creado = await conn.query(sql, [req.body.nombre, req.body.origen, parseFloat(req.body.precio), req.body.urlimagen, req.body.categoria_id]);
    console.log("Nuevo producto creado:", creado);
    res.redirect('/listado.html');
  },

  getModificar: async (req, res) => {
    const [modificar] = await conn.query(`SELECT * FROM productos WHERE id=?`, req.params.id)
    res.render('modificar', {
      tituloDePagina: 'Pagina para modificar productos',
      registro: modificar[0]
    })
  },

  actualizar: async (req, res) => {
    const sql = `UPDATE productos SET nombre=?, origen=?, precio=?, urlimagen=?, categoria_id=? WHERE id=?`;
    const { idMod, nombre, origen, precio, urlimagen, categoria_id } = req.body;
    const modificado = await conn.query(sql, [nombre, origen, parseFloat(precio), urlimagen, parseFloat(categoria_id), idMod]);
    console.log("Producto modificado:", modificado);
    res.redirect('/listado.html');
  },

  eliminar: async (req, res) => {
    const idEliminar = req.query.idEliminar; // Se espera que la solicitud sea DELETE /listado?idEliminar=<id>
    try {
      const eliminado = await conn.query(`DELETE FROM productos WHERE id = ?`, [idEliminar]);
      console.log(`Producto con ID ${idEliminar} eliminado correctamente.`);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send('Error al eliminar el producto');
    } finally {
      conn.releaseConnection();
    }
  }
}



