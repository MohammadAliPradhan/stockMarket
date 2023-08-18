// // MXPELCMS3N47KU7L
const button = document.getElementById("mainBtn");
const inputMain = document.getElementById("inputMain");

const IntraDayBtn = document.getElementById("intraday");
const dailyBtn = document.getElementById("daily")
const weeklyBtn = document.getElementById("weekly")
const monthlyBtn = document.getElementById("monthly")



let mainBtnClicked = false;
let intradayBtnClicked = false;
let dailyBtnClicked = false;
let weeklyBtnClicked= false;
let monthlyBtnClicked = false;



button.addEventListener("click", (event) => {
    event.preventDefault();
    const test = inputMain.value.toUpperCase();
    console.log(test)
    mainBtnClicked = true;
    if (intradayBtnClicked) {
        showDetails(test, "INTRADAY");
        mainBtnClicked = false;
        intradayBtnClicked = false;
    }
    else if(dailyBtnClicked){
        showDetails(test, "DAILY")
        mainBtnClicked = false;
        dailyBtnClicked =false;
    }
    else if(weeklyBtnClicked){
        showDetails(test, "WEEKLY")
        mainBtnClicked = false;
        weeklyBtnClicked =false;
    }
    else if(monthlyBtnClicked){
        showDetails(test, "MONTHLY")
        mainBtnClicked =false;
        monthlyBtn =false;
    }
});

//Sabke button
IntraDayBtn.addEventListener("click", (event2) => {
    event2.preventDefault();
    intradayBtnClicked = true;
    if (mainBtnClicked) {
        // showDetails("YOUR_DEFAULT_SYMBOL", "INTRADAY"); // Replace "YOUR_DEFAULT_SYMBOL" with the appropriate default symbol
        mainBtnClicked = false;
        intradayBtnClicked = false;
    }
});

dailyBtn.addEventListener("click",(event3)=>{
    event3.preventDefault();
    dailyBtnClicked = true;
    if(mainBtnClicked){
        showDetails("Daily-Button")
        mainBtnClicked = false;
        dailyBtnClicked =false;
    }
})

weeklyBtn.addEventListener("click", (event4)=>{
    event4.preventDefault();
    weeklyBtnClicked = true;
    if(mainBtnClicked){
        showDetails("Weekly-Butttons")
        mainBtnClicked =false;
        weeklyBtnClicked =false;
    }
})

monthlyBtn.addEventListener("click", (event5)=>{
    event5.preventDefault();
    monthlyBtnClicked = true;
    if(mainBtnClicked){
        showDetails("Monthly Buttons")
        mainBtnClicked =false;
        monthlyBtnClicked=false;
    }
})


async function showDetails(test, listener) {
    console.log(test)
    console.log(listener)
    let response;

    let sometime = `TIME_SERIES_${listener}`
    response = await fetch(`https://www.alphavantage.co/query?function=${sometime}&symbol=${test}&interval=5min&apikey='MXPELCMS3N47KU7L'`);
    const data = await response.json();


    // const currentDate = new Date();
    // const day = String(currentDate.getDate()-1).padStart(2, '0'); 
    // const key = `2023-08-${day}`;

    let timeSeries; 

    // = data["Time Series (Daily)"][key]["1. open"];

    if(sometime === "TIME_SERIES_INTRADAY"){
        timeSeries = data["Time Series (5min)"]["2023-08-17 19:20:00"]["1. open"]
    }else if(sometime === "TIME_SERIES_WEEKLY"){
        timeSeries = data["Weekly Time Series"]["2023-08-17"]["1. open"]
    }else if(sometime === "TIME_SERIES_MONTHLY"){
        timeSeries = data["Monthly Time Series"]["2023-06-30"]["1. open"]
    }else if(sometime==="TIME_SERIES_DAILY"){
        timeSeries = data["Time Series (Daily)"]["2023-08-16"]["1. open"]
    }
    

    
    console.log(timeSeries)


    const MetaData = data["Meta Data"]["2. Symbol"];

    const main = document.getElementById("main-sec");

    
        const article = document.createElement("article");
        article.classList.add("dynamic");


        const p = document.createElement("p");
        p.innerText = `${MetaData}`;
        article.append(p);

        const p2 = document.createElement("p");
        p2.innerText = `${timeSeries}`;
        p2.classList.add("innerContent");
        const div = document.createElement("div");
        div.classList.add("timeDiv")
        
        // Color according to the bar everytime refresh
        
        function getRandomColor(timeSeries) {
            if(timeSeries>= 100){
                return 'green'
            }else if(timeSeries>60 && timeSeries<=100){
                return 'white'
            }else if(timeSeries<=60){
                return 'red'
            }
       }

        div.style.backgroundColor = getRandomColor(timeSeries);


        div.append(p2);
        article.append(div);

        const p3 = document.createElement("p");
        p3.innerText = `${listener}`;
        const div2 = document.createElement("div");
        div2.classList.add("tradeWay")
        div2.append(p3);
        article.append(div2);

        const button = document.createElement("button");
        button.innerHTML = `<i class="fa-solid fa-xmark fa-2xl" style="color: #ffffff;"></i>`;

        button.addEventListener("click", ()=>{
            main.removeChild(article);
        })

        

        
        article.append(button);

        main.append(article);

        var a= false;
        article.addEventListener("click", function(a){
            a = true;
            console.log("hi");
            const li =  document.createElement('li');
            li.innerText="Reward";
            const buttondrop = document.createElement('button');
            const div3 = document.createElement("div");
            div3.classList.add("dropDown");
            div3.append(li);
            div3.append(buttondrop)
            main.append(div3)
            buttondrop.addEventListener("click", (e)=>{
                main.removeChild(div3);
            })
        })
        bhk(a);
        console.log(a);
       
       
}