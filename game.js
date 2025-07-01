// alert("Let;s play a game")\
let buttoncolor = ["red", "blue", "green", "yellow"]
let gamepattern =[]
let userclickedPattern =[]
var level = 0;

$(document).keydown(function (event){
    $('h1').html(`Level 0`)
    nextSequence()
})

function nextSequence(){
    level = level+1;
    $('h1').html(`Level ${level}`)
    let randomnum = Math.floor(Math.random() * 4)
    let randomColor = buttoncolor[randomnum];
    gamepattern.push(randomColor);
    $("#"+ randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomColor);
}

$('.btn').on('click', function(evt){
    var id = evt.currentTarget.id;
    userclickedPattern.push(id)
    playSound(id)
    animatePress(id)
    checkAnswer(userclickedPattern.length-1);

})

function playSound(name){
    var audio = new Audio('sounds/' + name +'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $('.'+ currentColor ).addClass('pressed')
    setTimeout(() => {
        $('.'+ currentColor ).removeClass('pressed')
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel]==userclickedPattern[currentLevel])
    {
        if(userclickedPattern.length===gamepattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userclickedPattern=[];
        }
    }
    else
    {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 500);
        $('h1').html("Game Over! , Press any key to restart");
        startOver()
    }
}

function startOver()
{
    level=0;
    gamepattern=[];
    userclickedPattern=[];
}