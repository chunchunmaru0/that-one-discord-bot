const { v1 } = require("node-tiklydown");

try {
   
    v1('https://www.tiktok.com/t/ZTRKKXoP/').then(async data => {
        // Do something with the data
      
       if(data.status === 404){
        console.log("Test")
        return
       }
       console.log(data)
    });
} catch (error) {
  //console.log(error.status)
}