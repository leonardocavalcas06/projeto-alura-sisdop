let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector("#searchInput");
let dados = [];

 async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON
    if (dados.length === 0) {
        try {
            let resposta =  await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados das doações.</p>";
            return;
        }
    }
    
    const termoBusca = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.tags.some(tag => tag.toLowerCase().includes(termoBusca))
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma doação encontrada com este termo.</p>";
        return;
    }
    for (const dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        const tagsHtml = dado.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Imagem da campanha ${dado.nome}" class="card-img">
            <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
                <h2>${dado.nome}</h2>
                <p style="flex-grow: 1;">${dado.descricao}</p>
                <div class="tags-container">
                    ${tagsHtml}
                </div>
                <p>Ano de Criação: ${dado.data_criacao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}

document.addEventListener('DOMContentLoaded', iniciarBusca); // Carrega os cards automaticamente ao carregar a página