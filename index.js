let inputcategorie = document.querySelector('#inputcategorie');
let inputtitre = document.querySelector('#inputtitre');
let inputdate = document.querySelector('#inputdate');
let inputdescription = document.querySelector('#inputdescription');
let inputstatut = document.querySelector('#inputstatut');
let btnajouter = document.querySelector('.btnajouter');
let btnMisajour = document.querySelector('.btnMisajour');
let tbody = document.querySelector('#tbody');
let containerdescription = document.querySelector('.containerdescription');
let notification = document.querySelector('.notification');
let infotache = document.querySelector('.infotache');
let titre = document.querySelector('.titre');

let terminer = 0
let nouveau = 0
let encours = 0
let indd= 0;
let idEdit= 0;


// initialisation du tableau
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify([]))
}
let tach = JSON.parse(localStorage.getItem('cles'));

 // function mettre a jour localstorage
 function updateTach() {
    localStorage.setItem('cles',JSON.stringify(tach))
}

// function update Id mettre à jour l'Id
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
    let ta = JSON.parse(localStorage.getItem('cles'));
    tbody.innerHTML=''
    ta.forEach(element => {
        tbody.innerHTML += `<tr class="">
                          <th class="affichedescrip" scope="row">${element.index}</th>
                          <td class="affichedescrip">${element.date}</td>
                          <td class="affichedescrip" >${element.titre}</td>
                          <td class="affichedescrip">${element.categorie}</td>
                          <td>
                            <span class= "views"><i class="bi bi-eye"></i></span>
                            <span class= "edit"><i class="bi bi-pencil-square"></i></span>
                            <span class= "sup"><i class="bi bi-trash3"></i></span>
                          </td>
                       </tr>`
    });

    // afficher les description de chaque tâche
    const afdescrip = (stockdescrip)=>{
        let affichedescrip = document.querySelectorAll('.affichedescrip');
        affichedescrip.forEach(element => {
        element.addEventListener('click',()=>{
        let ind =element.parentElement.firstElementChild.textContent;
        let desc = stockdescrip.find((id)=> id.index==ind);
        if (desc) {
            containerdescription.textContent = desc.description;
        }
        else{
            containerdescription.textContent = '';
            
        }
       })
    });
    }
    afdescrip(ta)

    // btn views
    let views = document.querySelectorAll('.views');
    views.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click',(e)=>{
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
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
    let datas = JSON.parse(localStorage.getItem('cles'));
    supprimer.forEach(button => {
        button.addEventListener('click',(e)=>{
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            let tab = datas.filter((idd)=> idd.index != indd )
            upId(tab)
            localStorage.setItem('cles',JSON.stringify(tab));
            insertline();
            affichgraph()
            chart()
            // vider la description
            containerdescription.textContent = '';
            // afficher la notification remplir les champs
            notification.style.display = 'block'
            notification.firstElementChild.style.backgroundColor ="red"
            notification.firstElementChild.textContent = "Tâche Supprimer"
            notification.lastElementChild.textContent = "Votre tâche à été supprimer avec succès"
            setTimeout(() => {
                notification.style.display = 'none'
            }, 3000);
        })
    });
    // btn editer
    let editer = document.querySelectorAll('.edit');
    let tacc = JSON.parse(localStorage.getItem('cles'));
    editer.forEach(button => {
        
        button.addEventListener('click',(e)=>{
            btnMisajour.style.display = "block";
            btnajouter.style.display = "none";
            titre.style.backgroundColor ="#03FFCC"

             idEdit = e.target.parentElement.parentElement.parentElement.querySelector('th').textContent;
            //  let asup = e.target.parentElement.parentElement.parentElement;
            //  asup.remove();
            let tab = tacc.find((idd)=> idd.index == idEdit );
            inputdate.value          = tab.date;
            inputtitre.value         = tab.titre;
            inputcategorie.value     = tab.categorie;
            inputdescription.value   = tab.description;
            inputstatut.value        = tab.statut;

            // localStorage.setItem('cles',JSON.stringify(tac[ind]));
            insertline();
            // affichgraph()
            // chart()
        })
    });
}
insertline();

// fonction pour envoyer les données du graphique
function affichgraph() {
    let gra = JSON.parse(localStorage.getItem('cles'));
    terminer = 0
    nouveau = 0
    encours = 0
    gra.forEach(element => {
        if (element.statut==="Terminé") {
            terminer++ ;
        }else  if (element.statut==="Nouveau") {
            nouveau++;
        } else  if (element.statut==="En cours") {
            encours ++;
        }
    });
}

// button mis à jour de l'édition d'une tache
btnMisajour.addEventListener('click', () => {
    let miseajour = JSON.parse(localStorage.getItem('cles'));
    let findEl = miseajour.findIndex((el) => el.index === parseInt(idEdit));

    miseajour[findEl].date = inputdate.value         
    miseajour[findEl].titre = inputtitre.value     
    miseajour[findEl].categorie = inputcategorie.value    
    miseajour[findEl].description = inputdescription.value  
    miseajour[findEl].statut = inputstatut.value       

    localStorage.setItem('cles',JSON.stringify(miseajour))

    if(inputstatut.value !==''){
        affichgraph()
    }

    insertline();
    chart()
    // vider la description
    containerdescription.textContent = '';

    // afficher la notification modification effectuer avec succès
    notification.style.display = 'block'
    notification.firstElementChild.style.backgroundColor ="#609DA0"
    notification.firstElementChild.textContent = "Modification"
    notification.lastElementChild.textContent = "Modification éffectuer avec succès"
    setTimeout(() => {
        notification.style.display = 'none'
      }, 3000);

    // vide les input après modification
    inputdate.value          = "";
    inputtitre.value         = "";
    inputcategorie.value     = "";
    inputdescription.value   = "";
    inputstatut.value        = "";

    // remettre les paramètres par default
    btnMisajour.style.display = "none";
    btnajouter.style.display = "block";
    titre.style.backgroundColor ="#609DA0";
})

// button ajouter une tâche
 btnajouter.addEventListener('click',()=>{
    if (inputtitre.value!='' && inputstatut.value!='') {
        let ajoutertache = JSON.parse(localStorage.getItem('cles'));
         tache ={
            index: ajoutertache.length? ajoutertache.length + 1: 1,
            date: inputdate.value,
            titre: inputtitre.value,
            categorie: inputcategorie.value,
            description: inputdescription.value,
            statut: inputstatut.value,
        }
   
        ajoutertache.push(tache);
        localStorage.setItem('cles',JSON.stringify(ajoutertache));

        if(inputstatut.value !==''){
            affichgraph()
        }
        // remettre les input vide
        inputdate.value          = "";
        inputtitre.value         = "";
        inputcategorie.value     = "";
        inputdescription.value   = "";
        inputstatut.value        = "";
        // inserer les linge dans le DOM
        insertline();
        // afficher la notification d'ajout
        notification.style.display = 'block'
        notification.firstElementChild.style.backgroundColor ="#609DA0"
        notification.firstElementChild.textContent = "Ajout de la tâche"
        notification.lastElementChild.textContent = "Tâche enregistrer avec succès"
        setTimeout(() => {
            notification.style.display = 'none'
          }, 3000);
          
        chart()
    }
    else{
        // afficher la notification remplir les champs
        notification.style.display = 'block'
        console.log(notification.firstElementChild);
        notification.firstElementChild.style.backgroundColor ="red"
        notification.firstElementChild.textContent = "Invalid"
        notification.lastElementChild.textContent = "Veuillez remplir les champs"
        setTimeout(() => {
            notification.style.display = 'none'
          }, 3000);
    }
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
        labels: ['Terminer', 'Nouveau', 'Encours'],
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



updateTach()