if [ "$1" == "install" -o "$1" == "--install" -o "$1" == "-i" ] 
then
    npm install
fi
npm test
