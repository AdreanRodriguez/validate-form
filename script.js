'use strict';

window.onload = initPage();

//  Deklarerar errorMsg för att kunna skriva ut felmeddelanden i funktionerna nedan.
// Nu ligger den globalt så jag kan använda den vart jag vill.
const errorMsg = document.querySelector(`#errorMsg`)

function initPage() {



  // Gömma #registerForm och #contentContainer.
  const registerFormRef = document.querySelector(`#registerForm`)
  registerFormRef.classList.add(`d-none`)

  const contentContainerRef = document.querySelector(`#contentContainer`)
  contentContainerRef.classList.add(`d-none`)

  // Lägga till lyssnare på knapparna i formuläret och agera utifrån användarens knapptryck.
  // Här lägger vi till en klass för att kunna kalla på knapparna nedan i eventlyssnaren.
  const logInBtnRef = loginForm.querySelector(`#loginBtn`)
  logInBtnRef.addEventListener(`click`, validateLogin);

  const registerBtnRef = loginForm.querySelector(`#registerBtn`)
  registerBtnRef.addEventListener(`click`, validateRegistration);

  // Deklarerar en klass på knappen innuti form elementet som har id #registerForm 
  // Lägger till en eventlyssnare på knappen som ska lyssna efter klick och köra funktionen validateRegistration
  const registerFormBtn = document.querySelector(`#registerForm button`)
  registerFormBtn.classList.add(`registerFormBtn`)
  registerFormBtn.addEventListener(`click`, validateRegistration)

}



// Utföra formulärvalidering på formuläret logga in.
function validateLogin(event) {
  event.preventDefault();

  // Måste ligga längst upp för att annars måste if satserna köras innan dokumäntet visas.
  // Tar bort klassen "d-none" för att kunna göra #registerForm synligt.
  const registerFormRef = document.querySelector(`#registerForm`)
  registerFormRef.classList.add(`d-none`)

  // Lägger till klassen "d-none" för att dölja #loginForm, alltså Login formuläret.
  const loginFormRef = document.querySelector(`#loginForm`)
  loginFormRef.classList.remove(`d-none`)

  errorMsg.textContent = ``

  const username = document.querySelector(`#username`).value; // JavaScript letar efter id #loginForm sedan input
  const password = document.querySelector(`#password`).value; // JavaScript letar efter id #loginForm sedan input

  const foundUser = users.find(user => user.username === username)

  try {

    if (username === `` || password === ``) { // Om username ELLER password är tomt så skrivs felmeddelandet under ut.
      throw {
        msg: `Du måste fylla i alla fält!`
      }
    } else {
      if (username !== foundUser.username) {
        throw {
          msg: `Användarnamnet finns inte`
        }
      }
      else {
        if (password !== foundUser.password) {
          throw {
            msg: `Fel lösenord`
          }
        }
        else {
          initContent(event)
        }
      }
    }
  } catch (error) {
    errorMsg.textContent = error.msg
  }
}



// Utföra formulärvalidering på formuläret registrera dig.
function validateRegistration(event) {
  event.preventDefault();

  // Måste ligga längst upp för att annars måste if satserna köras innan dokumäntet visas.
  // Tar bort klassen "d-none" för att kunna göra #registerForm synligt.
  const registerFormRef = document.querySelector(`#registerForm`)
  registerFormRef.classList.remove(`d-none`)

  // Lägger till klassen "d-none" för att dölja #loginForm, alltså Login formuläret.
  const loginFormRef = document.querySelector(`#loginForm`)
  loginFormRef.classList.add(`d-none`)


  // Ange ett användarnamn som är minst 6 tecken långt.
  // Ange ett lösenord som är minst 8 tecken långt 
  // (bonusuppgift: lösenordet skall både innehålla stora och små bokstäver, samt minst en siffra).
  const uName = document.querySelector(`#uName`).value // JavaScript letar efter första elementet med id #uName så man behöver bara skriva id
  const pWord = document.querySelector(`#pWord`).value // JavaScript letar efter första elementet med id #pWord så man behöver bara skriva id
  const pWordAgain = document.querySelector(`#pWordAgain`).value // JavaScript letar efter första elementet med id #pWordAgain så man behöver bara skriva id

  if (!uName || !pWord || !pWordAgain) { // Om INTE uName ELLER pWord ELLER pWordAgain har något skrivet i sig och vi klickar på "Registrera dig" så kommer det felmeddelandet under.
    errorMsg.textContent = `Du måste fylla i alla fält!`
    return;

  } else if (uName.length < 6) { // Om uName input:en har mindre än 6 tecken i sig kommer felmeddelandet under skrivas ut.
    errorMsg.textContent = `Ange ett användarnamn som är minst 6 tecken långt.`
    return;

  } else if (pWord.length < 8) { // Om pWord input:en har mindre än 8 tecken i sig kommer felmeddelandet under skrivas ut.
    errorMsg.textContent = `Ange ett lösenord som är minst 8 tecken långt.`
    return;

  } else if (pWord !== pWordAgain) { // Om pWord INTE är lika med pWordAgain input:en har samma tecken i sig kommer felmeddelandet under skrivas ut.
    errorMsg.textContent = `Du måste ange samma lösenord.`
    return;
  } else {
    const newUser = { username: uName, password: pWord }
    users.push(newUser)

    validateLogin(event)
  }

}

// function renderCard(character) {

//   const cardRef = document.createElement('div');
//   cardRef.classList.add('card');

//   let divRef = document.createElement('div');
//   divRef.classList.add('image-container');
//   cardRef.appendChild(divRef);

//   const imgRef = document.createElement('img');
//   imgRef.classList.add('card-image');
//   imgRef.style.backgroundColor = character.type[0].color;
//   imgRef.src = character.image;
//   imgRef.alt = 'Bild på ' + character.name;
//   divRef.appendChild(imgRef);

//   const spanRef = document.createElement('span');
//   spanRef.classList.add('index-span');
//   spanRef.textContent = '#' + character.id;
//   divRef.appendChild(spanRef);

//   divRef = document.createElement('div');
//   divRef.classList.add('card-info');
//   cardRef.appendChild(divRef);

//   let headingRef = document.createElement('h2');
//   headingRef.textContent = character.name;
//   divRef.appendChild(headingRef);

//   let textRef = document.createElement('p');
//   if(character.type.length === 1) {
//       textRef.textContent = character.type[0].name;
//   } else {
//       textRef.textContent = character.type[0].name + ' / ' + character.type[1].name;
//   }
//   divRef.appendChild(textRef);

//   divRef = document.createElement('div');
//   divRef.classList.add('card-stats');
//   cardRef.appendChild(divRef);

//   headingRef = document.createElement('h3');
//   headingRef.textContent = 'Base Stats:';
//   divRef.appendChild(headingRef);

//   const tableRef = document.createElement('table');
//   tableRef.classList.add('table');
//   divRef.appendChild(tableRef);

//   let rowRef = document.createElement('tr');
//   tableRef.appendChild(rowRef);

//   rowRef.appendChild(renderCell('HP', character.stats.hp));
//   rowRef.appendChild(renderCell('Speed', character.stats.speed));

//   rowRef = document.createElement('tr');
//   tableRef.appendChild(rowRef);

//   rowRef.appendChild(renderCell('Attack', character.stats.attack));
//   rowRef.appendChild(renderCell('Special Attack', character.stats.specialAttack));

//   rowRef = document.createElement('tr');
//   tableRef.appendChild(rowRef);

//   rowRef.appendChild(renderCell('Defense', character.stats.defense));
//   rowRef.appendChild(renderCell('Special Defense', character.stats.specialDefense));

//   rowRef = document.createElement('tr');
//   tableRef.appendChild(rowRef);

//   rowRef.appendChild(renderCell('Total', character.stats.total));

//   return cardRef;
// }

function renderCard(character) {
  const cardRef = document.createElement('div');
  cardRef.classList.add('card');
  cardRef.classList.add(character.Name.toLowerCase().replace(/\s/g, '-')); // Lägger till klass med kortets namn

  const imgRef = document.createElement('img');
  imgRef.classList.add('card-image');
  imgRef.src = character.Image;
  imgRef.alt = 'Bild på ' + character.Name;
  cardRef.appendChild(imgRef);

  const headingRef = document.createElement('h2');
  headingRef.textContent = character.Name;
  cardRef.appendChild(headingRef);

  const textRef = document.createElement('p');
  textRef.textContent = `Age: ${character.Age}, Occupation: ${character.Occupation}`;
  cardRef.appendChild(textRef);

  return cardRef;
}



function initContent(event) {
  event.preventDefault();

  // Nu när vi är i initContent vill vi dölja login formuläret
  const loginFormRef = document.querySelector(`#loginForm`)
  loginFormRef.classList.add(`d-none`)

  // Tar bort klassen d-none för att visa contentContainer och skriver ut "Välkommen in i värmen"
  const contentContainerRef = document.querySelector(`#contentContainer`)
  contentContainerRef.classList.remove(`d-none`)

  // Kallar på mitt h1 element som har klassen #welcomeHeader
  const welcomeHeaderRef = document.querySelector(`#welcomeHeader`)

  // Kallar på min button som ligger innuti #contentContainer med id #logoutBtn
  // Lägger på en eventlyssnare på knappen som sedan ska köra funktionen logOut.
  const logoutBtnRef = document.querySelector(`#logoutBtn`)
  logoutBtnRef.addEventListener(`click`, logOut)



  const cartoonCharactersRef = document.querySelector(`#cartoonCharacters`);

  characters.forEach(character => {
    const characterCard = renderCard(character);
    cartoonCharactersRef.appendChild(characterCard);
  });


}


function logOut(event) {
  event.preventDefault();

  // Tar bort klassen d-none för att kunna visa login formuläret igen (#loginForm)
  document.querySelector(`#loginForm`).classList.remove(`d-none`)

  // Kör funktionen initPage()
  initPage()
}