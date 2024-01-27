var animationSpeed = 750;
var library = [];

$(document).ready(function(){
    fillLibrary();
    attachAnimations();    
});

/* -----------------------------------------------------------------------------
    FILL PAGE HTML 
   ---------------------------------------------------------------------------*/
function fillLibrary() {
    assembleData();
    console.log('fillLibrairy');
    var classlist = ['left-side first','left-side','left-side','right-side','right-side','right-side last'];
         for (i=0; i < library.length; i++) {
            //for (i=0; i < 5; i++) {
            var book = library[i];
            
            // add html for current book
            /*var html = '<li class="book ' + classlist[0] + '">';
            html += '<div class="cover"><img src=Images/' + book.cover + '.jpg /></div>';
            html += '<div class="resume">';
            html += '<h1>' + book.titre + '</h1>';
            //html += '<h2>by ' + book.author + '</h2>';
            html += '<p>' + book.resume + '</p>';
            html += '<p>' + book.isbn + '</p>';
            html += '</div></li>';*/
            var html = '<div class="component">';
            html += '<ul class="align">';
            html += '<li>';
            html += "<figure class='book'>";        
            html += "<ul class='hardcover_front'>";            
            html += "<li>";        
            html += '<img src="Images/' + book.cover + '.jpg" alt="" width="100%" height="100%">';
            //html += '<span class="ribbon bestseller">Nº1</span>';
            html += '</li>';
            html += '<li></li>';
            html += '</ul>';        
            html += "<ul class='page'>";
            html += '<li></li>';
            html += '<li>';
            html += '<a class="btn" href="#">' + book.isbn + '</a>';
            html += '</li>';
            html += '<li></li>';
            html += '<li></li>';
            html += '<li></li>';
            html += '</ul>';        
            html += "<ul class='hardcover_back'>";
            html += "<li></li>";
            html += "<li></li>";
            html += "</ul>";
            html += "<ul class='book_spine'>";
            html += "<li></li>";
            html += "<li></li>";
            html += "</ul>";
            html += "<figcaption>";
            html += "<h1>" + book.titre + "</h1>";
            // html += "<span>" + book.auteur + "</span>";
            html += "<p>" + book.resume + "</p>";
            html += '</figcaption>';
            html += "</figure>";
            html += "</li>";  
            html += "</ul>";
            
            $('.bibliotheque').append(html);
            // shift the classlist array for the next iteration
            var cn = classlist.shift();
            classlist.push(cn);
        }
   
}
/* -----------------------------------------------------------------------------
    ANIMATION 
   ---------------------------------------------------------------------------*/
function attachAnimations() {
    $('.book').click(function(){
        if (!$(this).hasClass('selected')) {
            selectAnimation($(this));
        }
    });
    $('.book .cover').click(function(){
        if ($(this).parent().hasClass('selected')) {
           deselectAnimation($(this).parent());
        }
    });
}

function selectAnimation(obj) {
    obj.addClass('selected');
    // elements animating
    var cover = obj.find('.cover');
    var image = obj.find('.cover img');
    var library = $('.library');
    var resumeBG = $('.overlay-resume');
    var resume = obj.find('.resume');
    // animate book cover
    cover.animate({
        width: '300px',
        height: '468px' 
    }, {
        duration: animationSpeed
    });
    image.animate({
        width: '280px',
        height: '448px',
        borderWidth: '10px'
    },{
        duration: animationSpeed
    });
    // add fix if the selected item is in the bottom row
    if (isBtmRow()){
      library.css('paddingBottom','234px');
    }
    // slide page so book always appears
    positionTop();
    // add background overlay
    $('.overlay-page').show();
    // locate resume overlay    
    var px = overlayVertPos();
    resumeBG.css('left',px);
    // animate resume elements
    var ht = $('.content').height();
    var pos = $('.book.selected').position();
    var start = pos.top + 30; // 10px padding-top on .book + 20px padding of .resume
    var speed = Math.round((animationSpeed/ht) * 450); // 450 is goal height
    resumeBG.show().animate({
        height: ht + 'px'
    },{
        duration: animationSpeed,
        easing: 'linear',
        step: function(now,fx){
            if (now > start && fx.prop === "height"){
                if(!resume.is(':animated') && resume.height() < 450){
                    resume.show().animate({
                        height: '450px'
                    },{
                        duration: speed,
                        easing: 'linear'
                    });
                }
                
            }
        } 
        
    });
}

function deselectAnimation(obj) {
    // elements animating
    var cover = obj.find('.cover');
    var image = obj.find('.cover img');
    var library = $('.library');
    var resumeBG = $('.overlay-resume');
    var resume = obj.find('.resume');
    // stop resume animation
    resume.stop();
    // animate book cover
    cover.stop().animate({
        width: '140px',
        height: '224px' 
    },{
        duration:animationSpeed
    });
    image.stop().animate({
        width: '140px',
        height: '224px',
        borderWidth: '0px'
    },{
        duration: animationSpeed,
        complete: function() {
            obj.removeClass('selected');
        }
    });
    // remove fix for bottom row, if present
    library.stop().animate({
        paddingBottom:'10px'
    },{ 
        duration: animationSpeed
    });
    // remove background overlay and resume
    var ht = resumeBG.height();
    var pos = $('.book.selected').position();
    var start = pos.top + 480; //10px of top padding + 470px for .resume height + padding
    var speed = Math.round((animationSpeed/ht) * resume.height());
    resumeBG.stop().animate({
        height: '0px'
    },{
        duration: animationSpeed,
        easing: 'linear',
        step: function(now,fx){
            if (now < start && fx.prop === "height"){
                if(!resume.is(':animated') && resume.height() > 0){
                    resume.animate({
                        height: '0px'
                    },{ 
                        duration: speed,
                        easing: 'linear',
                        complete: function(){
                            resume.hide(); 
                        }
                    });
                }
                
            }
        }, 
        complete: function(){
            $('.overlay-page').hide();
            resume.hide(); // catching this twice to insure for aborted animation
            resumeBG.hide();
        }
    });
}

function isBtmRow() {
    var pos = $('.book.selected').position();
    var libHgt = $('.content').height();
    if (libHgt-pos.top===254) { // this is current height of the book, plus 30 for padding on the book and library
        return true;
    } else {
        return false;
    }
}

function positionTop() { 
   var offset = $('.book.selected').offset();
   var bTop = offset.top;
   $('html, body').animate({ scrollTop: bTop }, animationSpeed);
}

function overlayVertPos() { // determines the vertical position for the resume overlay based on selection position
    var pos = $('.book.selected').position();
    switch(pos.left) {
        case 0:
            return '320px';
        case 160:
            return '320px';
        case 320:
            return '480px';
        case 480:
            return '0px';
        case 640:
            return '160px';
        case 800:
            return '160px';
        default:
            return false;
    }
}
/* -----------------------------------------------------------------------------
    BUILD LIBRARY ARRAY 
   ---------------------------------------------------------------------------*/
function Book(cover,titre,resume,isbn) {
    this.cover = cover;
    this.titre = titre;
    //this.author = author;
    this.resume = resume;
    this.isbn = isbn
    library.push(this);
}

function assembleData() {
    var book;
    book = new Book("Ravage","Ravage","Ravage présente le naufrage d'une société mature, dans laquelle, un jour, l'électricité disparaît et plus aucune machine ne peut fonctionner. Les habitants, anéantis par la soudaineté de la catastrophe, sombrent dans le chaos, privés d'eau courante, de lumière et de moyens de déplacement.","978-2070362387");
    book = new Book("La_Nuit_des_temps","La Nuit des temps","Dans le grand silence blanc de l'Antarctique, les membres d'une mission des Expéditions polaires françaises s'activent à prélever des carottes de glace. L'épaisseur de la banquise atteint plus de 1 000 mètres, les couches les plus profondes remontant à 900 000 ans... C'est alors que l'incroyable intervient : les appareils sondeurs enregistrent un signal provenant du niveau du sol. Il y a un émetteur sous la glace. La nouvelle éclate comme une bombe et les journaux du monde entier rivalisent de gros titres : Une ville sous la glace , Un cœur sous la banquise, etc. Que vont découvrir les savants et les techniciens qui, venus du monde entier, forent la glace à la rencontre du mystère ? Reportage, épopée et chant d'amour passionné, La Nuit des temps est tout cela à la fois.","978-2258152830");
    book = new Book("La_zone_du_dehors","La zone du dehors","2084. Orwell est loin désormais. Le totalitarisme a pris les traits bonhommes de la social-démocratie. Souriez, vous êtes gérés ! Le citoyen ne s'opprime plus : il se fabrique. À la pâte à norme, au confort, au consensus. Copie qu'on forme, tout simplement. Au cœur de cette glu, un mouvement, une force de frappe, des fous : la Volte. Le Dehors est leur espace, subvertir leur seule arme. Emmenés par Capt, philosophe et stratège, le peintre Kamio et le fulgurant Slift que rien ne bloque ni ne borne, ils iront au bout de leur volution. En perdant beaucoup. En gagnant tout. Premier roman, ici réécrit, La Zone du Dehors est un livre de combat contre nos sociétés de contrôle. Celle que nos gouvernements, nos multinationales, nos technologies et nos médias nous tissent aux fibres, tranquillement. Avec notre plus complice consentement. Peut-être est-il temps d'apprendre à boxer chaos debout contre le swing de la norme ?","978-2070464241");
    book = new Book("La_horde_du_contrevent","La horde du contrevent","Un groupe d'élite, formé dès l'enfance à faire face, part des confins d'une terre féroce, saignée de rafales, pour aller chercher l'origine du vent. Ils sont vingt-trois, un bloc, un nœud de courage : la Horde. Ils sont pilier, ailier, traceur, aéromaître et géomaître, feuleuse et sourcière, troubadour et scribe. Ils traversent leur monde debout, à pied, en quête d'un Extrême-Amont qui fuit devant eux comme un horizon fou. Expérience de lecture unique, La Horde du Contrevent est un livre-univers qui fond d'un même feu l'aventure et la poésie des parcours, le combat nu et la quête d'un sens profond du vivant qui unirait le mouvement et le lien. Chaque mot résonne, claque, fuse : Alain Damasio joue de sa plume comme d'un pinceau, d'une caméra ou d'une arme… Chef-d'œuvre porté par un bouche-à-oreille rare, le roman a été logiquement récompensé par le Grand Prix de l'Imaginaire.","978-2070464234");
    book = new Book("Neuromancien","Neuromancien","Science-fiction à court terme qui explore les retombées des technologies de pointe, notamment l'informatique, dans tous les aspects de la vie quotidienne. Ambiance marquée par la culture rock et flirt fréquent avec le polar.","979-1030703658");
}