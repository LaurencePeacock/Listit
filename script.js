let newListInput = document.getElementById('new-list');
let submit = document.getElementById('submit');
let wrapper = document.getElementById('wrapper');

const audio = new Audio();
audio.src = "./ListIt Assets/complete.mp3";
audio.preload = "auto";

let listsArray = [];

//we take the string from the input field and create a new list object
//it has an id of a number from the length of the ListsArray
//it has an id, title and items property
//items is an empty array
//we can access that array by going into ListsArray at the right index, taken from the id
//we generate ids for the individual items by taking it from the length of the items array
//so we need two classes: Lists and Items

class List {
    constructor(string){
        this.id = `List${listsArray.length+1}`;
        this.title = string;
        this.items = [];
    }
}

class Item {
    constructor(string){
        this.id = `item${listsArray.at(-1).id}`
        this.string = string;
    }
}

const makeAndPushNewList = () => {
     if(newListInput.value === ""){
         console.log('nada');
         return false
     } 
    listsArray.push(new List(newListInput.value));
    console.log(newListInput.value);
    //console.log(listsArray[0]);
    //create div warpper class
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('list-wrapper');

    //create new div for list
    let listDiv = document.createElement('div');
    listDiv.id = listsArray.at(-1).id;
    //create header title for Div
    let h3 = document.createElement('h3');
    let h3TextNode = document.createTextNode(listsArray.at(-1).title)
    h3.appendChild(h3TextNode);
    //append header to div
    listDiv.appendChild(h3);
    //create input field for list
    //label
    let listInputLabel = document.createElement('LABEL');
    listInputLabel.setAttribute("for", "listInput");

    //listInputLabel.innerText = "Add Todo";
    //input
    let listInput = document.createElement('INPUT');
    listInput.setAttribute("type", "text");
    let placeholder = "list it";
    listInput.placeholder = placeholder;
    listInput.id = `input${listsArray.at(-1).id}`
    listDiv.append(listInputLabel);
    listDiv.append(listInput);
    //div for items
    let divItems = document.createElement('div');
    divItems.id = `input${listsArray.at(-1).id}divItems`;
    listDiv.append(divItems);
    
   
    //append archive section under and set to dispaly none
    let archiveDiv = document.createElement('div');
    archiveDiv.style.display = "none";
    archiveDiv.classList.add('archive');
    listDiv.append(archiveDiv);
    wrapperDiv.appendChild(listDiv);
     //append div to page
     wrapper.append(wrapperDiv);
    newListInput.value = "";
     
}

function checkBoxFunction (e){
    //PLAY  audio 
    audio.play();
    //find new item from checkbox
    let current = e.path[1];
    let parent = current.parentElement;
    parent.removeChild(current);
    //find list div to check Archive state
    let grandparent = parent.parentElement;
    let greatGrandparent = grandparent.parentElement;
    let child = greatGrandparent.children;

    if(child[4].style.display == 'none'){
        child[4].style.display = 'block'
        
    }
    //check if archive is set to none
    let archiveItem = parent;
    let archiveDiv = child[4];
    archiveItem.style.color = "rgb(0,20,13)";
    archiveItem.style.textDecoration = 'line-through'
    archiveItem.style.opacity = '0.6';
    archiveDiv.append(archiveItem);
}

function addToDoItem (e){
    
    if(e.target.type=='text'){
    let inputValue = e.target.value;
    let inputId = e.target.id;

    
    
    let newItem = document.createElement('p');
    //newItem.style.display = 'inline';
    let textNode = document.createTextNode(inputValue);
    newItem.appendChild(textNode);
    
   
    
    //add checkbox
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.addEventListener('change', checkBoxFunction)
    //checkBox.id = toDoArray.length;
    //add span
    let span = document.createElement('span');
    span.append(checkBox);
    //add span to item
    newItem.appendChild(span);
   
    let targetDiv = document.getElementById(`${inputId}divItems`);
    targetDiv.appendChild(newItem);


    //reset input field
    e.target.value = "";
    }
}

submit.addEventListener('click', makeAndPushNewList)

wrapper.addEventListener('change', addToDoItem)

