let mainContainer = document.querySelector("div.candidates")

fetch("http://localhost:3000/ballers")
.then (res => res.json())
.then (ballers => {
    ballers.forEach(hoopObj => {
        ballerfy(hoopObj)
    })
})



function ballerfy (obj){
    
    let player = document.createElement('h2')
        player.innerText = obj.name
    
    let playerImg = document.createElement('img')
    playerImg.src = obj.image

    let voteCount = document.createElement('h3')
    voteCount.className = "voteCount"
    voteCount.innerText = obj.likes

    let voteButton = document.createElement('button')
    voteButton.innerText = "VOTE"

    mainContainer.append(player, playerImg, voteCount, voteButton)


    voteButton.addEventListener('click' , (evt) => {

        fetch(`http://localhost:3000/ballers/${obj.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify({
                likes: obj.likes += 1
            })
        })
         .then (res => res.json())
         .then (updatedObj => {
             voteCount.innerText = updatedObj.likes
             obj.likes = updatedObj.likes
         })        
    })
}


