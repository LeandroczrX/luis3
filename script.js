
// PELÚCIAS


let peluciaSelecionada = "";

const pelucias = document.querySelectorAll(".pelucias img");
const audioPelucia = document.getElementById("audioPelucia");

pelucias.forEach(pelucia => {

    pelucia.addEventListener("click", () => {

        pelucias.forEach(p => {
            p.classList.remove("selecionada");
        });

        pelucia.classList.add("selecionada");

        peluciaSelecionada = pelucia.alt;

        if (audioPelucia) {
            audioPelucia.src = pelucia.dataset.som;
            audioPelucia.play();
        }

    });

});



// OS LANCHES


const produtosLoja = [
    { id: 1, nome: "X-Magrinho", preco: 30 },
    { id: 2, nome: "Fat-Fit", preco: 32 },
    { id: 3, nome: "X-Infarto", preco: 43 },
    { id: 4, nome: "X-Caloria", preco: 36 },
    { id: 5, nome: "X-Cebola", preco: 28 },
    { id: 6, nome: "X-Gordinho", preco: 35 },
    { id: 7, nome: "Nuggets Fritos", preco: 24 },
    { id: 8, nome: "Batata + Cheddar", preco: 22 },
    { id: 9, nome: "Anéis de Cebola", preco: 20 }
];

let produtosCarrinho = [];



// ADICIONAR AO CARRINHO


function adicionarAoCarrinho(id) {

    let produto = produtosLoja.find(prod => prod.id === id);

    if (!produto) return;

    const somCarrinho = document.getElementById("somCarrinho");

if (somCarrinho) {
    somCarrinho.currentTime = 0;
    somCarrinho.play();
}

    // X-Gordinho = ESCOLHA DA PELUCia

    if (id === 6) {

        if (peluciaSelecionada === "") {
            alert("Escolha uma pelúcia primeiro!");
            return;
        }

        produto = {
            ...produto,
            nome: `${produto.nome} + Pelúcia ${peluciaSelecionada}`
        };
    }

    const existe = produtosCarrinho.find(
        prod => prod.nome === produto.nome
    );

    if (existe) {

        existe.quantidade++;

    } else {

        produtosCarrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });

    }

    renderizarCarrinho();
}



//Carrinho


function renderizarCarrinho() {

    const listaCarrinho = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    if (!listaCarrinho || !total) return;

    listaCarrinho.innerHTML = "";

    let somaTotal = 0;

    produtosCarrinho.forEach(produto => {

        somaTotal += produto.preco * produto.quantidade;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${produto.nome}
                (x${produto.quantidade})
                - R$ ${(produto.preco * produto.quantidade).toFixed(2)}
            </span>

            <div>
                <button onclick="mudarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="mudarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <button onclick="removerDoCarrinho('${produto.nome}')">
                    Remover
                </button>
            </div>
        `;

        listaCarrinho.appendChild(div);

    });

    total.textContent =
        `Seu Total: R$ ${somaTotal.toFixed(2)}`;
}



// CONTADOR DA QUANTIDADE


function mudarQuantidade(id, valor) {

    produtosCarrinho = produtosCarrinho
        .map(produto => {

            if (produto.id === id) {

                return {
                    ...produto,
                    quantidade: produto.quantidade + valor
                };

            }

            return produto;

        })
        .filter(produto => produto.quantidade > 0);

    renderizarCarrinho();
}



// REMOVER O ITEM


function removerDoCarrinho(nome) {

    produtosCarrinho = produtosCarrinho.filter(
        produto => produto.nome !== nome
    );

    renderizarCarrinho();
}


// BOTÕES DE LIMPAR E FINALIZAR


document.addEventListener("DOMContentLoaded", () => {

    const limpar = document.getElementById("limpar");

    if (limpar) {

        limpar.addEventListener("click", () => {

            produtosCarrinho = [];

            renderizarCarrinho();

            const texto =
                document.getElementById("texto-comprar");

            if (texto) {
                texto.textContent = "";
            }

        });

    }

    const comprar = document.getElementById("comprar");

    if (comprar) {

        comprar.addEventListener("click", () => {

            const texto =
                document.getElementById("texto-comprar");

            if (produtosCarrinho.length > 0) {

                produtosCarrinho = [];

                renderizarCarrinho();

                texto.textContent =
                    "Pedido realizado com sucesso!";

                texto.style.color = "green";

                const somCarrinho = document.getElementById("somCompra");

if (somCarrinho) {
    somCarrinho.currentTime = 0;
    somCarrinho.play();
}

            } else {

                texto.textContent =
                    "⚠️ Seu carrinho está vazio!";

                texto.style.color = "red";

            }

        });

    }

    renderizarCarrinho();

});