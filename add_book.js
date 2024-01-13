console.log('hello depuis add_book');

const livretitreField = document.querySelector('#livre-titre');
const livreresumeField = document.querySelector('#livre-resume');
const livreisbnField = document.querySelector('#livre-isbn');
const addLivreForm = document.querySelector('#add-livre-form');

addLivreForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const payload = {
        titre: livretitreField.value,
        resume: livreresumeField.value,
        isbn: livreisbnField.value
    }

    fetch('http://localhost:3001/livres', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err =>console.error);
})