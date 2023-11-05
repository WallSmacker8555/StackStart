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
    var spark_find_label = document.getElementById('spark_find');
    theme_input.remove();
    features_input.remove();
    hack_len_input.remove();
    num_ideas_input.remove();
    temperature_input.remove();
    temperature_label.remove();
    spark_find_label.remove();

    document.body.innerHTML += `
        <div class="container">
            <div class="progress-bar__container">
                <div class="progress-bar">
                    <span class="progress-bar__text">Uploaded Successfully!</span>
                </div>
            </div>
        </div>
    `;

    const progressBarContainer = document.querySelector('.progress-bar__container');
    const progressBar = document.querySelector('.progress-bar');
    const progressBarText = document.querySelector('.progress-bar__text');

    progress_bar();
    console.log("progress_bar() called");

    let string_combo =
    `Give me ${num_ideas} ideas for a hackathon project relating to ${theme}.
    I want a feature that incorporates ${features}.
    This project should be able to be completed within a time constraint of ${hack_len}.
    Write back each idea surrounded with a paragraph tag like the following: <p> idea </p>.
    Make the title of each idea bold.`;

    const num = 1;
    const chatCompletion = await oai.chat.completions.create({
        messages: [{ role: 'user', content: string_combo }],
        model: 'gpt-3.5-turbo',
        temperature: temperature_input / 10
    });

    console.log(chatCompletion.choices);
    console.log("progress bar removed");
    progressBarContainer.remove();
    progressBar.remove();
    progressBarText.remove();

    //document.getElementById('spark_find').value = chatCompletion.choices[0].message.content;
    //document.getElementById('spark_find').style = "overflow:scroll"
    document.body.innerHTML += `<div class='output_response' style='overflow:auto;'>${chatCompletion.choices[0].message.content}</div>`;
    document.body.innerHTML += "<form action='./index.html'><input type='submit' class='new_idea' value='New Idea'/></form>";
    //[0].message.content

}

//getGenCrit();


function progress_bar() {
    const progressBarContainer = document.querySelector('.progress-bar__container');
    const progressBar = document.querySelector('.progress-bar');
    const progressBarText = document.querySelector('.progress-bar__text');

    const progressBarStates = [0, 7, 27, 34, 68, 80, 95, 100];

    let time = 0;
    let endState = 100;

    progressBarStates.forEach(state => {
        let randomTime = Math.floor(Math.random() * 3000);
        setTimeout(() => {
            if (state == endState) {
                gsap.to(progressBar, {
                    x: `${state}%`,
                    duration: 2,
                    backgroundColor: '#4895ef',
                    onComplete: () => {
                        progressBarText.style.display = "initial";
                        progressBarContainer.style.boxShadow = '0 0 5px #4895ef';
                    }
                });
            } else {
                gsap.to(progressBar, {
                    x: `${state}%`,
                    duration: 2,
                });
            }
        }, randomTime + time);
        time += randomTime;
    });

}