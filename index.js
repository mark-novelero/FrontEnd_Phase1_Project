let mainContainer = document.querySelector("div.candidates")

let theForm = document.querySelector('form.user_comment')
let textAreaValue = document.querySelector('textarea')
let ulSmackTalk = document.querySelector('ul.comments')

let copyObj = {}

fetch("http://localhost:3000/ballers")
.then (res => res.json())
.then (ballers => {
    console.log(ballers)
    ballers.forEach(hoopObj => {
        ballerfy(hoopObj)        
    })
    copyObj = ballers
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
             voteButton.innerText = "THANKS!"
             voteButton.disabled = true
         })        
    })
}

fetch("http://localhost:3000/comments")
.then (res => res.json())
.then (comment => {
comment.forEach(userComment => {
let newLi = document.createElement('li')
newLi.innerText = userComment.comment
ulSmackTalk.append(newLi) 
})
})




theForm.addEventListener('submit' , (evt)=>{
    evt.preventDefault()
    let userComment = textAreaValue.value

     fetch("http://localhost:3000/comments", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
             comment: userComment
         }),
       })
       .then(res => res.json())
       .then(newObj => {
           postComment(newObj)
       })
    })


function postComment (obj){
    let blankLi = document.createElement('li')
           blankLi.innerText= obj.comment
           ulSmackTalk.append(blankLi)

}    

 



    
   
  

  




// let newLi = document.createElement('li')
// newLi.innerText = userSmack
// ulSmackTalk.append(newLi)



