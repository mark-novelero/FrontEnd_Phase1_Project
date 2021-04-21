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

    let stats = document.createElement('h4')
    stats.innerText= obj.accomplishments
    
    let playerImg = document.createElement('img')
    playerImg.id = obj.team
    playerImg.src = obj.image

    let voteCount = document.createElement('h3')
    voteCount.className = "voteCount"
    voteCount.innerText = obj.likes

    let voteButton = document.createElement('button')
    voteButton.className = obj.team
    voteButton.innerText = "VOTE " + obj.name 
    

    mainContainer.append(player, stats, playerImg, voteCount, voteButton)

   
    
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
             voteButton.innerText = "THANK YOU"
             voteButton.disabled = true
         })        
    })
}

// let theForm = document.querySelector('form.user_comment')
// let textAreaValue = document.querySelector('textarea')
// let ulSmackTalk = document.querySelector('ul.comments')

// theForm.addEventListener('submit' , (evt)=>{

//     evt.preventDefault()
//     let userSmack = textAreaValue.value

//      fetch("http://localhost:3000/ballers/", {
//          method: "POST",
//          headers: {
//            "Content-Type": "application/json",
//          },
//          body: JSON.stringify({
//              reasons: userSmack,
//              id: 1
//          }),
//        })
//        .then (res => res.json())
//        .then (mjObj => {
//           let newLi = document.createElement('li')
//            newLi.innerText = mjObj.reasons
//            ulSmackTalk.append(newLi)
//        })
//      })




// let newLi = document.createElement('li')
// newLi.innerText = userSmack
// ulSmackTalk.append(newLi)



