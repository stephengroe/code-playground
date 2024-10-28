// Basic bank class in JavaScript

class Bank {
  accounts = [];

  constructor(name) {
    this.name = name;
  }

  createAccount(name) {
    const newAccount = new Account(name);
    this.accounts.push(newAccount);
  }
}

class Account {
  balance = 0;

  constructor(name) {
    this.name = name;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }
}

/* TESTS */

// Setup functions
const myBank = new Bank('My bank');


// Has a name
console.assert(myBank.name === 'My bank', "Doesn't have name");

// Bank can create accounts
myBank.createAccount('John Doe');
console.assert(myBank.accounts.length === 1, "Can't create account");

// Accounts have user name
console.assert(myBank.accounts[0]?.name === 'John Doe', "Accounts don't have name");

// Each account starts with no money
console.assert(myBank.accounts[0]?.balance === 0, "Accounts don't have balance");

// Each account can make deposits
myBank.accounts[0]?.deposit(100)
console.assert(myBank.accounts[0]?.balance === 100, "Accounts can't make deposits");

// Each account can make withdrawals
myBank.accounts[0]?.withdraw(50)
console.assert(myBank.accounts[0]?.balance === 50, "Accounts can't make withdrawals");