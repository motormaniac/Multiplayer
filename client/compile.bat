::go to directory batch file is located in (./client)
::I also don't really know what this means I copied it from the internet and it works
call cd %~dp0
::turns all typescript into javascript
call npx tsc --build
::uses webpack to combine all the js files into main.js
call npx webpack --config webpack.config.js
::TEMPORARY:   copies the html and css files into the distribution folder
call copy ".\src\html\client.html" ".\dist\main.html"
call copy ".\src\css\client.css" ".\dist\main.css"