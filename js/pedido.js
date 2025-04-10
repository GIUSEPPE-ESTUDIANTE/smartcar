"use strict";

// Selecionando os elementos que serao manipulados.

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status")

// Seleçâo do campo telefone usando JS PURO
const campoTelefone = formulario.querySelector("#telefone");

// Seleçâo do campo telefone usando jQuery
// const campoTelefone = $("telefone");

// Ativando a mascara para o telefone
$(campoTelefone).mask("(00) 00000-0000"); //exemplo: (11) 21354-0300
$(campoCep).mask("00000-000"); //  Exemplo: 03619-000




// detectando o evento de CLICK no botao buscar

botaoBuscar.addEventListener("click", async function (event) {
    event.preventDefault();

    let cep; //undefined


    /* Verificando se cep o tem 8 digitos */
    if (campoCep.value.length !== 9) {
        mensagem.textContent = "Digite um CEP valido";
        mensagem.style.color = "purple";
        mensagem.style.fontSize = "12px";

        //    Pare a execuçâo 
        return;
    } else {
        // caso contrario (ou seja,tem 8 digitos), guarde o valor 
        cep = campoCep.value;
    }



    /* AJAZ -> Tecnica de cominicaçâo assincrona
    para acessar uma API(www. viacep.com.br) */

    // Etapa 1: preparar a URL da API com o CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    //   Etapa 2: a API(com a URL) e aguardar o retorno dela 
    const resposta = await fetch(url);

    // Etapa 3: extrair os dados da respota em formato JSON
    const dados = await resposta.json();

    // Etapa 4: lidar os dados de resposta (en caso de erro ou sucesso)
    if ("erro" in dados) {
        mensagem.textContentn = "CEP inexistente!";
        mensagem.style.color = "red";
    } else {

        mensagem.textContent = "CEP encontrado!";
        mensagem.style.color = "blue";

        const exemplos = document.querySelectorAll("exemplo");
        for (const exemplo of exemplos) {
            exemplo.classList.remove("exemplo")
        }


        campoBairro.value = dados.logradouro;
        campoEndereco.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
    }


});



// Programaçâo do Formspree

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            formulario.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "A casa caiu! vc fez algo suspeito"
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "A casa caiu! vc fez algo suspeito"
    });
}
formulario.addEventListener("submit", handleSubmit)