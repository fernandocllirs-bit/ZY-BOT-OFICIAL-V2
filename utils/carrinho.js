const carrinhos = new Map();


function criarCarrinho(userId) {

    carrinhos.set(userId, {

        itens: []

    });

}


function pegarCarrinho(userId) {

    return carrinhos.get(userId);

}


function adicionarItem(userId, item) {

    const carrinho = carrinhos.get(userId);

    if (!carrinho) return;


    const existente = carrinho.itens.find(i => i.nome === item.nome);


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.itens.push({

            nome: item.nome,

            preco: item.preco,

            emoji: item.emoji,

            quantidade: 1

        });

    }

}


function aumentarQuantidade(userId, nome) {

    const carrinho = carrinhos.get(userId);

    if (!carrinho) return;


    const item = carrinho.itens.find(i => i.nome === nome);


    if (item) {

        item.quantidade++;

    }

}



function diminuirQuantidade(userId, nome) {

    const carrinho = carrinhos.get(userId);

    if (!carrinho) return;


    const item = carrinho.itens.find(i => i.nome === nome);


    if (!item) return;


    item.quantidade--;


    if (item.quantidade <= 0) {

        removerItem(userId, nome);

    }

}



function removerItem(userId, nome) {

    const carrinho = carrinhos.get(userId);

    if (!carrinho) return;


    carrinho.itens = carrinho.itens.filter(

        item => item.nome !== nome

    );

}



function calcularTotal(userId) {

    const carrinho = carrinhos.get(userId);

    if (!carrinho) return 0;


    return carrinho.itens.reduce(

        (total, item) =>

        total + (item.preco * item.quantidade),

        0

    );

}



function limparCarrinho(userId) {

    carrinhos.delete(userId);

}



module.exports = {

    criarCarrinho,

    pegarCarrinho,

    adicionarItem,

    aumentarQuantidade,

    diminuirQuantidade,

    removerItem,

    calcularTotal,

    limparCarrinho

};