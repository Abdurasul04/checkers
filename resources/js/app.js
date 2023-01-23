const selectedColor = "rgb(22, 94, 78)"
const hoverColor = "rgb(163, 30, 30)"

//Helpers
function getBackgroundColorColorOfPlaceById(a, b) { return document.getElementById(`place-${a}-${b}`).style.background }
function isBackgroundColorOfPlaceById(a, b, color) { return document.getElementById(`place-${a}-${b}`).style.background === color }
function setBackgroundColorOfPlaceById(a, b, color) { document.getElementById(`place-${a}-${b}`).style.background = color }
function getBackgroundColorColorOfItemById(a, b) { return document.getElementById(`item-${a}-${b}`).style.background }
function isBackgroundColorOfItemById(a, b, color) { return document.getElementById(`item-${a}-${b}`).style.background === color }
function setBackgroundColorOfItemById(a, b, color) { document.getElementById(`item-${a}-${b}`).style.background = color }
function isItemHere(a, b) { return document.getElementById(`item-${a}-${b}`) != null }
function getItemClasses(a, b) { return document.getElementById(`item-${a}-${b}`).classList }
function putItemToPlace(a, b) { document.getElementById(`place-${a}-${b}`).innerHTML = `<div class="item" id="item-${a}-${b}"></div>`; }
function cutItem(a, b) { document.getElementById(`item-${a}-${b}`).remove() }
function scoreUpdate() {
    document.getElementById('score_mine').innerHTML = (12 - document.querySelectorAll('.enemy').length);
    document.getElementById('score_enemy').innerHTML = (12 - document.querySelectorAll('.mine').length);
}
function checkIfPlayerCanTakeAFigurine(j, i, r, c){
    return (
        (c + 2 === i || c - 2 === i) && (r + 2 === j || r - 2 === j) && isItemHere((j+r)/2, (i+c)/2) && 
        (
            ((getItemClasses(r, c)[1] == 'mine') && (getItemClasses((j+r)/2, (i+c)/2)[1] == 'enemy'))
            ||
            ((getItemClasses(r, c)[1] == 'enemy') && (getItemClasses((j+r)/2, (i+c)/2)[1] == 'mine'))
        )
    )
}
//App
window.itemSelect = function(j, i) {
    console.log("it works!", j, i);
    if (isItemHere(j, i)){
        for (let r = 1; r < 9; r++) {
            for (let c = 1; c < 9; c++) {
                if (isBackgroundColorOfPlaceById(r, c, selectedColor)) setBackgroundColorOfPlaceById(r, c, "black")
            }
        }
        setBackgroundColorOfPlaceById(j, i, selectedColor)
    }
}

window.mover = function(j, i) {
    if ((j+i)%2===0 && !isBackgroundColorOfPlaceById(j, i, selectedColor)) setBackgroundColorOfPlaceById(j, i, hoverColor)
}

window.mout = function(j, i) {
    if ((j+i)%2===0 && !isBackgroundColorOfPlaceById(j, i, selectedColor)) setBackgroundColorOfPlaceById(j, i, "black")
}

window.moveItem = function(j, i) {
    if ((j+i) % 2 === 0 && !isItemHere(j, i)) { //Двигатся монут только в черных зонах и на свободные клетки
        for (let r = 1; r < 9; r++) { //Перебираем ряды
            for (let c = 1; c < 9; c++) { //перебираем колонны
                if (!isBackgroundColorOfPlaceById(r, c, selectedColor)) continue
                else if
                (
                    (c + 1 === i || c - 1 === i) && 
                    (((getItemClasses(r, c)[1] == 'mine') && (r - 1 == j)) || ((getItemClasses(r, c)[1] == 'enemy') && (r + 1 == j)))
                )
                {
                    putItemToPlace(j, i);
                    (getItemClasses(r, c)[1] == 'mine') ? getItemClasses(j, i).add('mine') : getItemClasses(j, i).add('enemy')
                    document.getElementById("place-" + r + "-" + c).style.pointerEvents = 'auto'
                    setBackgroundColorOfPlaceById(r, c, "black")
                    cutItem(r, c);
                    queue()
                }
                else if(checkIfPlayerCanTakeAFigurine(j, i, r, c))
                {
                    putItemToPlace(j, i);
                    (getItemClasses(r, c)[1] == 'mine') ? getItemClasses(j, i).add('mine') : getItemClasses(j, i).add('enemy')
                    setBackgroundColorOfPlaceById(r, c, "black")
                    document.getElementById(`place-${r}-${c}`).style.pointerEvents = 'auto'
                    document.getElementById(`place-${(j+r)/2}-${(i+c)/2}`).style.pointerEvents = 'auto'
                    cutItem(r, c);
                    cutItem((j+r)/2, (i+c)/2);
                    scoreUpdate();
                    queue()
                }
            }
        }
    }
}

var turn = prompt("choose first starting side (mine or enemy)", "mine");
(turn == 'mine') ? turn = 'enemy' : turn = 'mine';
document.querySelectorAll(`.${turn}`).forEach(el => el.parentElement.style.pointerEvents = 'none');
(turn == 'mine') ? turn = 'enemy' : turn = 'mine';

window.queue = function() {
    console.log("disabling");
    document.querySelectorAll(`.${turn}`).forEach(el => el.parentElement.style.pointerEvents = 'none');
    (turn == 'mine') ? turn = 'enemy' : turn = 'mine';
    document.querySelectorAll(`.${turn}`).forEach(el => el.parentElement.style.pointerEvents = 'auto');
}

window.step = function() {
    //
}