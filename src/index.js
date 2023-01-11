
const { Configuration, OpenAIApi } = require("openai");


process.env
console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



function makeApiRequest(artist1, artist2, artist3) {
  let promise = new Promise(function(resolve, reject) {
    let xml = new XMLHttpRequest();
    xml.addEventListener("loadend", () => {
      const response = JSON.parse(xml.response);
      // console.log(response.choices[0].text);
      if (xml.status === 200) {
        resolve([response, artist1, artist2, artist3]);
      } else {
        reject([response, artist1, artist2, artist3])
      }
    });
    xml.open("POST", "https://api.openai.com/v1/completions");
    xml.setRequestHeader("Content-Type", "application/json");
    xml.setRequestHeader("Authorization", `Bearer ${process.env.OPENAI_API_KEY}`);
    
    const payload = {
      model: "text-davinci-003",
      prompt: `Give me a list of 5 recommended musical artists based off of my top 3 picks of ${artist1}, ${artist2}, ${artist3}\n`,
      temperature: 1.2,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [" Human:", " AI:"],
    };
    console.log(xml);
    xml.send(JSON.stringify(payload));
  });
  debugger;
  promise.then(function(response){
    printElements(response);
  }, function(response){
    printError(response);
  });
}

// function makeApiRequest(artist1, artist2, artist3) {
//   const xml = new XMLHttpRequest();
//   xml.open("POST", "https://api.openai.com/v1/completions");
//   xml.setRequestHeader("Content-Type", "application/json");
//   xml.setRequestHeader("Authorization", `Bearer ${process.env.OPENAI_API_KEY}`);
  
//   const payload = {
//     model: "text-davinci-003",
//     prompt: `Give me a list of 5 recommended musical artists based off of my top 3 picks. Top 3 Picks: ${artist1}, ${artist2}, ${artist3}\n`,
//     temperature: 1.5,
//     max_tokens: 150,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0.6,
//     stop: [" Human:", " AI:"],
//   };
//   console.log(xml);
//   xml.send(JSON.stringify(payload));
//   xml.addEventListener("loadend", () => {
//     const response = JSON.parse(xml.response);
//     console.log(response.choices[0].text);
//   });
// }
function printElements(response){
  document.getElementById("showResponse").innerText = `${response[0].choices[0].text}`
}
function printError(response){

  document.getElementById("showResponse").innerText = `There was an error: ${response[0].error.message}`;
  console.log(response[0].error.message);
}
function handleSubmit(event){
  event.preventDefault();
  let artist1 = document.getElementById("artist1").value;
  let artist2 = document.getElementById("artist2").value;
  let artist3 = document.getElementById("artist3").value;
  makeApiRequest(artist1, artist2, artist3);
  
}
window.addEventListener("load", function() {

  document.querySelector('form').addEventListener("submit", handleSubmit);
});
// function handleSubmit(event){
//   event.preventDefault();
//   try{
//     makeApiRequest();
//   } catch{
//   }
    // function apiWrapper (artist1, artist2, artist3) {
      //   const body = {
        //     let promise = new Promise(function(resolve, reject) {
          //       let request = new XMLHttpRequest();
          //       const configuration = new Configuration({
            //         apiKey: process.env.OPENAI_API_KEY,
            //       });
            //       const openai = new OpenAIApi(configuration); 
            
            //       prompt: `${artist1} ${artist2} ${artist3}`,
            //       if ()
            //     })
            //   }
            // }
// }

// const response = await openai.createCompletion(body, {
//   model: "text-davinci-003",
//   prompt: `Give me a list of 5 recommended musical artists based off of my top 3 picks. Top 3 Picks: ${artist1}, ${artist2}, ${artist3}\n`,
//   temperature: 1.5,
//   max_tokens: 150,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0.6,
//   stop: [" Human:", " AI:"],
// });
// return response.choices[0].text



// const options = {
  //   url: 'https://api.openai.com/v1/completions',
  //   method: 'POST',
  //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer' + (process.env.OPENAI_API_KEY),
    //   },
    //   body: JSON.stringify ({
      //     "model": "text-davinci-003",
      //     "prompt": "Give me 5 artist recommendations based on my top 3 artists. My top 3 artists are: queen",
      //     "max_tokens": 2048,
      //     "temperature": 1.5
      //   })
      // };
      
      
      
      // function getRecommendations() {
        //   let request = new XMLHttpRequest();
        //   request.addEventListener('loadend', function() {
          //     const response = JSON.parse(this.response.choices[0].text);
          //     if (this.status === 200) {
            
            //     } else {
              //       printError(this, response);
              //     }
              //   });
              //   request.open('POST', options, true);
              //   request.send();
              // }




// const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "Give me a list of 5 recommended musical artists based off of my top 3 picks. Top 3 Picks:\n",
  //   temperature: 0.9,
  //   max_tokens: 150,
  //   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0.6,
//   stop: [" Human:", " AI:"],
// });

// const openai = require('openai');

// openai.apiKey = process.env.OPENAI_API_KEY;
// const prompt = `Give me 5 artist recommendations based on my top 3 artists. My top 3 artists are: ${artist1, artist2, artist3}.`

// openai.completion.create({
//   prompt: prompt,
//   model: 'text-davinci-003',
//   max_tokens: 150,
//   temperature: 1.5,
// }, function(error, response) {
//   console.log(response.choices[0].text);
// });


