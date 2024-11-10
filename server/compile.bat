::compile typescript files in scripts into javascript in js_compiled
call npx tsc --build
::merge compiled javascript files into main.js in the dist folder
call npx webpack --config webpack.config.js
::copy dist folders from client into server static folder
call copy ..\client\dist .\static
::Run the server
call node index.js