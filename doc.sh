if [ "$1" == "install" -o "$1" == "--install" -o "$1" == "-i" ] 
then
    npm install
fi
./node_modules/jsdoc/jsdoc.js -c jsdoc.json iterate.mjs