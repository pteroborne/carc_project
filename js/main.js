// Create a weapon class
// Fetch data from http://rpg-api.com/weapons - there's conveniently 25 objects
// Make that data objects of the class
// Add objects to an array, and duplicate for filtering
// Show the filtered list
// new objects are pushed to both lists
// filtered list can reset to master
// Cards flip to show stats on the back
// Scales fine on mobile and desktop displays
// Referenced w3schools, MDN, Bootstrap 5 documentation, and the provided CodePens for the card flip



class Weapon {
  constructor(attack, description, imageUrl, name, ranged, twoHanded) {
    this.description = description;
    this.imageUrl = imageUrl;
    this.name = name;
    this.ranged = ranged;
    this.twoHanded = twoHanded;
    this.attack = attack;
  }
}

let weaponList = [];
let filtered = []

function makeWeapon(data) {
  weaponList.push(new Weapon(data.attack, data.description, data.imageUrl, data.name, data.ranged, data.twoHanded));
}

fetch('http://rpg-api.com/weapons').then(response => response.json()).then(data => data.forEach(item => makeWeapon(item))).then(showAll);

function createCard(item) {
  let col = document.createElement('div');
  col.className = 'col flip-card';
  col.onclick = function () {
    flipCard(this)
  };
  let card_inner = document.createElement('div');
  card_inner.className = 'flip-card-inner';
  let card_front = document.createElement('div');
  card_front.className = 'flip-card-front card h100';
  let card_back = document.createElement('div');
  card_back.className = 'flip-card-back card h100';
  let image = document.createElement('img');
  image.src = item.imageUrl;
  image.className = 'card-img-top img-fluid';
  image.alt = 'image of ' + item.name;
  let front_body = document.createElement('div');
  front_body.className = 'card-body';
  let back_body = document.createElement('div');
  back_body.className = 'card-body align-middle';
  let title = document.createElement('h5');
  title.className = 'card-title';
  title.innerText = item.name;
  let description = document.createElement('p');
  description.className = 'card-text';
  description.innerText = item.description;
  let ranged = document.createElement('p');
  ranged.className = 'card-text';
  let twoHanded = document.createElement('p');
  twoHanded.className = 'card-text';
  let attack = document.createElement('p');
  attack.className = 'card-text';
  attack.innerText = 'Attack: ' + item.attack;

  if (item.ranged) {
    ranged.innerText = 'Ranged';
  } else {
    ranged.innerText = 'Melee';
  }

  if (item.twoHanded) {
    ranged.innerText = 'Two Handed';
  } else {
    ranged.innerText = 'Single Hand';
  }


  let main_doc = document.querySelector('#weapons');
  front_body.append(title);
  back_body.append(description, ranged, twoHanded, attack);
  card_front.append(image);
  card_front.append(front_body);
  card_back.append(back_body);
  card_inner.append(card_front, card_back);
  col.append(card_inner)
  main_doc.append(col);
}


function addWeapon(event) {
  event.preventDefault()
  console.log('running')
  let name = document.getElementsByName('name')[0].value;
  let description = document.getElementsByName('description')[0].value;
  let imageUrl = document.getElementsByName('imageUrl')[0].value;
  let attack = document.getElementsByName('attack')[0].value;
  let ranged = document.getElementsByName('ranged')[0].value;
  let twoHanded = document.getElementsByName('twoHanded')[0].value;
  let weapon = new Weapon(attack, description, imageUrl, name, ranged, twoHanded);
  createCard(weapon);
  weaponList.push(weapon);
  filtered.push(weapon)
  document.querySelectorAll('input').forEach(item => (item.value = ''));
}

document.addEventListener('submit', addWeapon)

function flipCard(card) {
  card.classList.toggle('is-flipped');
}

function sortAttack() {
  filtered.sort(function (a, b) {
      return a.attack - b.attack;
    }
  )
  showFiltered()
}

function sortName() {
  filtered.sort(function (a, b) {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    }
  )
  showFiltered()
}

function filterMelee() {
  filtered = filtered.filter(weapon => weapon.ranged === false);
  showFiltered()
}

function filterRanged() {
  filtered = filtered.filter(weapon => weapon.ranged === true);
  showFiltered()
}

function filterOne() {
  filtered = filtered.filter(weapon => weapon.twoHanded === false);
  showFiltered()
}

function filterTwo() {
  filtered = filtered.filter(weapon => weapon.twoHanded === true);
  showFiltered()
}

function showFiltered() {
  let list = document.getElementById('weapons');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  filtered.forEach((value) => createCard(value));
}

// Could add additional logic to this, maybe a switch, so that the lists didn't have to reset each time. Not going to.
function showAll() {
  filtered = weaponList;
  showFiltered()
}


console.log('Running Scripts')
