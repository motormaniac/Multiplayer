echo Compiling Client
call cd ./client
call ./compile

echo Compiling Server
call cd ../server
call ./compile

echo Starting Server
node src\js_compiled\index.js