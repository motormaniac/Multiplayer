@REM call ./compile
@REM call node ./dist/main.js
call npx tsc --build
node src\js_compiled\index.js