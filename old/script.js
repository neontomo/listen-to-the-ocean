var endangeredFish = [
	['Atlantic Bluefin Tuna', 'https://i.imgur.com/ZSDz5sz.png', 'Western & eastern Atlantic Ocean, the Mediterranean Sea'],
	['Chinese Sturgeon', 'https://i.imgur.com/j1mpG3o.png', 'China, Japan, the Korean Peninsula'],
	['Winter Skate', 'https://i.imgur.com/K1g3VQK.png', 'Northwest Atlantic Ocean'],
	['European Eel', 'https://i.imgur.com/mAPhpaH.png', 'European waters'],
	['Red Handfish', 'https://i.imgur.com/TnxPG2T.png', 'Frederick Henry Bay, Tasmania'],
	['Nassau Grouper', 'https://i.imgur.com/QCxlDRc.png', 'Western Atlantic Ocean, Caribbean Sea'],
	['Orange Roughy', 'https://i.imgur.com/04xvEjX.png', 'Western Pacific Ocean, eastern Atlantic Ocean, Indo-Pacific, eastern Pacific off Chile'],
	['Southern Bluefin Tuna', 'https://i.imgur.com/2ZK5Fgy.png', 'Southern Hemisphere waters of all the world\'s oceans'],
	['Beluga Sturgeon', 'https://i.imgur.com/vAmGdde.png', 'The Caspian and Black Sea basins'],
	['Atlantic Halibut', 'https://i.imgur.com/5UJe2Y8.png', 'Northern Atlantic, the Barents Sea']
];

var endangeredCorals = [
	['Staghorn coral', 'https://i.imgur.com/tCsGVWp.png', 'Florida Keys, the Bahamas, the Caribbean islands, the western Gulf of Mexico'],
	['Elkhorn coral', 'https://i.imgur.com/etPYUEC.png', 'The Carribean'],
	['Indo Gold Torch coral', 'https://i.imgur.com/8V2zq9M.png', 'Australia, Indonesia'],
	['Favite coral', 'https://i.imgur.com/eZH3AC3.png', 'The Indo-Pacific region, the Red Sea through the Indian Ocean and Western Pacific Ocean']
];

function loopFish() {
		$('#results_image').css({right: '-600px'});
		$('#results_image').animate ({
				right: '+=' + ($(window).width() + 600),
		}, 15000, 'linear', function() {
				loopFish();
		});
}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(endangeredFish).each(function () {
	$('#endangered_fish').append(
		'<div class="fish">'
			+ '<a region="' + this[2] + '" href="#">'
				+ '<span>' + this[0] + '</span>'
				+ '<img src="' + this[1] + '" />'
			+ '</a>'
		+ '</div>'
	);
});

$(endangeredCorals).each(function () {
	$('#endangered_corals').append(
		'<div class="coral">'
			+ '<a region="' + this[2] + '" href="#">'
				+ '<span>' + this[0] + '</span>'
				+ '<img src="' + this[1] + '" />'
			+ '</a>'
		+ '</div>'
	);
});

$('.fish a').click(function () {
	$('#results_image').attr('src', $(this).find('img').attr('src'));
	$('#results_image_dead').attr('src', $(this).find('img').attr('src'));
	$('#results_name').html($(this).find('span').html());
	$('#results_region').html($(this).attr('region'));
	$('#results_fishing_rate').html(randomInteger(4, 6) + '.' + randomInteger(1, 9) + ' million metric tons');
	$('#results').show();
	$('#endangered_fish,#endangered_corals').hide();
	$('#prediction,#prediction2').hide();
	loopFish();
});

$('.coral a').click(function () {
	$('#results_image').attr('src', $(this).find('img').attr('src'));
	$('#results_image_dead').attr('src', $(this).find('img').attr('src'));
	$('#results_name').html($(this).find('span').html());
	$('#results_dangers').html('Pollution, climate change');
	$('#results_region').html($(this).attr('region'));
	$('#results_fishing_rate').html('Not applicable');
	$('#results').show();
	$('#endangered_fish,#endangered_corals').hide();
	$('#prediction,#prediction2').hide();
	clearInterval(results_image_interval);
});

$('#results').hide();

rotates = [-20, 0, 20, 0];
rotate = 0;

function getRotate() {
		rotate = (rotate >= rotates.length - 1) ? 0 : (rotate + 1);
		return rotates[rotate];
}

var results_image_interval = setInterval(function () {
	var direction = getRotate();
	$('.fish img').css('transform', 'rotateY(' + direction + 'deg)');
	$('#results_image').css('transform', 'rotateY(' + direction + 'deg)');
}, 200);

$('#go-back').click(function () {
	location.reload();
});

$('#calculate-extinction').click(function () {
	loadExtinction();
});

function loadExtinction() {
	$('#calculate-extinction').hide();
	$('#extinction_calculator').show();
	$('#results_image').stop().fadeOut(1000);
	$('#results_image_dead').fadeIn(2000).animate({'bottom': '30px'}, {duration: 10000, queue: false});
	var loadStuff = setInterval(function () {
			var newPercentage = Number($('#loader').css('width').replace('px', '')) + 5;

			if (newPercentage > 490) {
					clearInterval(loadStuff);
					$('#extinction_calculator').hide();
					$('.years').html(randomInteger(20, 40) + '.' + randomInteger(1, 9));
					$('#revenue-loss').html((Number($('#results_fishing_rate').html().split(' ')[0]) * 7.84615384615).toFixed(1));
					if ($('#results_name').html().match(/coral/)) {
						$('#prediction2').show();

					} else {
						$('#prediction').show();
					}
			}
			$('#loader').css('width', newPercentage + 'px');
	}, 20);
}
function createBubble() {
	var newElement = $('<div id="' + randomInteger(0, 10000) + '" class="bubble"><img width="20" src="https://i.imgur.com/dL1SrSG.png" /></div>');
	$('#main').append(newElement);
	$(newElement).css('left', randomInteger(10, $(window).width()));
	$(newElement).css('zoom', randomInteger(0, 1) + '.' + randomInteger(0, 5));
	$(newElement).css('transform', 'rotateZ(' + randomInteger(0, 300) + 'deg)');
	$(newElement).animate({top: '-100px'}, randomInteger(19000, 25000), function () {
		$(this).remove();
	});
}

for (var i = 0; i < 20; i++) {
	createBubble();
}

setInterval(function () {
	createBubble();
}, 600);

$('body').on('dblclick', function () {
	window.location.href = '../';
});
