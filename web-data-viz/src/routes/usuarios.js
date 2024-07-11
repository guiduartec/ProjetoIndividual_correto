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


// router.post("/play_banco", function (req, res) {
//     usuarioController.play_banco(req, res);
// });

// router.post("/SelectFiveQuiz", function (req, res) {
//     usuarioController.SelectFiveQuiz(req, res);
// });


//Aqui eu faço a criação da rota para puxar os dados do banco e permitir a plotagem
router.get("/buscar5Quiz/:idUsuarioServer", function (req, res) {
    usuarioController.buscar5Quiz(req, res);
});

//Aqui eu faço a atualização da busca anterior e pego sempre o último quiz atualizado 
router.get("/buscarUltimos5Quiz", function (req, res) {
    usuarioController.buscarUltimos5Quiz(req, res);
});

//Aqui eu faço a rota do Ranking 10/07/2024
router.get("/ranking", function(req, res){
    usuarioController.ranking(req, res);
})

module.exports = router;