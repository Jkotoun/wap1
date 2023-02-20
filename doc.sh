if [ "$1" == "install" -o "$1" == "--install" -o "$1" == "-i" ] 
then
    npm install
fi
./node_modules/.bin/jsdoc -c jsdoc.json iterate.mjs