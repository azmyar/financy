// Handle Error
function handleError(err) {
    console.log("ERROR");
    console.log(err);
    }

// Get Request
function ShowData(){       
    const endpoint = "http://localhost:8000/";
    const GetPromise = fetch(endpoint);

    let user = document.querySelector('.user');

    GetPromise
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            user.innerHTML += `
            <div class = "div_user" id = "${i}" onclick="ShowBalance(this);hideBody()">
                <div class="delete_button_container">
                    <button class = "delete_button" id = "${i}" onclick="Deleting(this)">
                        <h1 style="font-family: Nunito; position: absolute; color:#f1e7cd;">x</h1>
                    </button>
                </div>
                <h1 style="font-family: Nunito; font-size:25pt">${data[i].user}</h1>
            </div>`;
        }})
    .catch(handleError);
    }

// Post Request

function Posting(){

    new_user = prompt("Input Your Name")
    new_balance = prompt("Input Your Current Balance")

    const endpoint = "http://localhost:8000/";
    const PostPromise = fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body:   JSON.stringify({
                "user"   : new_user,
                "balance": new_balance,
                "history": ''
                })
        });

    PostPromise
    .then((response) => response.json())
    .then((data) => {console.log(data)})
    location.reload()
    .catch(handleError);
}

// Delete Request

function Deleting(element) {
    const endpoint = "http://localhost:8000/";
    const GetPromise = fetch(endpoint);

    GetPromise
    .then((response) => response.json())
    .then((data) => {
        const endpoint = `http://localhost:8000/${data[element.id].id}`;
        const DelPromise = fetch(endpoint, {
                method: 'DELETE',
                mode: 'cors'
                });

        DelPromise
        .then((response) => response.json())
        .then((data) => console.log(data))

        })

    setTimeout(function(){
        location.reload();
        }, 10)
        
    .catch(handleError);
    }

// Show Balance
function ShowBalance(element) {
    const endpoint = "http://localhost:8000/";
    const GetPromise = fetch(endpoint);

    let Brand = document.querySelector('.name_financy');
    let Balance = document.querySelector('.Balance');
    let Button = document.querySelector('.button_container');
    let history = document.querySelector('.history_container');

    GetPromise
    .then((response) => response.json())
    .then((data) => {
        Balance.innerHTML = `${data[element.id].balance}`;
        Brand.innerHTML = `${data[element.id].user}'s Financy`;
        Button.innerHTML = `
        <div class="glass_button" id = ${data[element.id].id} onclick="Income(this)">
            <h1 class = "balance_buttons">Income</h1>
        </div>

        <div class="glass_button" id = ${data[element.id].id} onclick="Expense(this)">
            <h1 class = "balance_buttons">Expense</h1>
        </div>`;
        let history_list = data[element.id].history.split(',')

        const index = history_list.indexOf('');
        if (index > -1) {
        history_list.splice(index, 1);
        }

        history.innerHTML = ''
        for (var i = 0; i < history_list.length; i++) {
            history.innerHTML += `
            <div class = "history">
            <h1 style="font-family: Nunito ; font-size: 45px">${history_list[i]}</p>
            </div>`;
        }})
    .catch(handleError);
    }

// Income Function
function Income(element){
    let income = parseInt(prompt("Insert Ammount"))
    let Balance = document.querySelector('.Balance');
    let history = document.querySelector('.history_container')

    const endpoint = `http://localhost:8000/${element.id}`;
    const GetPromise = fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        });

    GetPromise
    .then((response) => response.json())
    .then((data) => {
        const endpoint = `http://localhost:8000/${element.id}`;
        const PutPromise = fetch(endpoint, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
                },
        body:   JSON.stringify({
                "user"   : data.user,
                "balance": parseInt(data.balance) + income,
                "history": data.history + `Income : ${income},`
                })
        });
        PutPromise
        .then((response) => response.json())
        .then((data) => {
            Balance.innerHTML = `${data.balance}`;
            history.innerHTML += `
            <div class = "history">
            <h1 style="font-family: Nunito ; font-size: 45px">Income : ${income}</p>
            </div>`;
            })})
}

// Expense Function
function Expense(element){
    let expense = parseInt(prompt("Insert Ammount"))
    let Balance = document.querySelector('.Balance');
    let history = document.querySelector('.history_container')

    const endpoint = `http://localhost:8000/${element.id}`;
    const GetPromise = fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        });

    GetPromise
    .then((response) => response.json())
    .then((data) => {
        const endpoint = `http://localhost:8000/${element.id}`;
        const PutPromise = fetch(endpoint, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
                },
        body:   JSON.stringify({
                "user"   : data.user,
                "balance": parseInt(data.balance) - expense,
                "history": data.history + `Expense : ${expense},`
                })
        });
        PutPromise
        .then((response) => response.json())
        .then((data) => {
            Balance.innerHTML = `${data.balance}`;
            history.innerHTML += `
            <div class = "history">
            <h1 style="font-family: Nunito ; font-size: 45px">Expense : ${expense}</p>
            </div>`;
            console.log(history_list)
        })
            })

}

// Hide Body
function hideBody(){
    var x = document.getElementById("mainpage");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }    
}