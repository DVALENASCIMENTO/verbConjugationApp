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
    
    // Mapeamento de conjugação para o verbo selecionado
    const tenseConjugations = data[verb] || {
        presentSimple: `${verb}`,
        pastSimple: `${verb}ed`,
        futureSimple: `will ${verb}`
    };

    const tenses = [
        {
            name: 'Present Simple',
            conjugation: tenseConjugations.presentSimple,
            example: tenseConjugations.presentExample || `I ${tenseConjugations.presentSimple} you every day.`
        },
        {
            name: 'Past Simple',
            conjugation: tenseConjugations.pastSimple,
            example: tenseConjugations.pastExample || `I ${tenseConjugations.pastSimple} you yesterday.`
        },
        {
            name: 'Future Simple',
            conjugation: tenseConjugations.futureSimple,
            example: tenseConjugations.futureExample || `I will ${verb} you tomorrow.`
        }
    ];

    // Adiciona cada tempo verbal com exemplo à tela
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
