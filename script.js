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

    // Mappa degli effetti -> Icone
    const iconeEffetti = {
        "Rilassante": "🌙",
        "Digestivo": "🍃",
        "Drenante": "💧",
        "Energizzante": "⚡",
        "Depurativo": "🧼",
        "Balsamico": "🌬️",
        "Antinfiammatorio": "🛡️",
        "Lenitivo": "🌸",
        "Dolcificante": "🍯"
    };

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

        // ICONA: Prende l'icona dal dizionario, se non esiste mette una foglia generica 🌿
        const icona = iconeEffetti[item.effetto] || "🌿";

        // WIKIPEDIA: Link di ricerca sicura
        const wikiUrl = `https://it.wikipedia.org/w/index.php?search=${encodeURIComponent(item.nome)}`;

        container.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h3>${item.nome}</h3>
                    <span class="effect-icon" title="${item.effetto}">${icona}</span>
                </div>
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

// --- NUOVA LOGICA FILTRI AGGIORNATA ---
const search = document.getElementById('searchBar');
const filter = document.getElementById('effettoFilter');
const container = document.getElementById('results'); // Assicuriamoci che esista il riferimento

[search, filter].forEach(el => {
    el.addEventListener('input', () => {
        const sVal = search.value.toLowerCase();
        const fVal = filter.value;

        // Filtriamo i dati
        const filtered = tisaneData.filter(t => {
            return t.nome.toLowerCase().includes(sVal) && 
                   (fVal === "" || t.effetto === fVal);
        });

        // Se non ci sono risultati, mostriamo il messaggio d'errore
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>🌿 Nessuna tisana trovata con questi criteri.</p>
                    <small>Prova a cambiare parola chiave o seleziona un altro effetto.</small>
                </div>
            `;
        } else {
            // Se ci sono risultati, chiamiamo la funzione render come al solito
            render(filtered);
        }
    });
});
