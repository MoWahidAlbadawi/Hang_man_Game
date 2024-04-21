let timeInSeconds=4;
let uuu=0;
//letters
let letters="abcdefghijklmnopqrstuvwxyz";
//get Array letters
let lettersArray=Array.from(letters);
//letters in html
let lettersContainer=document.querySelector(".letters");
//generate letters
lettersArray.forEach((letter) => {
    //create span for the letter
    let span=document.createElement("span");
    //cretae text 
    let txtSpan=document.createTextNode(letter);
    //append letter in span
    span.appendChild(txtSpan);
    //add class to span
    span.className='letter-box';
    //add span to lettersContainers
    lettersContainer.appendChild(span);
});
//audio success and game-over
let audioGameOver=document.querySelector(".game-over");
let audioSuccess=document.querySelector(".success");
let audioAllSuccess=document.querySelector(".all-success");
//object of Words and categories
const words={
    countries : ["syria","egypt","jordan","oman","iraq","saudi","plestain","kuwait","lebia","algeria",
    "china","india","japan","russia","germany","france","italia","norway","belguim","brazil","portugal"],
    players : ["messi" , "ronaldo" , "nymar" , "benzema" , "modric" , "salah" , "kane" ,"mbape" , "haland" , "lewandowski",
    "ramos" , "ineista" , "marcelo" ,"koke","morata","kante","sancho","sterling","lukaku"],
    programming : ["go","sql","python","dart","html","c","java","javascript","css","php"],
    wardat : ["badawi","lababede","kardoush","saeed","saleh","ahmed","bassil","waeez",
        "momen","moghrabi","naqshi","mokresh","ali","rawan","shalabi","yahya","dadikhy","tamim","fayyad"],
};
//get random property
let allKeys=Object.keys(words);
let randomPropNumber=Math.floor(Math.random() * allKeys.length);
let randomPropName=allKeys[randomPropNumber];
let randomPropValue=words[randomPropName];
let randomValueNumber=Math.floor(Math.random() * randomPropValue.length);
let randomValueValue=randomPropValue[randomValueNumber];
let c=randomValueValue.length;
let a=0;
let v=0;
for(let i=0;i<c;i++)
{
    if(randomValueValue[i]===' ')
    a++;
}
for(let i=0; i<c; i++) {
    for(let j=i+1;j<c+1;j++) {
        if(randomValueValue[i] === randomValueValue[j]) {
            uuu++;
        }
    }
}
//set category span
document.querySelector(".game-info .category span").innerHTML=`${randomPropName}`;
//get letters-guess
let lettersQuessContainer=document.querySelector(".letter-guess");
let le=document.querySelectorAll(".letter-guess span");
//convert choosen word to Array
let lettersAndSpaces=Array.from(randomValueValue);
lettersAndSpaces.forEach((letter) => {
    let span=document.createElement("span");
    if(letter===' ')
    {
        span.className='with-space';
    }
    lettersQuessContainer.appendChild(span);
});
//set wrongAttemps
let wrongAttemps=0;
let correctAttemps = uuu;
//set the draw
let theDraw=document.querySelector(".hangman-draw");
//get guess span
let guessSpan=document.querySelectorAll(".letter-guess span");
document.addEventListener("click" , (e) => {
    //set status(true or false) 
    let theStutas=false;
    if(e.target.className=='letter-box')
    {
        e.target.classList.add("clicked");
        //get letter clicked
        let theClickedLetter=e.target.innerHTML.toLowerCase();
        //get chosen word tolowerCase
        let theChosenWord=Array.from(randomValueValue.toLowerCase());
        //lopper chosen word
        theChosenWord.forEach((wordLetter,wordIndex) => {
            if(theClickedLetter===wordLetter) {
                theStutas=true;
                //loop on all guess span
                guessSpan.forEach((span,spanIndex) => {
                    if(wordIndex===spanIndex)
                    {
                    span.innerHTML=`${wordLetter}`;
                    span.classList.add("found");
                    }
                });
            }
        });
        if(theStutas===false) {
            //increase wrong Attemps
            wrongAttemps++;
                if(wrongAttemps===8) {
                    endGmae(wrongAttemps);
                lettersContainer.classList.add("finished");
                audioGameOver.play();
                setTimeout(function () {
                    location.reload();
                },timeInSeconds * 1000);
            }
            //add class wrong on draw element
            theDraw.classList.add(`wrong-${wrongAttemps}`);
        }
        else {
            correctAttemps = correctAttemps + 1;
            audioSuccess.play();
            if(theChosenWord.length == correctAttemps) {
                endGmae(7);
                lettersContainer.classList.add("finished");
                audioAllSuccess.play();
                setTimeout(function () {
                    location.reload();
                },timeInSeconds * 1000);
            }
            }
    }
});
let finish=document.querySelector(".finish");
function endGmae(t) {
    let div=document.createElement("div");
    if(t===8) {
        div.className='div';
        let txtDiv2=document.createTextNode(`Game Over Loser , The Word Is ${randomValueValue}`);
        div.appendChild(txtDiv2);
    }
    else {
        div.className='congratulations';
        let textDiv1 = document.createTextNode('Congratulations');
        div.appendChild(textDiv1);
    }
    finish.appendChild(div);
}
// lettersContainer.forEach((span) => {
//     if(span.classList.containes("found"))
//     {
//         congra();
//         lettersContainer.classList.add("finished");
//     }
// });
// function congra() {
//     lettersContainer.classList.add("finished");
//     let divFinished=document.createElement("div");
//     divFinished.className="congratulations";
//     let text=document.createTextNode("congratulations");
//     divFinished.appendChild(text);
//     finish.appendChild(divFinished);
// }
console.log(randomValueValue);