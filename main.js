/* console.log('test depuis main');
const livresDiv = document.querySelector('#livres');
let livres = [
    {id: 1, titre: "Ravagenpm init", resume: "Ravage présente le naufrage d'une société mature, dans laquelle, un jour, l'électricité disparaît et plus aucune machine ne peut fonctionner. Les habitants, anéantis par la soudaineté de la catastrophe, sombrent dans le chaos, privés d'eau courante, de lumière et de moyens de déplacement.", isbn: "978-2070362387"},
    {id: 2, titre: "La Nuit des temps", resume: "Dans le grand silence blanc de l'Antarctique, les membres d'une mission des Expéditions polaires françaises s'activent à prélever des carottes de glace. L'épaisseur de la banquise atteint plus de 1 000 mètres, les couches les plus profondes remontant à 900 000 ans... C'est alors que l'incroyable intervient : les appareils sondeurs enregistrent un signal provenant du niveau du sol. Il y a un émetteur sous la glace. La nouvelle éclate comme une bombe et les journaux du monde entier rivalisent de gros titres : Une ville sous la glace , Un cœur sous la banquise, etc. Que vont découvrir les savants et les techniciens qui, venus du monde entier, forent la glace à la rencontre du mystère ? Reportage, épopée et chant d'amour passionné, La Nuit des temps est tout cela à la fois.", isbn: "978-2258152830"},
    {id: 3, titre: "La zone du dehors", resume: "2084. Orwell est loin désormais. Le totalitarisme a pris les traits bonhommes de la social-démocratie. Souriez, vous êtes gérés ! Le citoyen ne s'opprime plus : il se fabrique. À la pâte à norme, au confort, au consensus. Copie qu'on forme, tout simplement. Au cœur de cette glu, un mouvement, une force de frappe, des fous : la Volte. Le Dehors est leur espace, subvertir leur seule arme. Emmenés par Capt, philosophe et stratège, le peintre Kamio et le fulgurant Slift que rien ne bloque ni ne borne, ils iront au bout de leur volution. En perdant beaucoup. En gagnant tout. Premier roman, ici réécrit, La Zone du Dehors est un livre de combat contre nos sociétés de contrôle. Celle que nos gouvernements, nos multinationales, nos technologies et nos médias nous tissent aux fibres, tranquillement. Avec notre plus complice consentement. Peut-être est-il temps d'apprendre à boxer chaos debout contre le swing de la norme ?", isbn: "978-2070464241"},
    {id: 4, titre: "La horde du contrevent", resume: "Un groupe d'élite, formé dès l'enfance à faire face, part des confins d'une terre féroce, saignée de rafales, pour aller chercher l'origine du vent. Ils sont vingt-trois, un bloc, un nœud de courage : la Horde. Ils sont pilier, ailier, traceur, aéromaître et géomaître, feuleuse et sourcière, troubadour et scribe. Ils traversent leur monde debout, à pied, en quête d'un Extrême-Amont qui fuit devant eux comme un horizon fou. Expérience de lecture unique, La Horde du Contrevent est un livre-univers qui fond d'un même feu l'aventure et la poésie des parcours, le combat nu et la quête d'un sens profond du vivant qui unirait le mouvement et le lien. Chaque mot résonne, claque, fuse : Alain Damasio joue de sa plume comme d'un pinceau, d'une caméra ou d'une arme… Chef-d'œuvre porté par un bouche-à-oreille rare, le roman a été logiquement récompensé par le Grand Prix de l'Imaginaire.", isbn: "978-2070464234"}
];
function loadBooks(livres) {
    const allBooks = livres
        .map(t => `<div><b>${t.titre}  : </b> ${t.resume} - ${t.isbn} </div>`)
        .join('');
    livresDiv.innerHTML = allBooks; 
}
loadBooks(livres); */
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