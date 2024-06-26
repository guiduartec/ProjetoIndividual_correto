var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/jogar_banco", function (req, res) {
    usuarioController.jogar_banco(req, res);
});

router.post("/SelectQuiz", function (req, res) {
    usuarioController.SelectQuiz(req, res);
});

router.post("/buscarQuiz", function (req, res) {
    usuarioController.buscarQuiz(req, res);
});

router.post("/buscarUltimoQuiz", function (req, res) {
    usuarioController.buscarUltimoQuiz(req, res);
});

module.exports = router;