document.getElementById('verbSelector').addEventListener('change', function() {
    const verb = this.value;
    if (verb) {
        // Carregar o JSON e fazer a conjugação
        fetch('verbs.json') // Ajuste o caminho para o local correto do seu JSON
            .then(response => response.json())
            .then(data => {
                conjugateVerb(verb, data);
                document.getElementById('conjugationContainer').style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading the JSON file:', error);
            });
    } else {
        document.getElementById('conjugationContainer').style.display = 'none';
    }
});

function conjugateVerb(verb, data) {
    const verbTitle = document.getElementById('verbTitle');
    const tensesDiv = document.getElementById('tenses');
    
    // Limpando o conteúdo anterior
    verbTitle.textContent = `Verb: ${verb}`;
    tensesDiv.innerHTML = '';
    
    // Mapeamento de conjugação para verbos específicos
    const defaultConjugations = {
        presentSimple: `${verb} (e.g., I ${verb})`,
        pastSimple: `${verb}ed (e.g., I ${verb}ed)`,
        futureSimple: `will ${verb} (e.g., I will ${verb})`
    };

    const tenseConjugations = data[verb] || defaultConjugations;

    const tenses = [
        {
            name: 'Present Simple',
            conjugation: tenseConjugations.presentSimple,
            example: `Song lyric: "I ${verb} you every day."`
        },
        {
            name: 'Past Simple',
            conjugation: tenseConjugations.pastSimple,
            example: `Song lyric: "I ${verb}ed you yesterday."`
        },
        {
            name: 'Future Simple',
            conjugation: tenseConjugations.futureSimple,
            example: `Song lyric: "I will ${verb} you tomorrow."`
        }
    ];

    tenses.forEach(tense => {
        const tenseDiv = document.createElement('div');
        tenseDiv.classList.add('tense');

        const tenseTitle = document.createElement('h3');
        tenseTitle.textContent = tense.name;

        const conjugation = document.createElement('p');
        conjugation.textContent = `Conjugation: ${tense.conjugation}`;

        const example = document.createElement('p');
        example.textContent = `Example: ${tense.example}`;

        tenseDiv.appendChild(tenseTitle);
        tenseDiv.appendChild(conjugation);
        tenseDiv.appendChild(example);

        tensesDiv.appendChild(tenseDiv);
    });
}
