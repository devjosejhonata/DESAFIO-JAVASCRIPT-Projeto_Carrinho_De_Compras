
// Seleção de elementos do DOM //

const produtoSelect = document.getElementById('produto'); 
// Seleciona o dropdown de produtos

const quantidadeInput = document.getElementById('quantidade'); 
// Seleciona o campo de quantidade

const listaProdutos = document.getElementById('lista-produtos'); 
// Seleciona a lista onde os produtos adicionados serão exibidos

const valorTotal = document.getElementById('valor-total'); 
// Seleciona o elemento que mostra o valor total

let carrinho = []; 
// Array para armazenar os produtos do carrinho

// Função para adicionar produtos ao carrinho //
function adicionar() {

    // Obtem o produto selecionado e a quantidade desejada
    const produtoSelecionado = produtoSelect.value;
    const quantidade = parseInt(quantidadeInput.value);

    // Verifica se um produto válido foi selecionado
    if (!produtoSelecionado) {
        alert('Por favor, selecione um produto.');
        return;
    }

    // Verifica se a quantidade é válida
    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }

    // Divide o nome do produto e o preço com base no texto selecionado no dropdown
    const [nomeProduto, precoString] = produtoSelecionado.split(' - R$');
    
    // Verifica se o produto e preço foram extraídos corretamente
    if (!nomeProduto || !precoString) {
        alert('Erro ao obter informações do produto. Por favor, tente novamente.');
        return;
    }

    const preco = parseFloat(precoString);

    // Adiciona o produto ao carrinho, ou atualiza a quantidade se o produto já estiver presente
    const produtoExistente = carrinho.find(item => item.nome === nomeProduto);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome: nomeProduto, preco: preco, quantidade: quantidade });
    }

    // Atualiza a interface do carrinho
    atualizarCarrinho();
}

// Função para atualizar a lista de produtos e o valor total do carrinho //
function atualizarCarrinho() {

    // Limpa a lista de produtos atual para adicionar os itens atualizados
    listaProdutos.innerHTML = '';

    // Variável para acumular o total
    let total = 0;

    // Itera sobre os produtos no carrinho para exibi-los na interface e calcular o total
    carrinho.forEach(produto => {

        // Criação do elemento de produto para adicionar à lista
        const item = document.createElement('section');
        item.className = 'carrinho__produtos__produto';
        item.innerHTML = `<span class="texto-azul">${produto.quantidade}x</span> ${produto.nome} <span class="texto-azul">R$${(produto.preco * produto.quantidade).toFixed(2)}</span>`;
        listaProdutos.appendChild(item);

        // Incrementa o total com o preço do produto multiplicado pela quantidade
        total += produto.preco * produto.quantidade;
    });

    // Atualiza o elemento de valor total com o total acumulado
    valorTotal.textContent = `R$${total.toFixed(2)}`;

    // Reseta o campo de quantidade para 0 após a adição
    quantidadeInput.value = 0;
}

// Função para limpar o carrinho //
function limpar() {
    
    // Esvazia o array do carrinho
    carrinho = [];

    // Reseta a interface do carrinho
    listaProdutos.innerHTML = '';
    valorTotal.textContent = 'R$0';
}

