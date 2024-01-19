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

if (window.Notification && window.Notification !== 'denied') {
    Notification.requestPermission(perm => {
        if(perm === 'granted') {
            /* const options = {
                body: 'Je suis le body de la notification',
                icon: 'Images/icons/icon-72x72.png'
            }
            const notif = new Notification('Hello notification', options); */
            console.log('autoridation de recevoir des notifications acceptée')
        } else {
            console.log('autorisation de recevoir des notification réfusée');
        }
        })
    }