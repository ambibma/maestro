
// const { Configuration, OpenAIApi } = require("openai");

// console.log(process.env.OPENAI_API_KEY);

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
//const openai = new OpenAIApi(configuration);

async function makeApiRequest(url = 'https://api.openai.com/v1/completions', payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(payload)  
  });
  return response.json();
}

function handleSubmit(event){
  event.preventDefault();
  let artist1 = document.getElementById("artist1").value;
  let artist2 = document.getElementById("artist2").value;
  let artist3 = document.getElementById("artist3").value;
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
  const url = 'https://api.openai.com/v1/completions';

  makeApiRequest(url, payload)
    .then(function(response) {
      console.log(response);
      if (isNaN(response.created)) {
        const errorMessage = `${response.status} ${response.statusText}`;  
        throw new Error(errorMessage);
      } else {
        return response;
      }
    })
    .then(function(jsonResponse) {
      printElements(jsonResponse);
    })
    .catch(function(error) {
      printError(error.message);
    });
}

function printElements(response){
  console.log(response);
  document.getElementById("showResponse").innerText = `${response.choices[0].text}`;
}

function printError(response){
  document.getElementById("showResponse").innerText = `There was an error: ${response}`;
  console.log(response[0]);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleSubmit);
});