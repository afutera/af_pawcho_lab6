const os=require("os");
const http=require("http");
const PORT=3002;

///Wyciągnięcie pierwszego adresu IPv4 niebędącego loopbackiem:
let adres=undefined;
const sieci=os.networkInterfaces();
for(const s of Object.keys(sieci)){
    for(const a of sieci[s]){
        console.log(adres===undefined,!a.internal,a.family==="IPv4", a)
        if(adres===undefined&&!a.internal&&a.family==="IPv4") adres=a.address;
    }
}
//console.log("Ostateczny adres:",adres);

const server=http.createServer((req,res)=>{
    res.end(`PAWCHO LAB 5\nAdres IP: ${adres}\nHostname: ${os.hostname()}\nWersja: ${process.argv[2]}`)
});

server.listen(PORT,()=>{console.log(`Serwer uruchomiony, nasłuchiwanie na porcie ${PORT}.`)})