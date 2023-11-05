//const { OpenAI } = require("openai");

import openai from 'https://cdn.jsdelivr.net/npm/openai@4.15.3/+esm';
import { OPENAI_API_KEY } from './key.js';
//import dotenv from 'https://cdn.jsdelivr.net/npm/dotenv@16.3.1/+esm';
//dotenv.config();

//import { OpenAI } from './node_modules/openai';

const oai = new openai({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

var form = document.getElementById("spark_find");
form.addEventListener("click", getGenCrit);

async function getGenCrit() {
    
    var gen_crit = document.getElementById("gen_crit");

    let theme = gen_crit[0].value;
    let features = gen_crit[1].value;
    let hack_len = gen_crit[2].value;
    let num_ideas = gen_crit[3].value;
    let temperature = gen_crit[4].value;
    
    console.log(theme, features, hack_len, num_ideas, temperature);

    var theme_input = document.getElementById('theme');
    var features_input = document.getElementById('features');
    var hack_len_input = document.getElementById('hack_len');
    var num_ideas_input = document.getElementById('num_ideas');
    var temperature_input = document.getElementById('temperature');
    var temperature_label = document.getElementById('temp_label');
    theme_input.remove();
    features_input.remove();
    hack_len_input.remove();
    num_ideas_input.remove();
    temperature_input.remove();
    temperature_label.remove();

    document.getElementById('spark_find').value = "Waiting...";

    let string_combo = `Give me ${num_ideas} ideas for a hackathon project relating to ${theme}. I want a feature that incorporates ${features}. This project should be able to be completed within a time constraint of ${hack_len}.`;

    const num = 1;
    const chatCompletion = await oai.chat.completions.create({
        messages: [{ role: 'user', content: string_combo}],
        model: 'gpt-3.5-turbo',
        temperature: temperature_input / 10
    });
    console.log(chatCompletion.choices);

    document.getElementById('spark_find').remove();

    //document.getElementById('spark_find').value = chatCompletion.choices[0].message.content;
    //document.getElementById('spark_find').style = "overflow:scroll"
    document.body.innerHTML += `<div class='output_response' style='overflow:auto;'>${chatCompletion.choices[0].message.content}</div>`;
    document.body.innerHTML += "<form action='./index.html'><input type='submit' class='new_idea' value='New Idea'/></form>";
    //[0].message.content
    
}

//getGenCrit();