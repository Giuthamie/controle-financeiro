const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

/*Funcionalidade para remoção das transações*/

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalSotare()
    init()
}

/*manipulação no dom para add as transações nas li's*/

const addTransactionIntoDom = ({amount, name, id}) => {
    /* Se a condição resultar em true, armazenará um string - se não uma string + */
    const operator = amount < 0 ? '-' : '+';
    const CSSClass = amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${name} <span>${operator} R$ ${amountWithoutOperator}
     </span>
     <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `
    transactionsUl.append(li)
}

const getExpenses = transactionsAmount => Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmount => transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmount => transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(({ amount }) => amount);
    const total = getTotal(transactionsAmount);
    const income = getIncome(transactionsAmount);
    const expense = getExpenses(transactionsAmount);
    
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent = `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
}
/* Função que executa add as transações no dom*/

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}

init()

/*função que add a transação no localStorage*/
const updateLocalSotare = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)


const addTransactionsArray = (transactionName, transactionsAmount) => {
    transactions.push({id: generateId(), 
    name: transactionName, 
    amount: Number(transactionsAmount)})
}
const clearInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}
const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === ''  || transactionAmount === ''

    if(isSomeInputEmpty){
        alert('Por favor, preencher os campos de nome e valor da transação!')
        return
    }
    addTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalSotare()
    clearInputs()

}

form.addEventListener('submit', handleFormSubmit)