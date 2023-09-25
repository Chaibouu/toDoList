let inputcategorie = document.querySelector('#inputcategorie');
let inputtitre = document.querySelector('#inputtitre');
let inputdate = document.querySelector('#inputdate');
let inputdescription = document.querySelector('#inputdescription');
let inputstatut = document.querySelector('#inputstatut');
let btnajouter = document.querySelector('.btnajouter');
let tbody = document.querySelector('#tbody');

// initialisation du tableau
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify([]))
}
let tach = JSON.parse(localStorage.getItem('cles'));


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
    tach.push(tache);
    updateTach()
    
    inputdate.value        = "";
    inputtitre.value         = "";
    inputcategorie.value     = "";
    inputdescription.value   = "";
    inputstatut.value        = "";
    console.log(tache);

    let tab = JSON.parse(localStorage.getItem('cles'));
    tab.forEach(element => {
        tbody.innerHTML = `<tr>
                          <th scope="row">${element.date}</th>
                          <td>${element.titre}</td>
                          <td>${element.categorie}</td>
                          <td>
                            <span></span>
                          </td>
                       </tr>`
    });
 })



 // function mettre a jour localstorage
function updateTach() {
    localStorage.setItem('cles',JSON.stringify(tach))
}