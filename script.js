
const axios = require("axios")

async function mrt(){
    let myList = [];
    let count = 1;
    while(count < 10){
        let response = await axios.get(`https://api.unsplash.com/search/photos?page=${count}&query=luxury hotel&orientation=landscape&client_id=qG9oJxv46Q_nCP_VFA1sUraH8cfFT9N6_V4pjNYSK90`)
        count++
        response.data.results?.forEach(result => {
            myList.push(result.urls.regular)
        })
    }
    console.log(myList)
}

mrt();