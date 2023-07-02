const tile = "tile";
const tileW = "tileW";
const tileHP = 'tileHP';
const tileSW = 'tileSW';
const tileE = 'tileE'
const tileP = 'tileP';
const halfHP = 'halfHP';
var fields = document.getElementsByTagName("td");
const probability = 0.5;

var numberOfRows = 24;
var numberOfColumns = 40;

var coordSystem = new Array(numberOfRows);

var index = 0;

var userPosition = {};
var maxHealth = 100;
var healthBar = 100;

var maxSwordStrength = 5;
var swordStrength = 0;

var enemies;
var enemyPosition;


const coordSystemInit = () => {
    for (var row = 0; row < numberOfRows; row++) {
        coordSystem[row] = new Array(numberOfColumns);
        for (var col = 0; col < numberOfColumns; col++) {
            coordSystem[row][col] = fields[index];
            index++;
        }
    }
}

const wallInit = () => {
    for (let i = 0; i < fields.length; i++) {
        let td = fields[i];
        td.classList.add(tileW);
    }
}

const roomsInit = () => {
    const randomRoomCount = Math.floor(Math.random() * 6) + 5;
    let flag = true;
    for (let i = 0; i < randomRoomCount; i++) {
        let RoomWidth = Math.floor(Math.random() * 6) + 3;
        let RoomHeigth = Math.floor(Math.random() * 6) + 3;
        while (flag) {
            let randomRowIndex = Math.floor(Math.random() * coordSystem.length);
            let randomColumnIndex = Math.floor(Math.random() * coordSystem[0].length);
            if (randomRowIndex + RoomHeigth < numberOfRows && randomColumnIndex + RoomWidth < numberOfColumns) {
                flag = false;
                for (let row = randomRowIndex; row < (RoomHeigth + randomRowIndex); row++) {
                    for (let col = randomColumnIndex; col < (RoomWidth + randomColumnIndex); col++) {
                        coordSystem[row][col].classList.remove(tileW);
                        coordSystem[row][col].classList.add(tile);
                    }
                }
            }
        }
        flag = true;
    }
}

const trailsInit = () => {
    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 40);
        for (let i = 0; i < numberOfRows; i++) {
            if (coordSystem[i][randomNumber].classList.contains(tileW)) {
                coordSystem[i][randomNumber].classList.remove(tileW);
                coordSystem[i][randomNumber].classList.add(tile);
            }
            else coordSystem[i][randomNumber].classList.add(tile);
        }
    }
    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 24);
        for (let i = 0; i < numberOfColumns; i++) {
            if (coordSystem[randomNumber][i].classList.contains(tileW)) {
                coordSystem[randomNumber][i].classList.remove(tileW);
                coordSystem[randomNumber][i].classList.add(tile);
            }
            else coordSystem[randomNumber][i].classList.add(tile);
        }
    }
}

const itemsInit = () => {
    let freeCells;
    const HPCount = 10;
    const swordCount = 2;
    const enemyCount = 10;
    for (let i = 0; i < HPCount; i++) {
        freeCells = document.querySelectorAll(`.${tile}`);
        const randomNumber = Math.floor(Math.random() * freeCells.length);
        freeCells[randomNumber].classList.remove(tile);
        freeCells[randomNumber].classList.add(tileHP);
    }
    for (let i = 0; i < swordCount; i++) {
        freeCells = document.querySelectorAll(`.${tile}`);
        const randomNumber = Math.floor(Math.random() * freeCells.length);
        freeCells[randomNumber].classList.remove(tile);
        freeCells[randomNumber].classList.add(tileSW);
    }
    for (let i = 0; i < enemyCount; i++) {
        freeCells = document.querySelectorAll(`.${tile}`);
        const randomNumber = Math.floor(Math.random() * freeCells.length);
        freeCells[randomNumber].classList.remove(tile);
        freeCells[randomNumber].classList.add(tileE);
    }
    playerInit();
}

const playerInit = () => {
    freeCells = document.querySelectorAll(`.${tile}`);
    const randomNumber = Math.floor(Math.random() * freeCells.length);
    freeCells[randomNumber].classList.remove(tile);
    freeCells[randomNumber].classList.add(tileP);
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0; x < numberOfColumns; x++) {
            if (coordSystem[y][x].classList.contains(tileP)) {
                userPosition = {
                    y,
                    x
                }
            }
        }
    }
    document.getElementById('health').style.width = `${healthBar}%`;
    document.getElementById('health').style.height = '100%';
}

const gameInit = () => {
    coordSystemInit();
    wallInit();
    roomsInit();
    trailsInit();
    itemsInit();
}


document.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.key === "W" || event.key === "ц" || event.key === "Ц") {
        if (coordSystem[userPosition.y - 1][userPosition.x].classList.contains(tileHP)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y - 1][userPosition.x].classList.remove(tileHP)
            coordSystem[userPosition.y - 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y - 1;
            if (healthBar < maxHealth) {
                healthBar += 25;
                document.getElementById('health').style.width = `${healthBar}%`;
            }
            return 0;
        }
        if (coordSystem[userPosition.y - 1][userPosition.x].classList.contains(tile)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y - 1][userPosition.x].classList.remove(tile)
            coordSystem[userPosition.y - 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y - 1;
            return 0;
        }
        if (coordSystem[userPosition.y - 1][userPosition.x].classList.contains(tileSW)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y - 1][userPosition.x].classList.remove(tileSW)
            coordSystem[userPosition.y - 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y - 1;
            document.getElementById('inventory__title').innerText = "У вас есть меч";
            document.getElementById('inventory__strength').innerText = "Прочность меча";
            document.getElementById('strength-scale').style.border = '1px solid #fff';
            document.getElementById('strength').style.width = `${maxSwordStrength * 20}%`
            document.getElementById('strength').style.height = '100%';
            swordStrength = maxSwordStrength;

            return 0;
        }

    } else if (event.key === "a" || event.key === "A" || event.key === "ф" || event.key === "Ф") {
        if (coordSystem[userPosition.y][userPosition.x - 1].classList.contains(tile)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x - 1].classList.remove(tile)
            coordSystem[userPosition.y][userPosition.x - 1].classList.add(tileP)
            userPosition.x = userPosition.x - 1;
            return 0;
        }
        if (coordSystem[userPosition.y][userPosition.x - 1].classList.contains(tileHP)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x - 1].classList.remove(tileHP)
            coordSystem[userPosition.y][userPosition.x - 1].classList.add(tileP)
            userPosition.x = userPosition.x - 1;
            if (healthBar < maxHealth) {
                healthBar += 25;
                document.getElementById('health').style.width = `${healthBar}%`;
            }
            return 0;
        }
        if (coordSystem[userPosition.y][userPosition.x - 1].classList.contains(tileSW)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x - 1].classList.remove(tileSW)
            coordSystem[userPosition.y][userPosition.x - 1].classList.add(tileP)
            userPosition.x = userPosition.x - 1;
            document.getElementById('inventory__title').innerText = "У вас есть меч"
            document.getElementById('inventory__strength').innerText = "Прочность меча"
            document.getElementById('strength-scale').style.border = '1px solid #fff';
            document.getElementById('strength').style.width = `${maxSwordStrength * 20}%`
            document.getElementById('strength').style.height = '100%';
            swordStrength = maxSwordStrength;
            return 0;
        }
    } else if (event.key === "s" || event.key === "S" || event.key === "ы" || event.key === "Ы") {
        if (coordSystem[userPosition.y + 1][userPosition.x].classList.contains(tile)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y + 1][userPosition.x].classList.remove(tile)
            coordSystem[userPosition.y + 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y + 1;
            return 0;
        }
        if (coordSystem[userPosition.y + 1][userPosition.x].classList.contains(tileHP)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y + 1][userPosition.x].classList.remove(tileHP)
            coordSystem[userPosition.y + 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y + 1;
            if (healthBar < maxHealth) {
                healthBar += 25;
                document.getElementById('health').style.width = `${healthBar}%`;
            }
            return 0;
        }
        if (coordSystem[userPosition.y + 1][userPosition.x].classList.contains(tileSW)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y + 1][userPosition.x].classList.remove(tileSW)
            coordSystem[userPosition.y + 1][userPosition.x].classList.add(tileP)
            userPosition.y = userPosition.y + 1;
            document.getElementById('inventory__title').innerText = "У вас есть меч"
            document.getElementById('inventory__strength').innerText = "Прочность меча"
            document.getElementById('strength-scale').style.border = '1px solid #fff';
            document.getElementById('strength').style.width = `${maxSwordStrength * 20}%`
            document.getElementById('strength').style.height = '100%';
            swordStrength = maxSwordStrength;
            return 0;
        }
    } else if (event.key === "d" || event.key === "D" || event.key === "в" || event.key === "В") {
        if (coordSystem[userPosition.y][userPosition.x + 1].classList.contains(tile)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x + 1].classList.remove(tile)
            coordSystem[userPosition.y][userPosition.x + 1].classList.add(tileP)
            userPosition.x = userPosition.x + 1;
            return 0;
        }
        if (coordSystem[userPosition.y][userPosition.x + 1].classList.contains(tileHP)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x + 1].classList.remove(tileHP)
            coordSystem[userPosition.y][userPosition.x + 1].classList.add(tileP)
            userPosition.x = userPosition.x + 1;
            if (healthBar < maxHealth) {
                healthBar += 25;
                document.getElementById('health').style.width = `${healthBar}%`;
            }
            return 0;
        }
        if (coordSystem[userPosition.y][userPosition.x + 1].classList.contains(tileSW)) {
            coordSystem[userPosition.y][userPosition.x].classList.remove(tileP);
            coordSystem[userPosition.y][userPosition.x].classList.add(tile);
            coordSystem[userPosition.y][userPosition.x + 1].classList.remove(tileSW)
            coordSystem[userPosition.y][userPosition.x + 1].classList.add(tileP)
            userPosition.x = userPosition.x + 1;
            document.getElementById('inventory__title').innerText = "У вас есть меч"
            document.getElementById('inventory__strength').innerText = "Прочность меча"
            document.getElementById('strength-scale').style.border = '1px solid #fff';
            document.getElementById('strength').style.width = `${maxSwordStrength * 20}%`
            document.getElementById('strength').style.height = '100%';
            swordStrength = maxSwordStrength;
            return 0;
        }
    } else if (event.key = "Space") {
        if (swordStrength) {
            if (userPosition.y - 1 >= 0 && userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y - 1][userPosition.x - 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y - 1][userPosition.x - 1].classList.remove(tileE);
                    coordSystem[userPosition.y - 1][userPosition.x - 1].classList.add(tile);
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.y - 1 >= 0) {
                if (coordSystem[userPosition.y - 1][userPosition.x].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y - 1][userPosition.x].classList.remove(tileE);
                    coordSystem[userPosition.y - 1][userPosition.x].classList.add(tile);
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.y - 1 >= 0 && userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y - 1][userPosition.x + 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y - 1][userPosition.x + 1].classList.remove(tileE);
                    coordSystem[userPosition.y - 1][userPosition.x + 1].classList.add(tile);
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y][userPosition.x - 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y][userPosition.x - 1].classList.remove(tileE);
                    coordSystem[userPosition.y][userPosition.x - 1].classList.add(tile);
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y][userPosition.x + 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y][userPosition.x + 1].classList.remove(tileE);
                    coordSystem[userPosition.y][userPosition.x + 1].classList.add(tile);
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows && userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y + 1][userPosition.x - 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y + 1][userPosition.x - 1].classList.remove(tileE);
                    coordSystem[userPosition.y + 1][userPosition.x - 1].classList.add(tile)
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия  (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows) {
                if (coordSystem[userPosition.y + 1][userPosition.x].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y + 1][userPosition.x].classList.remove(tileE);
                    coordSystem[userPosition.y + 1][userPosition.x].classList.add(tile)
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия (Необходимо два удара для убийства врага)"
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows && userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y + 1][userPosition.x + 1].classList.contains(tileE)) {
                    swordStrength--;
                    coordSystem[userPosition.y + 1][userPosition.x + 1].classList.remove(tileE);
                    coordSystem[userPosition.y + 1][userPosition.x + 1].classList.add(tile)
                    if (swordStrength) {
                        document.getElementById('strength').style.width = `${swordStrength * 20}%`
                    }
                    else {
                        document.getElementById('strength').style.height = '0';
                        document.getElementById('inventory__title').innerText = "У вас нет оружия (Необходимо два удара для убийства врага)" 
                        document.getElementById('inventory__strength').innerText = ""
                    }
                }
            }

        }
        else {
            if (userPosition.y - 1 >= 0 && userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y - 1][userPosition.x - 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y - 1][userPosition.x - 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y - 1][userPosition.x - 1].classList.remove(tileE);
                        coordSystem[userPosition.y - 1][userPosition.x - 1].classList.remove(halfHP);
                        coordSystem[userPosition.y - 1][userPosition.x - 1].classList.add(tile);
                    }
                    else coordSystem[userPosition.y - 1][userPosition.x - 1].classList.add(halfHP);
                }
            }
            if (userPosition.y - 1 >= 0) {
                if (coordSystem[userPosition.y - 1][userPosition.x].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y - 1][userPosition.x].classList.contains(halfHP)){
                        coordSystem[userPosition.y - 1][userPosition.x].classList.remove(tileE);
                        coordSystem[userPosition.y - 1][userPosition.x].classList.remove(halfHP);
                        coordSystem[userPosition.y - 1][userPosition.x].classList.add(tile);
                    }
                    else coordSystem[userPosition.y - 1][userPosition.x].classList.add(halfHP);
                }
            }
            if (userPosition.y - 1 >= 0 && userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y - 1][userPosition.x + 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y - 1][userPosition.x + 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y - 1][userPosition.x + 1].classList.remove(tileE);
                        coordSystem[userPosition.y - 1][userPosition.x + 1].classList.remove(halfHP);
                        coordSystem[userPosition.y - 1][userPosition.x + 1].classList.add(tile);
                    }
                    else{
                        coordSystem[userPosition.y - 1][userPosition.x + 1].classList.add(halfHP);
                    }
                }
            }
            if (userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y][userPosition.x - 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y][userPosition.x - 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y][userPosition.x - 1].classList.remove(tileE);
                        coordSystem[userPosition.y][userPosition.x - 1].classList.remove(halfHP);
                        coordSystem[userPosition.y][userPosition.x - 1].classList.add(tile);
                    } else{
                        coordSystem[userPosition.y][userPosition.x - 1].classList.add(halfHP);
                    }
                }
            }
            if (userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y][userPosition.x + 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y][userPosition.x + 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y][userPosition.x + 1].classList.remove(tileE);
                        coordSystem[userPosition.y][userPosition.x + 1].classList.remove(halfHP);
                        coordSystem[userPosition.y][userPosition.x + 1].classList.add(tile);
                    }
                    else{
                        coordSystem[userPosition.y][userPosition.x + 1].classList.add(halfHP);
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows && userPosition.x - 1 >= 0) {
                if (coordSystem[userPosition.y + 1][userPosition.x - 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y + 1][userPosition.x - 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y + 1][userPosition.x - 1].classList.remove(tileE);
                        coordSystem[userPosition.y + 1][userPosition.x - 1].classList.remove(halfHP);
                        coordSystem[userPosition.y + 1][userPosition.x - 1].classList.add(tile);
                    }
                    else{
                        coordSystem[userPosition.y + 1][userPosition.x - 1].classList.add(halfHP);
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows) {
                if (coordSystem[userPosition.y + 1][userPosition.x].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y + 1][userPosition.x].classList.contains(halfHP)){
                        coordSystem[userPosition.y + 1][userPosition.x].classList.remove(tileE);
                        coordSystem[userPosition.y + 1][userPosition.x].classList.remove(halfHP);
                        coordSystem[userPosition.y + 1][userPosition.x].classList.add(tile)
                    }
                    else{
                        coordSystem[userPosition.y + 1][userPosition.x].classList.add(halfHP)
                    }
                }
            }
            if (userPosition.y + 1 < numberOfRows && userPosition.x + 1 < numberOfColumns) {
                if (coordSystem[userPosition.y + 1][userPosition.x + 1].classList.contains(tileE)) {
                    if(coordSystem[userPosition.y + 1][userPosition.x + 1].classList.contains(halfHP)){
                        coordSystem[userPosition.y + 1][userPosition.x + 1].classList.remove(tileE);
                        coordSystem[userPosition.y + 1][userPosition.x + 1].classList.remove(halfHP);
                        coordSystem[userPosition.y + 1][userPosition.x + 1].classList.add(tile)
                    }
                    else{
                        coordSystem[userPosition.y + 1][userPosition.x + 1].classList.add(halfHP)
                    }
                }
            }
        }
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const enemysActions = () => {
        var randomNumber = Math.floor(Math.random() * 5);
        switch (randomNumber) {
            case 1:
                if (coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.contains(tile)) {
                    if (coordSystem[enemyPosition.y][enemyPosition.x].classList.contains(halfHP)) {
                        coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.remove(tile);
                        coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.add(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }
                    else{
                        coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.remove(tile);
                        coordSystem[enemyPosition.y][enemyPosition.x - 1].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }

                }
                else {
                    enemysActions();
                }
                break;
            case 2:
                if (coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.contains(tile)) {
                    if(coordSystem[enemyPosition.y][enemyPosition.x].classList.contains(halfHP)){
                        coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.remove(tile);
                        coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.add(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }else{
                        coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.remove(tile);
                        coordSystem[enemyPosition.y][enemyPosition.x + 1].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }
                }
                else {
                    enemysActions();
                }
                break;
            case 3:
                if (coordSystem[enemyPosition.y - 1][enemyPosition.x].classList.contains(tile)) {
                    if(coordSystem[enemyPosition.y][enemyPosition.x].classList.contains(halfHP)){
                        oordSystem[enemyPosition.y - 1][enemyPosition.x].classList.remove(tile);
                        coordSystem[enemyPosition.y - 1][enemyPosition.x].classList.add(tileE);
                        coordSystem[enemyPosition.y - 1][enemyPosition.x].classList.add(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }else{
                        coordSystem[enemyPosition.y - 1][enemyPosition.x].classList.remove(tile);
                        coordSystem[enemyPosition.y - 1][enemyPosition.x].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }
                }
                else {
                    enemysActions();
                }
                break;
            case 4:
                if (coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.contains(tile)) {
                    if(coordSystem[enemyPosition.y][enemyPosition.x].classList.contains(halfHP)){
                        coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.remove(tile);
                        coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.add(tileE);
                        coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.add(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(halfHP);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }else{
                        coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.remove(tile);
                        coordSystem[enemyPosition.y + 1][enemyPosition.x].classList.add(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.remove(tileE);
                        coordSystem[enemyPosition.y][enemyPosition.x].classList.add(tile);
                    }
                }
                else {
                    enemysActions();
                }
                break;
            default:

        }
    }



    setInterval(() => {
        enemies = document.querySelectorAll(`.${tileE}`);
        if(enemies.length == 0){
            document.body.innerHTML = '<h1>Вы победили!<h1>';
            setTimeout(function() {
              location.reload();
            }, 2000);
        }
        for (let i = 0; i < enemies.length; i++) {
            for (let y = 0; y < numberOfRows; y++) {
                for (let x = 0; x < numberOfColumns; x++) {
                    if (coordSystem[y][x] == enemies[i]) {
                        enemyPosition = {
                            y,
                            x,

                        }
                    }
                }
            }
            let action = false;
            debugger
            if(enemyPosition.y - 1 >= 0 && enemyPosition.x - 1 >= 0){
                if(coordSystem[enemyPosition.y - 1][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.y - 1 >= 0){
                if(coordSystem[enemyPosition.y - 1][enemyPosition.x] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.x + 1 < numberOfColumns && enemyPosition.y - 1 >= 0){
                if(coordSystem[enemyPosition.y - 1][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if( enemyPosition.x - 1 >= 0){
                if(coordSystem[enemyPosition.y][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.x + 1 < numberOfColumns){
                if(coordSystem[enemyPosition.y][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.y + 1 < numberOfRows && enemyPosition.x - 1 >= 0){
                if(coordSystem[enemyPosition.y + 1][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.y + 1 < numberOfRows){
                if(coordSystem[enemyPosition.y + 1][enemyPosition.x] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            if(enemyPosition.y + 1 < numberOfRows && enemyPosition.x + 1 < numberOfColumns){
                if(coordSystem[enemyPosition.y + 1][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x]){
                    healthBar -= 25;
                    document.getElementById('health').style.width = `${healthBar}%`;
                    if(healthBar == 0){
                        document.body.innerHTML = '<h1 class="tileE">Вы проиграли((((<h1>';
                        setTimeout(function() {
                          location.reload();
                        }, 2000);
                    }
                    action = true;
                }
            }
            // if (enemyPosition.y + 1 < numberOfRows && enemyPosition.x + 1 < numberOfColumns && enemyPosition.y - 1 > 0 && enemyPosition.x - 1 > 0) {
            //     if ((coordSystem[enemyPosition.y - 1][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y - 1][enemyPosition.x] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y - 1][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y + 1][enemyPosition.x - 1] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y + 1][enemyPosition.x] == coordSystem[userPosition.y][userPosition.x]
            //         || coordSystem[enemyPosition.y + 1][enemyPosition.x + 1] == coordSystem[userPosition.y][userPosition.x])) {
            //         healthBar -= 25;
            //         document.getElementById('health').style.width = `${healthBar}%`;
            //         action = true;
            //     }
            // }
            if (!action) {
                console.log(enemyPosition.number);
                enemysActions();
            }
            action = false;
            console.log(enemyPosition.y + "    " + enemyPosition.x);
        }
    }, 1000)
})

function Game() {
    this.init = gameInit;
}