const express = require("express");
const app = express();
const scrapPort = require("./helpers/scrap-ports");
app.set('view engine', 'ejs');

app.get('/',async (req,res)=>{
    try {
        const ports = await scrapPort();
        res.render('ports',{ports})
    } catch (error) {
        res.send('data scrapping error',error)
    }
});

app.get('/in-port',async (req,res)=>{
    try {
        const ports = await scrapPort();
        //res.render('ports',{ports})
    } catch (error) {
        res.send('data scrapping error',error)
    }
});

app.get('/download/:item',(req,res)=>{
    const  {item}  = (req.params);
    let file ='';
    if(item == 'ports'){
        file = `${__dirname}/generated/ports.xlsx`;
    }else{
        res.render('error');
    }
    res.download(file);
})

app.listen(3000,()=>console.log('application up and running'));