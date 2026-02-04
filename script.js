let tisaneData = [];

// Caricamento Dati
fetch('tisane.json')
    .then(res => res.json())
    .then(data => {
        tisaneData = data;
        render(tisaneData);
    });

function render(data) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    data.forEach(item => {
        const temp = parseInt(item.temperatura);
        let prep = "Infuso";
        let consiglio = "Versa acqua calda sulla pianta e lascia in infusione 5-8 min.";

        if (item.temperatura === "Ambiente") {
            prep = "Macerato";
            consiglio = "Lascia la pianta in acqua fredda per 6 ore.";
        } else if (temp >= 100) {
            prep = "Decotto";
            consiglio = "Metti la pianta in acqua fredda, porta a bollore e cuoci per 5-10 min.";
        }

// Questo link forza Wikipedia a fare una ricerca interna invece di cercare la pagina esatta
const wikiUrl = `https://it.wikipedia.org/w/index.php?search=${encodeURIComponent(item.nome)}`;

        container.innerHTML += `
            <div class="card">
                <h3>${item.nome}</h3>
                <div class="tags">
                    <span class="tag tag-tipo">${prep}</span>
                    <span class="tag tag-effetto">${item.effetto}</span>
                </div>
                <p><strong>Proprietà:</strong> ${item.proprieta}</p>
                <div class="advice">💡 ${consiglio}</div>
                <div class="footer">
                    <span>🔥 ${item.temperatura}</span>
                    <a href="${wikiUrl}" target="_blank" class="wiki-btn">📖 Wikipedia</a>
                </div>
            </div>
        `;
    });
}

// Logica Filtri
const search = document.getElementById('searchBar');
const filter = document.getElementById('effettoFilter');

[search, filter].forEach(el => {
    el.addEventListener('input', () => {
        const sVal = search.value.toLowerCase();
        const fVal = filter.value;

        const filtered = tisaneData.filter(t => {
            return t.nome.toLowerCase().includes(sVal) && 
                   (fVal === "" || t.effetto === fVal);
        });
        render(filtered);
    });
});
