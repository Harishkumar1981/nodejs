console.log('starting password manager');
 
var storage = require('node-persist');
var crypto = require('crypto-js')
storage.initSync();
 
var argv = require('yargs')
    .command('create', 'Create a new account haris', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Account username or email',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Account password',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            },
            Question: {
                demand: true,
                alias: 'Q',
                description: 'Question to get password',
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Get an existing account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var command = argv._[0];
 
// create
//     --name
//     --username
//     --password
 
// get
//     --name
 
// account.name Facebook
// account.username User12!
// account.password Password123!
 


function createAccount (account, masterPassword) {
    var accounts = getAccounts(masterPassword);
 
    accounts.push(account);
 
    saveAccounts(accounts, masterPassword);
 
    return account;
}

 
function getAccount (accountName, masterPassword) {
    var accounts = storage.getItemSync('accounts');
    var matchedAccount;
 
    accounts.forEach(function (account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });
 
    return matchedAccount;
}
 
if (command === 'create') {
    try {
    var createdAccount = createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password,
        masterPassword: argv.masterPassword
    });
    console.log('Account created!');
    console.log(createdAccount);
    } catch (e) {
        console.log('Unable to create account.');
    }
} else if (command === 'get') {
    try {
    var fetchedAccount = getAccount(argv.name, argv.masterPassword);
 
    if (typeof fetchedAccount === 'undefined') {
        console.log('Account not found');
    } else {
        console.log('Account found!');
        console.log(fetchedAccount);
    }
    } catch (e) {
        console.log('Unable to fetch account.');
    }
}