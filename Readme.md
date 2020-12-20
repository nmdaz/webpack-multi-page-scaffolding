# Webpack Multi Page Scaffolding
Easy setup for your NON Single Page Application front end projects.

## Includes 
- Babel loader - So you can use modern Javascript syntax
- Sass loader - Use Dart Sass

## How to install

Install Node.js so we can use NPM

Clone this repository
```bash
mkdir project_name & cd project_name
git clone https://github.com/nmdaz/webpack-multi-page-scaffolding.git .
npm install
```

## How to add new Page
- Create your HTML page inside the src/html folder
- Create your Javascript file inside the src/js folder
- HTML and Javascript file SHOULD have the SAME NAME

## How to add Style 
- Create your Sass file inside the style folder
- Require the sass file to your Javascript file
```javascript
require('../style/name.scss');
````

## Build the project
```bash
npm run build
````
## Development Server
- Run this command
```bash
npm run serve
````
- Open your brower
- Type localhost:8080 at the address bar


