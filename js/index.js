function letters(letter){
    switch(letter){
        case 1:
            return "images/cards/assassino.png"
        case 2:
            return "images/cards/capitao.png"
        case 3:
            return "images/cards/condensa.png"
        case 4:
            return "images/cards/duque.png"
        case 5:
            return "images/cards/embaixador.png"
        default:
            return "images/cards/verso.png"
    }
}

function lobby(data, messages){
    data.forEach(user => {
        const message = document.createElement('li');
        message.classList.add('list-group-item');
        message.textContent = user.name;
        messages.appendChild(message);
        
    });
}

function print_coins(value, coins){
    const silver = value%5;
    const gold = Math.floor(value/5);

    for (let i = 0; i < silver; i++) {
        const coinSilver = document.createElement('img');
        coinSilver.classList.add('coins');
        coinSilver.src = "images/coins/silver.png"
        coins.appendChild(coinSilver)
    }

    for (let i = 0; i < gold; i++) {
        const coinGold = document.createElement('img');
        coinGold.classList.add('coins');
        coinGold.src = "images/coins/gold.png"
        coins.appendChild(coinGold)
    }
}


function showButtons(ws,userId,actions, action){

    actions.forEach(body => {

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.classList.add('mt-3');
        btn.classList.add('button');
        btn.classList.add('w-100');
        btn.textContent = body.name;
        btn.onclick= () => sendAction(ws, userId, body.code);
        action.appendChild(btn);


    })


    return 

}

function sendAction(ws,idUser,code){
    let str = `{
        "type":"Action",
        "userAction": "${idUser}",
        "revicedAction": "${idReviced}",
        "action": "${code}"
      }`;
    ws.send(str)
}


function actionGame(data,table,hand, action){
    data.players.forEach(body => {
        if(body.id == clientId){
            
            if(body.letters[0].hide){
                const letter = document.createElement('img');
                letter.classList.add('letter');
                letter.src = letters(body.letters[0].id)
                hand.appendChild(letter)
            }
            if(body.letters[1].hide){
                const letter = document.createElement('img');
                letter.classList.add('letter');
                letter.src = letters(body.letters[1].id)
                hand.appendChild(letter)
            }

            
            const coins = document.createElement('div');
            coins.classList.add('hand-enemy');
            hand.appendChild(coins);

            print_coins(body.coins, coins);




        }else{
            const player = document.createElement('div'); 
            player.classList.add('player');
            const name = document.createElement('p');
            name.textContent = body.name
            player.appendChild(name)
            const hand = document.createElement('div');
            hand.classList.add('hand-enemy')
            player.appendChild(hand)

            const coins = document.createElement('div');
            coins.classList.add('hand-enemy')
            player.appendChild(coins)

            if(body.letters[0].hide){
                const letter = document.createElement('img');
                letter.src = letters(6)
                letter.classList.add('letter');
                hand.appendChild(letter)
            }else{
                const letter = document.createElement('img');
                letter.classList.add('letter');
                letter.src = letters(body.letters[0].id)
                hand.appendChild(letter)
            } 
            if(body.letters[1].hide){
                const letter = document.createElement('img');
                letter.src = letters(6)
                letter.classList.add('letter');
                hand.appendChild(letter)
            }else{
                const letter = document.createElement('img');
                letter.classList.add('letter');
                letter.src = letters(body.letters[1].id)
                hand.appendChild(letter)
            }
            table.appendChild(player)

            print_coins(body.coins, coins);
            

        }                                
    });

    if(Array.isArray(data.action)){

    }else{
        const message = document.createElement('p');
        message.textContent = data.action
        message.classList.add('TEXT');
        action.appendChild(message)

    }
}