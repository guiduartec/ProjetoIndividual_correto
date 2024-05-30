var usuarioModel = require("../models/usuarioModel");
//var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        if (resultadoAutenticar.length > 0) {
                            res.json({
                                idUsuario: resultadoAutenticar[0].idUsuario,
                                email: resultadoAutenticar[0].email,
                                nome: resultadoAutenticar[0].nome,
                                // cpf: resultadoAutenticar[0].cpf,
                                senha: resultadoAutenticar[0].senha,
                            });
                        }
                        else {
                            res.status(204).json({ aquarios: [] });
                        }

                    }
                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                    else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Variável que recupera os valores do cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmacaoSenha = req.body.confirmacaoServer;
    // var cpf = req.body.cpfServer;
    // var empresaId = req.body.empresaServer;
    var nomecaractere = nome.length;
    //var numerocpf = cpf.length;
    var arroba = req.body.emailServer.indexOf('@');
    var ponto = req.body.emailServer.indexOf('.');

    console.log("VALORES RECEBIDOS: ")
    console.log(nome)
    console.log(email)
    console.log(senha)
    console.log(confirmacaoSenha)



    // Validações
    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    }
    // else if (cpf == undefined) {
    //     res.status(400).send("Seu cpf está undefined!");
    // }
    else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }
    // else if (empresaId == undefined) {
    //     res.status(400).send("Sua empresa está undefined!");
    // } 
    else if (nomecaractere <= 1) {
        res.status(400).send("Falta um caracter no seu nome!");
    } else if (confirmacaoSenha != senha) {
        res.status(400).send("Senha inválida");
    }
    //  else if (numerocpf != 11) {
    //     res.status(400).send("Cpf inválido");
    // }
    else if (arroba < 0) {
        res.status(400).send("Falta um caracter no email");
    } else if (ponto < 0) {
        res.status(400).send("Falta um caracter no email");
    } else if (senha <= 6) {
        res.status(400).send("Senha incompleta");
    }


    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function jogar_banco(req, res) {
    // Variável que recupera os valores do cadastro.html
    var respostasCorretas = req.body.respostasCorretasServer;
    var respostasIncorretas = req.body.respostasIncorretasServer;
    var idUsuario = req.body.idUsuarioServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.jogar_banco(respostasCorretas, respostasIncorretas, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}


module.exports = {
    autenticar,
    cadastrar,
    jogar_banco
}