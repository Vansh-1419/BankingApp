"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Currencies Displayed through ,Maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Displaying Movements, Dynamic fetching data
const displayMoments = (movements) => {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
    <div class="movements__value">${mov}€</div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMoments(account1.movements);

//Creating UserName in Accounts Array
const createUserNames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

//Showing the current display using map,filter and reduce
const createPrintDisplay = (movements) => {
  const balance = movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};
// createPrintDisplay(account1.movements);

//Showing Summary through map,filter and reduce
const displaySummary = (movements) => {
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;
  const credited = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(credited)}€`;
  const intrest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${intrest}€`;
};
// displaySummary(account1.movements);

//Event Handlers
/////////////////////////////
//Craeting Current Account to Loging in the App
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  //Using Prevent Default so that as the form automatically gets uploaded so to prevent that
  e.preventDefault();

  //Using Find function on Arrays
  currentAccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(" ")[0]
    }`;
  }
  //Clear input values
  inputLoginPin.value = inputLoginUsername.value = "";
  //displayMovements
  displayMoments(currentAccount.movements);
  //displayTotal Balnce
  createPrintDisplay(currentAccount.movements);
  //displaySummary
  displaySummary(currentAccount.movements);
});
//Login Add event handlers

// const createPrintDisplay = (movements) => {
//   const balance = movements.reduce((acc, cur,i,arr) => {
//     // console.log(
//     //   `this is the ${i}th iteration of array ${arr}: and the cureent value is ${cur} and the acumulator is ${acc}`
//     // );
//     return acc + cur;
//   }, 0);
//   labelBalance.textContent = `${balance} EUR`;
// };
// const filterMov = (movements) => {
//   const filt = movements.filter((mov) => {
//     return mov < 0;
//   });
//   console.log(filt);
// };
// filterMov(account1.movements);

// const checkDogs = (dogsJulia, dogsKate) => {
//   const dogsNew = dogsJulia.slice(0, -2);
//   const dogsMix = dogsNew.concat(dogsKate);
//   dogsMix.forEach(function (value, i) {
//     if (value <= 3) {
//       console.log(
//         `Dog Number ${i + 1} is still a puppy and is ${value} years old🐶`
//       );
//     } else {
//       console.log(
//         `Dog Number ${i + 1} is an adult and is ${value} years old🐶`
//       );
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
//

// const calcAverageHumanAge = (ages) => {
//   const HumanAge = ages.map((age) => {
//     if (age <= 2) {
//       age = 2 * age;
//       return age;
//     } else if (age > 2) age = 16 + age * 4;
//     return age;
//   });
//   console.log(HumanAge);
//   const filtered = HumanAge.filter((fil) => fil > 18);
//   console.log(filtered);
//   const averageAge = filtered.reduce(
//     (acc, curage, i, arr) => acc + curage / arr.length,
//     0
//   );
//   console.log(averageAge);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const eurtoUSD = 1.1;
// const totalDisplay = movements
//   .filter((mov) => mov > 0)
//   .map((move) => move * eurtoUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDisplay);
// const HumanAverage = (ages) => {
//   const avg = ages
//     .map((age) => {
//       if (age <= 2) {
//         return age * 2;
//       } else {
//         return 16 + age * 4;
//       }
//     })
//     .filter((age) => age > 18)
//     .reduce((acc, age, i, arr) => {
//       console.log(arr);
//       return acc + age / arr.length;
//     }, 0);
//   console.log(avg);
// };
// HumanAverage([5, 2, 4, 1, 15, 8, 3]);
