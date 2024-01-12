console.log('test depuis main');
const livresDiv = document.querySelector('#livres');

function loadBooks() {
    fetch('http://localhost:3001/livres')
        .then(response => {
            response.json()
              .then(livres => {
                 const allBooks = livres.map(t => `<div><b>${t.titre} : </b> ${t.resume} - ${t.isbn} </div>`)
                    .join('');

                 livresDiv.innerHTML = allBooks;
               });
        })
        .catch(console.error);
}

loadBooks(); 

if(navigator.serviceWorker) {
    navigator.serviceWorker
        .register('sw.js')
        .catch(err => console.error('service worker NON enregistré', err));
} 