# Workflow
A standard workflow for the development of websites and web apps

## project folder
.
├── README.md
├── build
│   ├── assets
│   ├── css
│   ├── index.html
│   ├── js
│   │   └── module
│   │       ├── script1.js
│   │       ├── script2.js
│   │       └── script3.js
│   ├── sass
│   │   ├── _test.scss
│   │   └── style.scss
│   └── vendor
│       ├── css
│       ├── fonts
│       └── js
├── dist
│   ├── css
│   │   ├── style.css
│   │   └── style.css.map
│   └── js
│       ├── script.js
│       ├── script.js.map
│       └── script.min.js
├── gulpfile.js
├── package-lock.json
├── package.json
└── setup
    ├── createFolder
    └── template.html

## Automatic processes in
### JavaScript
- create a sourcemaps
- translate EcmaScript in JavaScript
- Adds all JavaScript files to a JavaScript file 
- create a minify JavaScript file

### CSS
- create a sourcemaps
- translate sass in css
- When sass-error output an error message
- autoprefixer for CSS3 (last 2 version)
- Merges all mediaqueries that have the same dimensions
- create a minify CSS file

# install
1. bash createFolder 
2. npm install
3. gulp