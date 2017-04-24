var storage=require('node-persist');
storage.initSync();
storage.setItemSync('accounts',[{
username: 'Harish',
balance: 100
}, {
    username: 'admin',
    balance: 120
}


]);

var accounts= storage.getItemSync('accounts');

//push on new account
accounts.push({
    username: 'kumar',
    balance: 75
});

//save using setItemSys
storage.setItemSync('accounts'.accounts);
console.log(accounts);