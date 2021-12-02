const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

/* Transações ficticias, contendo objetos com id, nome e valor da transação*/

let dummyTransactions = [
{ id: 1, name: 'Bolo de brigadeiro', amount: -20 },
{ id: 2, name: 'Salário', amount: 300 },
{ id: 3, name: 'Torta de frango', amount: -10 },
{ id: 4, name: 'Violão', amount: 150 },
]


/*Funcionalidade para remoção das transações*/

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()
}

/*manipulação no dom para add as transações nas li's*/

const addTransactionIntoDom = transaction => {
    /* Se a condição resultar em true, armazenará um string - se não uma string + */
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}
     </span>
     <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
     x
     </button>
    `
    transactionsUl.append(li)
}


const updateBalanceValues = () => {
    const transactionsAmount = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
    
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent = `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
}
/* Função que executa add as transações no dom*/

const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}

init()

const generateId = () => Math.round(Math.random() * 1000)

/*o return no if faz com que a execução pare e não precise de else*/

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if(transactionName === ''  || transactionAmount === ''){
        alert('Por favor, preencher os campos de nome e valor da transação!')
        return
    }
    const transaction = { 
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }

    dummyTransactions.push(transaction)
    init()

    /*limpar os valores*/

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

})