let inputs = document.getElementById('manyInputs');

const changeFunc = (e) =>{
    console.log(e.target.value);
    console.log(e.target.id);
    
    let id = e.target.id;
    let item = document.createElement('p');
    let string = document.createTextNode(e.target.value);
    console.log(string);
    item.appendChild(string);
    let div = document.getElementById(`div${id}`);
    div.append(item);

    e.target.value = "";


}

inputs.addEventListener('change',changeFunc)