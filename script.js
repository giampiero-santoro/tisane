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
        // Logica per determinare il metodo di preparazione
        const temperaturaNum = parseInt(item.temperatura);
        let metodoPrep = "";
        let consiglio = "";

        if (item.temperatura === "Ambiente") {
            metodoPrep = "Macerato a freddo";
            consiglio = "Lascia in acqua a temperatura ambiente per 4-6 ore.";
        } else if (temperaturaNum >= 100) {
            metodoPrep = "Decotto";
            consiglio = "Metti in acqua fredda e fai bollire insieme alla pianta.";
        } else {
            metodoPrep = "Infuso";
            consiglio = "Versa l'acqua calda sulla pianta (non bollente).";
        }

        // Link dinamico a Wikipedia Italia
        const wikiLink = `https://it.wikipedia.org/wiki/${item.nome.replace(/ /g, "_")}`;

        container.innerHTML += `
            <div class="card">
                <h3>${item.nome}</h3>
                <div class="tags">
                    <span class="tag type">${metodoPrep}</span>
                    <span class="tag effect">${item.effetto}</span>
                </div>
                <p><strong>Proprietà:</strong> ${item.proprieta}</p>
                <p class="advice">💡 <em>${consiglio}</em></p>
                <div class="footer-card">
                    <span>Temp: ${item.temperatura}</span>
                    <a href="${wikiLink}" target="_blank" class="wiki-btn">📖 Wikipedia</a>
                </div>
            </div>
        `;
    });
}

// Filtri
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
