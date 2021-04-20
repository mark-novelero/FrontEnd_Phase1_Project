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
    voteButton.innerText = "VOTE " + obj.name 

    let h3comment = document.createElement('h3')
    h3comment.className = "user comments"
    h3comment.innerText = "Why " + obj.name

    let formPlayer = document.createElement("form")
    formPlayer.className= "userinput"

    let whatUserTyped = document.createElement("textarea")
    formPlayer.append(whatUserTyped)

    let commentButton = document.createElement('button')
    commentButton.className = 'reasons'
    commentButton.innerText = 'Post'

    let h4Title = document.createElement('h4')
    h4Title.innerText = 'User Comments'

    let ulComments = document.createElement('ul')
    let blankLi = document.createElement('li')
    blankLi.innerText= obj.reasons

    ulComments.append(blankLi)

    mainContainer.append(player, playerImg, voteCount, voteButton, h3comment, formPlayer, commentButton, h4Title, ulComments)

    


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

let formComments = document.querySelector("form.user_comment")
let userComment = document.querySelector('textarea')
console.log(userComment)

formComments.addEventListener('submit' , (evt) => {
    evt.preventDefault()

    
 
})

