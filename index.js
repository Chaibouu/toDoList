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


const insertline = ()=> {
    let tab = JSON.parse(localStorage.getItem('cles'));
    tbody.innerHTML=''
    tab.forEach(element => {
        tbody.innerHTML += `<tr>
                          <th scope="row">${element.index}</th>
                          <td>${element.date}</td>
                          <td>${element.titre}</td>
                          <td>${element.categorie}</td>
                          <td>
                            <span class= "views"><i class="bi bi-eye"></i></span>
                            <span class= "edit"><i class="bi bi-pencil-square"></i></span>
                            <span class= "sup"><i class="bi bi-trash3"></i></span>
                          </td>
                       </tr>`
    });
}
insertline();
 
 btnajouter.addEventListener('click',()=>{
    tache ={
        index: tach.length? tach.length + 1: 1,
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

    insertline();


 })

 // =================chartjs=======================

 let terminer = 5;
 let nouveau = 2;
 let encours = 3;
const ctx = document.getElementById('myChart');
let chartj = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['terminer', 'moyen', 'debut'],
      datasets: [{
        data: [terminer, nouveau, encours],
        backgroundColor:['gray', 'blue', 'green'],
        borderWidth: 1
      }]
    },
    
  });
// fonction pour générer des couleur
const colorr = () => {
    let col = '0123456789ABCDEF';
    let r = '#';
    for (let i = 0; i < 6; i++) {
        r +=  col[Math.floor(Math.random()*16)] 
    }
    return r;
}
// ================================================


 // function mettre a jour localstorage
function updateTach() {
    localStorage.setItem('cles',JSON.stringify(tach))
}