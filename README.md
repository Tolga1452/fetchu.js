# fetchu.js

A simple and modern fetch wrapper for Node.js

## Installation

```bash
npm install fetchu.js
```

## Usage

```js
const { request, RequestMethod } = require('fetchu.js');

request('https://example.com', {
    method: RequestMethod.Get,
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        foo: 'bar'
    }
}, {
    isOk: (response) => console.log(`API responded successful ${response.status} ${response.statusText}!`),
    isNotOk: (response) => console.log(`API responded unsuccessful ${response.status} ${response.statusText}!`)
});
```