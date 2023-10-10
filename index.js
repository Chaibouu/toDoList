let inputcategorie = document.querySelector('#inputcategorie');
let inputtitre = document.querySelector('#inputtitre');
let inputdate = document.querySelector('#inputdate');
let inputdescription = document.querySelector('#inputdescription');
let inputstatut = document.querySelector('#inputstatut');
let btnajouter = document.querySelector('.btnajouter');
let tbody = document.querySelector('#tbody');
let containerdescription = document.querySelector('.containerdescription');
let notification = document.querySelector('.notification');
let infotache = document.querySelector('.infotache');

let terminer = 0
let nouveau = 0
let encours = 0
let indd= 0;


// initialisation du tableau
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify([]))
}
let tach = JSON.parse(localStorage.getItem('cles'));

// function update Id
const upId=(tach)=>{
    let array=tach;
    array.forEach((el,i)=>{
        el.index = i+1
    })
    return array;
}


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

    // btn views
    let views = document.querySelectorAll('.views');
    views.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click',(e)=>{
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            console.log(indd);
            let tab = tac.find((idd)=> idd.index == indd )
            infotache.style.visibility = 'visible';
            infotache.innerHTML = `<h3 class="w-100"> informations tâche</h3>
                                   <div class="d-flex mx-4 my-2">
                                        <div class="d-flex flex-column align-items-start me-2">
                                             <span class="inf">Date </span>
                                             <span class="inf">Titre </span>
                                             <span class="inf">Catégorie </span> 
                                             <span class="inf">Statut </span> 
                                             <span class="inf">Description </span> 
                                        </div>
                                        <div class="d-flex flex-column align-items-start">
                                             <span> : ${tab.date} </span>
                                             <span>: ${tab.titre} </span>
                                             <span>: ${tab.categorie} </span>
                                             <span>: ${tab.statut} </span>
                                             <span>: ${tab.description} </span>
                                        </div>
                                   </div>`
            let sortie = document.querySelector('.sortie');
            sortie.style.display = 'block'

        })
    });
    // btn supprimer
    let supprimer = document.querySelectorAll('.sup');
    supprimer.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click',(e)=>{
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            let tab = tac.filter((idd)=> idd.index != indd )
            tac = tab;
            upId(tac)
            localStorage.setItem('cles',JSON.stringify(tac));
            insertline();
            affichgraph()
            chart()
        })
    });
    // btn editer
    let editer = document.querySelectorAll('.edit');
    editer.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click',(e)=>{
             indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            //  let asup = e.target.parentElement.parentElement.parentElement;
            //  asup.remove();
            console.log(indd)
            let tab = tac.find((idd)=> idd.index == indd )
            console.log(tab)
            inputdate.value        = tab.date;
            inputtitre.value         = tab.titre;
            inputcategorie.value     = tab.categorie;
            inputdescription.value   = tab.description;
            inputstatut.value        = tab.statut;

            // localStorage.setItem('cles',JSON.stringify(tac[ind]));
            // insertline();
            // affichgraph()
            // chart()
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
    let tac = JSON.parse(localStorage.getItem('cles'));
    const findEl = tac.filter((el) => el.index === parseInt(indd))
    console.log(findEl)
    console.log(indd);
    if (findEl.length > 0 ) {
        
        tache ={
            index: indd,
            date: inputdate.value,
            titre: inputtitre.value,
            categorie: inputcategorie.value,
            description: inputdescription.value,
            statut: inputstatut.value,
        }
        tac.splice(tac.indexOf(findEl),1,tache)
        upId(tac)
        localStorage.setItem('cles',JSON.stringify(tac))

        if(inputstatut.value !==''){
        affichgraph()

        inputdate.value          = "";
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
        indd = 0;
    }
    
          return
    }
    
    tache ={
        index: tach.length? tach.length + 1: 1,
        date: inputdate.value,
        titre: inputtitre.value,
        categorie: inputcategorie.value,
        description: inputdescription.value,
        statut: inputstatut.value,
    }
   
    tach.push(tache);
    upId(tac)
    updateTach()
    if(inputstatut.value !==''){
        affichgraph()
    }

  
    inputdate.value          = "";
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
