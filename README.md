## React Scaffold

### Getting Started

1. clone this repo
2. cd into folder
3. `npm install`
4. `npm start`
5. open http://<your ip>:3000 (not localhost or 127.0.0.1 , just for mobile test)

### Build for Production

```
npm run deploy
```


### Promise usage in IE<9
catch is a reserved word in IE<9, meaning promise.catch(func) throws a syntax error. To work around this, you can use a string to access the property as shown in the following example.

However, please remember that such technique is already provided by most common minifiers, making the resulting code safe for old browsers and production:
```
promise['catch'](function(err) {
  // ... 
});

```
or use .then instead
promise.then(undefined, function(err) {
  // ... 
});


### Promise Auto-polyfill
To polyfill the global environment (either in Node or in the browser via CommonJS) use the following code snippet:
```
require('es6-promise').polyfill();
```