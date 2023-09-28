let inputcategorie = document.querySelector('#inputcategorie');
let inputtitre = document.querySelector('#inputtitre');
let inputdate = document.querySelector('#inputdate');
let inputdescription = document.querySelector('#inputdescription');
let inputstatut = document.querySelector('#inputstatut');
let btnajouter = document.querySelector('.btnajouter');
let tbody = document.querySelector('#tbody');
let containerdescription = document.querySelector('.containerdescription');
let notification = document.querySelector('.notification');
let terminer = 0
let nouveau = 0
let encours = 0




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
    let tach = JSON.parse(localStorage.getItem('cles'));
    tbody.innerHTML=''
    tach.forEach(element => {
        tbody.innerHTML += `<tr class="affichedescrip">
                          <th scope="row">${element.index}</th>
                          <td>${element.date}</td>
                          <td >${element.titre}</td>
                          <td>${element.categorie}</td>
                          <td>
                            <span class= "views"><i class="bi bi-eye"></i></span>
                            <span class= "edit"><i class="bi bi-pencil-square"></i></span>
                            <span class= "sup"><i class="bi bi-trash3"></i></span>
                          </td>
                       </tr>`
    });

    // afficher les description de chaque tâche
    let affichedescrip = document.querySelectorAll('.affichedescrip');
    affichedescrip.forEach(element => {
       element.addEventListener('click',()=>{
        let ind =element.querySelector('th').textContent;
        let desc = tach.find((id)=> id.index==ind);
        containerdescription.textContent = desc.description;
       })
    });

    // btn supprimer
    let supprimer = document.querySelectorAll('.sup');
    supprimer.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click',(e)=>{
            console.log(e.target.parentElement.parentElement.parentElement.querySelector('th').textContent);
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            let tab = tac.filter((idd)=> idd.index != indd )
            tac = tab;
            localStorage.setItem('cles',JSON.stringify(tac));
            insertline();
            affichgraph()
            chart()
        })
    });
}
insertline();

function affichgraph() {
    terminer = 0
    nouveau = 0
    encours = 0
    tach.forEach(element => {
        if (element.statut==="Terminé") {
            terminer++ ;
        }else  if (element.statut==="Nouveau") {
            nouveau++;
        } else  if (element.statut==="En cours") {
            encours ++;
        }
    });
}


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
    if(inputstatut.value !==''){
        affichgraph()
    }

  
    inputdate.value        = "";
    inputtitre.value         = "";
    inputcategorie.value     = "";
    inputdescription.value   = "";
    inputstatut.value        = "";

    insertline();

    notification.style.display = 'block'
        setTimeout(() => {
            notification.style.display = 'none'
          }, 3000);
    
    chart()
 })


 // =================chartjs=======================
 affichgraph()
 let myChart;
function chart() {
const ctx = document.getElementById('myChart');
if(myChart){
    myChart.destroy()
}
 myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['terminer', 'nouveau', 'encours'],
      datasets: [{
        data: [terminer, nouveau, encours],
        backgroundColor:['gray', 'blue', 'green'],
        borderWidth: 1
      }]
    },
    
  });
  
}
chart()
// ================================================


 // function mettre a jour localstorage
function updateTach() {
    localStorage.setItem('cles',JSON.stringify(tach))
}
