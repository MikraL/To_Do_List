var textPara = document.getElementById('para');
var select = document.getElementById('select');
var selectValue = "travail";
var listAdd = document.getElementById('content');

function suppressionTxt() {
    textPara.value ="";
}

function switchValue() {
    selectValue = select.options[ select.selectedIndex ].value;
}
document.getElementById('para').addEventListener("keydown", function(e){

    if(e.key === 'Enter') {
        ajout();
    }
})
function ajout() {
    if (textPara.value !== ""){
        var txtValue = textPara.value;
        suppressionTxt();
        //child
        var newLi = document.createElement('li');
        newLi.classList.add('child', 'draggable');
        listAdd.appendChild(newLi);
        newLi.addEventListener('mousedown', (e) => {
            mouseDownHandler(e);
        });
        //paragraphe
        var newPara = document.createElement('input');
        newPara.classList.add('myInput');
    
        newPara.setAttribute('readonly', 'readonly');
        newPara.value = txtValue;
        newLi.appendChild(newPara);
        //type
        var newType = document.createElement('span');
        newType.textContent = selectValue;
        newLi.appendChild(newType);
        //button delete
        var newButton = document.createElement('button');
        newButton.classList.add('trash');
        newButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>';
        newButton.addEventListener('click',function() {
            newLi.remove();
        } )
        newLi.appendChild(newButton);
        //modify
        var newModify = document.createElement('button');
        newModify.classList.add('trash');
        newModify.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>';
        newModify.addEventListener('click', function() {
            newPara.toggleAttribute('readonly');
            newModify.classList.toggle('buttonModify');
        });

        newLi.appendChild(newModify);
                //checkbox
                var newCheckBox = document.createElement('input');
                newCheckBox.classList.add('check');
                newCheckBox.setAttribute("type", "checkbox");
                newCheckBox.addEventListener('change', function() {
                    newLi.classList.toggle('valider')
                })
        
                newLi.appendChild(newCheckBox);
    }
}

//BONUS
var input = document.getElementById('searchbar');

function searchbar() {
    if (listAdd.getElementsByTagName('li').length > 0) {
        var wordChar = input.value;
        var wordLi = listAdd.getElementsByTagName('li');
        for (let i = 0; i < wordLi.length; i++) {
            var index = wordLi[i].children[0].value.indexOf(wordChar);
            if(index == -1){
                wordLi[i].style.display = "none"; 
            }
            else {
                wordLi[i].style.display = "flex";
            }
            var selectType = document.getElementById('selectSearch').options[ document.getElementById('selectSearch').selectedIndex ].value;
            var selectElem = wordLi[i].querySelector('span').textContent;
            console.log(selectType);
    
            if (selectType !== selectElem && selectType !== 'tout') {
                wordLi[i].style.display = 'none';
                console.log(selectElem);
            }
        }
    }

}


// The current dragging item
let elementMoove;
let elementTemporaire;
let isDraggingStarted = false;
// The current position of mouse relative to the dragging element
let x = 0;
let y = 0;

const mouseDownHandler = function (e) {
    elementMoove = e.target;
    while (elementMoove.localName != 'li')
        elementMoove = elementMoove.parentNode;
    // while (elementMoove.localName != 'li')
    //     elementMoove = elementMoove.parentNode;

    // Calculate the mouse position
    const rect = elementMoove.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {

    const draggingRect = elementMoove.getBoundingClientRect();

    if (!isDraggingStarted) {
        // Update the flag
        isDraggingStarted = true;

        // Let the elementTemporaire take the height of dragging element
        // So the next element won't move up
        elementTemporaire = document.createElement('li');
        elementTemporaire.classList.add('elementTemporaire');
        elementMoove.parentNode.insertBefore(
            elementTemporaire,
            elementMoove.nextSibling
        );

        // Set the elementTemporaire's height
        elementTemporaire.style.height = `${draggingRect.height}px`;
    }

    // Set position for dragging element
    elementMoove.style.position = 'absolute';
    elementMoove.style.top = `${e.pageY - y}px`;
    elementMoove.style.left = `${e.pageX - x}px`;
    const prevEle = elementMoove.previousElementSibling;
    const nextEle = elementTemporaire.nextElementSibling;

    if (prevEle && isAbove(elementMoove, prevEle)) {
        // The current order    -> The new order
        // prevEle              -> elementTemporaire
        // elementMoove          -> elementMoove
        // elementTemporaire          -> prevEle
        swap(elementTemporaire, elementMoove);
        swap(elementTemporaire, prevEle);
        return;
    }
    if (nextEle && isAbove(nextEle, elementMoove)) {
        // The current order    -> The new order
        // elementMoove          -> nextEle
        // elementTemporaire          -> elementTemporaire
        // nextEle              -> elementMoove
        swap(nextEle, elementTemporaire);
        swap(nextEle, elementMoove);
    }
};

const mouseUpHandler = function () {

        // Remove the elementTemporaire
        elementTemporaire.remove();
        // Reset the flag
        isDraggingStarted = false;
    // Remove the position styles
    elementMoove.style.removeProperty('top');
    elementMoove.style.removeProperty('left');
    elementMoove.style.removeProperty('position');

    x = null;
    y = null;
    elementMoove = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

// Query the list element
const list = document.getElementById('content');

// list.addEventListener('mousedown', mouseDownHandler);

// Query all items
// [].slice.call(list.querySelectorAll('.draggable')).forEach(function (item) {
//     item.addEventListener('mousedown', mouseDownHandler);
// });

const isAbove = function (nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};
