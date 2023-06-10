const { Router } = require("express");
const { body, param } = require('express-validator');

const { validarCampos } = require("../middlewares/validar-campos");
const authMiddleware = require("../middlewares/session");

const { obtenerCarrito, agregarAlCarrito, quitarDelCarrito } = require("../controllers/carrito");

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.URL_FRONT); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.get('/' , [
    authMiddleware
], obtenerCarrito );

router.post('/' , [
    authMiddleware,
    body('publicacionId', 'El id de la publicacion no es valido.').isInt({min:1}),
    validarCampos
] , agregarAlCarrito );

router.delete('/' , [
    authMiddleware,
    body('publicacionId', 'El id de la publicacion no es valido.').optional().isInt({min:1}),
    validarCampos
], quitarDelCarrito );

module.exports = router;