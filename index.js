let inputcategorie = document.querySelector('#inputcategorie');
let inputtitre = document.querySelector('#inputtitre');
let inputdate = document.querySelector('#inputdate');
let inputdescription = document.querySelector('#inputdescription');
let inputstatut = document.querySelector('#inputstatut');
let btnajouter = document.querySelector('.btnajouter');

// initialisation du tableau
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify([]))
}
let tab = JSON.parse(localStorage.getItem('cles'));


let tache ={
    index: 0,
    date: '',
    titre: '',
    categorie: '',
    description: '',
    statut: '',
}


   

 
 btnajouter.addEventListener('click',()=>{
    tache ={
        index: 0,
        date: inputdate.value,
        titre: inputtitre.value,
        categorie: inputcategorie.value,
        description: inputdescription.value,
        statut: inputstatut.value,
    }
    inputdate.textContent        = "";
    inputtitre.textContent         = "";
    inputcategorie.textContent     = "";
    inputdescription.textContent   = "";
    inputstatut.textContent        = "";
    console.log(tache);

 })