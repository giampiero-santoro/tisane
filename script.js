let database = [];

// Carica i dati dal file JSON
fetch('tisane.json')
    .then(response => response.json())
    .then(data => {
        database = data;
        mostraTisane(database);
    });

const container = document.getElementById('results');
const searchBar = document.getElementById('searchBar');
const effettoFilter = document.getElementById('effettoFilter');

function mostraTisane(items) {
    container.innerHTML = '';
    items.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.nome}</h3>
                <p><span class="tag">${item.tipo}</span> <span class="tag">${item.effetto}</span></p>
                <p>${item.proprieta}</p>
                <small>Temp: ${item.temperatura}</small>
            </div>
        `;
    });
}

// Eventi per la ricerca
[searchBar, effettoFilter].forEach(el => {
    el.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const effetto = effettoFilter.value;
        const filtrati = database.filter(t => 
            t.nome.toLowerCase().includes(query) && (effetto === "" || t.effetto === effetto)
        );
        mostraTisane(filtrati);
    });
});
