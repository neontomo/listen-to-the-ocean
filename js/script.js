/*

TODO:
Corals smaller on mobile
Audio on mobile

*/
var amountFishImages = 60
var amountBubbles = 9
let amountFish = $(window).width() / (140 / 5) // adjust amount to screen size
amountFish = Math.round(amountFish / 10) * 10 // closest 10
amountFish = amountFish < 20 ? 20 : amountFish

function fishBB(fish) {
  return fish[0].getBoundingClientRect()
}

function randomID(len) {
  var id = ''
  var type = 0
  var len = len ? len : 20
  var c = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    's',
    't',
    'v',
    'x',
    'z',
    'h',
    'r',
    'w',
    'y'
  ]
  var v = ['a', 'e', 'i', 'o', 'u']

  for (var i = 0; i < len; i++) {
    if (type == 0) {
      var add = c[randomInteger(0, c.length - 1)]
    } else {
      var add = v[randomInteger(0, v.length - 1)]
    }
    type = type == 0 ? 1 : 0
    id += add
  }
  return id.match(new RegExp('.{1,4}', 'g')).join('-')
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDecimal(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

// score
function setCurrentScore(score) {
  sessionStorage.setItem('score', score)
}

function getCurrentScore() {
  var currentScore = Number(sessionStorage.getItem('score'))
  currentScore = currentScore ? currentScore : '0'
  return currentScore
}

// highscore
function setHighScore(score) {
  localStorage.setItem('highscore', score)
}

function getHighScore() {
  var highScore = Number(localStorage.getItem('highscore'))
  highScore = highScore ? highScore : 0
  return highScore
}

function updateScores() {
  if ($('.fish:not([dead])').length > 0) {
    // if fish are alive
    var score = getCurrentScore()
    if (score > getHighScore()) {
      setHighScore(score)
    }
  } else {
    $('#curtains').fadeIn(5000)
  }
}

function boostScore() {
  if (isGameFinished() == false) {
    var score = Number(getCurrentScore())
    setCurrentScore(score + 1)
  }
}

function isGameFinished() {
  var result = $('.fish:not([dead])').length == 0 ? true : false
  return result
}

function playAudio(which, vol) {
  var volume = volume ? volume : 1
  var audio = new Audio('audio/' + which + '.mp3')
  audio.volume = vol
  audio.play()
}

function placeRandom(fish, direction) {
  var marginTop = 300
  var marginOutside = 300
  var top = randomInteger(0, $(document).height() - marginTop) + 'px'
  var left =
    direction == 0 ? marginOutside * -1 : $(window).width() + marginOutside
  $(fish).css({ top: top, left: left })
}

function moveRandom(fish, direction, speed) {
  var margin = 140
  var top = randomInteger(0, $(document).outerHeight() - margin) + 'px'

  var deg = Math.round(top / ($(document).outerHeight() / 20) - 10) * -1
  deg = direction == 0 ? deg * -1 : deg

  var left = direction == 0 ? $(window).width() + margin : margin * -1
  var speed = speed ? speed : Number(fish.attr('speed'))
  //speed = 1000;

  fish.css({ transform: 'rotate(' + deg + 'deg)' }).animate(
    {
      left: left,
      top: top
    },
    speed,
    function () {
      var newDirection = direction == 0 ? 1 : 0
      fish.attr('direction', newDirection)
      moveRandom(fish, newDirection)
    }
  )
}

function generateFish(which) {
  var direction = randomInteger(0, 1)
  var flap = randomInteger(0, 1)
  var which =
    which === undefined || which === false
      ? randomInteger(0, amountFishImages)
      : which
  var size = randomInteger(40, 150)

  var fish = $('<div>')
    .attr('direction', direction)
    .attr('class', 'fish')
    .attr('id', randomID(6))
    .attr('which', which)
    .attr('speed', randomInteger(5000, 75000))
    .css({ width: size, 'z-index': size * 1000 })

  var fishImg = $('<img>')
    .attr('src', 'img/fish/' + which + '.png')
    .attr('flap', flap)

  fish.append(fishImg)

  placeRandom(fish, direction)
  moveRandom(fish, direction)
  $('#all_fish').append(fish)
}

function killFish(fish) {
  //playAudio('death' + randomInteger(0,2), 0.3);
  var speed = randomInteger(5000, 10000)
  fish
    .stop()
    .attr('dead', 'true')
    .animate(
      { top: $(window).height() - 50 },
      { duration: speed, queue: false }
    )
  $('#fishCountDead').html(Number($('#fishCountDead').html()) + 1) // update dead counter
}

function createBubble() {
  var speed = randomInteger(19000, 25000)
  var left = randomInteger(10, $(window).width() - 10)
  var zoom = randomDecimal(0.1, 1.5)
  var imgSrc = 'img/bubbles/' + randomInteger(0, amountBubbles) + '.png'

  var bubble = $('<div>')
    .attr('id', randomID(6))
    .attr('class', 'bubble')
    .css({ left: left, zoom: zoom })

  var bubbleImg = $('<img>').attr('src', imgSrc)

  bubble.append(bubbleImg)
  $('#bubbles').append(bubble)

  bubble.animate({ top: -100 }, speed, function () {
    $(this).remove()
  })
}

function createTrash() {
  var types = [
    'bag',
    'can-red',
    'coffee-cup',
    'milk',
    'bottle',
    'flipflop',
    'sunglasses',
    'battery',
    'lightbulb',
    'gasoline'
  ]
  var which = types[randomInteger(0, types.length - 1)]
  var width = randomInteger(20, 30)
  var left = randomInteger(50, $(window).width() - 50)
  var toLeft = randomInteger(0, 1) == 0 ? left + 200 : left - 200
  var rotate =
    'rotate' +
    randomInteger(1, 2) +
    ' ' +
    randomInteger(3, 8) +
    's linear infinite'
  var speed = randomInteger(2000, 30000)

  var trash = $('<div class="trash">')
    .attr('which', which)
    .attr('id', randomID(6))
    .css({ width: width, top: -100, left: left, animation: rotate })
    .animate(
      { top: $(window).height() + 100, left: toLeft },
      speed,
      function () {
        $(this).remove()
      }
    )

  var trashImg = $('<img>').attr('src', 'img/trash/' + which + '.png')

  trash.append(trashImg)
  $('#all_trash').append(trash)
}

/* Intervals & timeouts */

setInterval(function () {
  // flap the fish
  $('.fish:not([dead]) img').each(function () {
    var flap = Number($(this).attr('flap')) == 0 ? 1 : 0
    $(this).attr('flap', flap)
  })
  updateScores()
  $('.score').html(getCurrentScore())
  $('.highscore').html(getHighScore())
}, 200)

setInterval(function () {
  createBubble()
}, 600)

setTimeout(function () {
  var intervalTrash = $(window).width() / ($(window).width() / 600)
  setInterval(function () {
    createTrash()
  }, intervalTrash)
}, 5000)

setInterval(function () {
  // check collisions
  $('.trash').each(function () {
    var collision = $(this).collision('.fish:not([dead])')
    if (collision.length > 0) {
      $(this).remove()
      killFish($(collision[0]))
    }
    var collision = $(this).collision('#bin')
    if (collision.length > 0) {
      $(this).remove()
      boostScore()
      //			playAudio('paper', 1);
    }
  })
}, 100)

/* Stuff */

for (var i = 0; i < amountFish; i++) {
  // add fish
  generateFish()
}

$(document).on('mousemove', function (e) {
  var x = e.pageX
  var y = e.pageY
  var w = parseInt($('#bin').css('width')) / 2
  var h = parseInt($('#bin').css('height')) / 2
  $('#bin').css({ top: y - h, left: x - w })
})

$('#play_again').on('click', function () {
  window.location.reload()
})

$('#fishCountAlive').html(amountFish)
setCurrentScore(0)

/*$(document).on('click', function() {
	playAudio('paper', 0);
});*/
