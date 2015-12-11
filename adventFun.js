//============================
//============================
// DAY 1
//============================
//============================

function adventOne(string){
	var array = string.split("");
	var count = 0;
	for (var i = 0; i < array.length; i++){
		if (array[i] == "("){
			if (count < 0){
				return i;
			}
			count++
		} else if (array[i] == ")"){
			if (count < 0){
				return i;
			}
			count--;
		}
	}
	return count;
}

["3x11x24",
"13x5x19",
"1x9x27"]

//============================
//============================
// DAY 2
//============================
//============================

function adventTwo(array){
	debugger;
	var count = 0;
	for(var i = 0; i < array.length; i++){
		var dim = array[i].split("x").sort(function(b,c){return Number(b) - Number(c)});
		var initRibbon = 2*Number(dim[0]) + 2*Number(dim[1]);
		var bow = dim.reduce(function(a,b){return a*b});
		count += (initRibbon + bow);
	}
	return count;
}

//============================
//============================
// DAY 3
//============================
//============================

function adventThree(string){
	debugger;
	var directions = string.split("");
	var locationSanta = [0,0];
	var locationRobo = [0,0];
	var houses = ["0and0"];
	for (var i = 0; i < directions.length; i++){
		if (i%2 == 0){
			if (directions[i] == "^"){
				locationSanta[1] += 1;
			} else if (directions[i] == "v"){
				locationSanta[1] -= 1;
			} else if (directions[i] == ">"){
				locationSanta[0] += 1;
			} else if (directions[i] == "<"){
				locationSanta[0] -= 1;
			}
			var locString = locationSanta[0].toString() + "and" + locationSanta[1].toString();
		} else {
			if (directions[i] == "^"){
				locationRobo[1] += 1;
			} else if (directions[i] == "v"){
				locationRobo[1] -= 1;
			} else if (directions[i] == ">"){
				locationRobo[0] += 1;
			} else if (directions[i] == "<"){
				locationRobo[0] -= 1;
			}
			var locString = locationRobo[0].toString() + "and" + locationRobo[1].toString();
		}
		if (houses.indexOf(locString) < 0){
			houses.push(locString)
		};
	}
	return houses.length;
}

//============================
//============================
// DAY 4
//============================
//============================






//============================
//============================
// DAY 5
//============================
//============================

function adventFive(array){
	var goodStrings = [];
	for (var i = 0; i < array.length; i++) {
		if (oneAndDone(array[i]) && twoPairs(array[i])){
			goodStrings.push(array[i])
		}
	}
	return goodStrings;
}

function vowelCheck(string){
	var vowelCount = 0;
	var splitStr = string.split("");
	for (var j = 0; j < splitStr.length; j++) {
		if (/^[aeiou]$/i.test(splitStr[j])){
			vowelCount++;
		}
	}
	if (vowelCount > 2) {
		return true
	}
	return false;
}

function oneAndDone(string){
	var splitStr = string.split("");
	for (var i = 0; i < splitStr.length; i++) {
		if (splitStr[i] == splitStr[i+2]){
			return true;
		}
	}
	return false;
}

function twoPairs(string){
	var splitStr = string.split("");
	for (var i = 0; i < splitStr.length; i++) {
		if (splitStr.slice(i+2).join("").indexOf(splitStr[i] + splitStr[i+1]) >= 0){
			return true;
		}
	}
	return false;
}

//============================
//============================
// DAY 6
//============================
//============================

function createGrid(){
	var grid = [];
	for (var x = 0; x < 1000; x++){
		grid[x] = [];
		for (var y = 0; y < 1000; y++){
			grid[x][y] = {brightness: 0};
		}
	}
	return grid;
}

function adventSix(data){
	debugger;
	var grid = createGrid();
	var dataParser = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;
	for (var i = 0; i < data.length; i++){
		var input = data[i].match(dataParser);
		var command = input[1];
		var x1 = +input[2];
		var x2 = +input[4];
		var y1 = +input[3];
		var y2 = +input[5];

		for (var j = x1; j <= x2; j++){

			for (var k = y1; k <= y2; k++){

				switch(command)
				{
					case "turn on":
					{
						grid[j][k].brightness += 1;
						break;
					} 
					case "turn off":
					{
						if (grid[j][k].brightness > 0){
							grid[j][k].brightness -= 1;
						}
						break;
					} 
					case "toggle":
					{
						grid[j][k].brightness += 2;
						break;
					}
				}
			}
		}
	}
	var lightsOn = 0;
	for (var x = 0; x < grid.length; x++){
		for (var y = 0; y < grid[x].length; y++){
			lightsOn += grid[x][y].brightness;
		}
	}
	return lightsOn;
}

//============================
//============================
// DAY 7
//============================
//============================



//============================
//============================
// DAY 8
//============================
//============================

function adventEight(array){
	debugger;
	var codeLength = array.join("").length;
	var realLength = 0;
	for (var i = 0; i < array.length; i++) {
		var wordWithoutQuotes = array[i].slice(1, array[i].length-1);
		var realWord = array[i].slice(1, array[i].length-1).replace(/(\\\")|(\\\\)|(\\x\w\w)/g, "B")
		realLength += realWord.length;
	}
	return [codeLength, realLength, (codeLength - realLength)];
}


['\"\"', '\"abc\"', '\"aaa\\aaa\"', '\"\\x27\"' ]
function partTwoAdventEight(array){
	debugger;
	var codeLength = array.join("").length;
	var realLength = 0;
	function convertToBs(match, quote, slashquote, doubleslash, slashx){
		var newQuote = "";
		var newSlashquote = "";
		var newDoubleslash = "";
		var newSlashx = "";
		if (quote){
			newQuote = "BB";
		} 
		if (slashquote){
			newSlashquote = "BBBB";
		}
		if (doubleslash){
			newDoubleslash = "BBBB";
		}
		if (slashx){
			newSlashx = "BBB";
		}
		return newQuote + newSlashquote + newDoubleslash + newSlashx;
	}
	for (var i = 0; i < array.length; i++) {
		var wordWithoutQuotes = array[i].slice(1, array[i].length-1);
		var temp = array[i].replace(/(\")|(\\\")|(\\\\)|(\\x)/g, convertToBs);
		realLength += temp.length + 2;
	}
	return [codeLength, realLength, (realLength - codeLength)];
}


//============================
//============================
// DAY 9
//============================
//============================






//============================
//============================
// DAY 10
//============================
//============================
function speak(n) {
 var newStr = "";
 var count = 0;
 var currChar = n[0];
 for (var i = 0; i < n.length; i++) {
   if (currChar == null || currChar == n[i]) {
     count += 1;
   } else {
     newStr += count + currChar;
     count=1
     currChar=n[i];
   }
 }
 newStr += count + currChar;

 return newStr;
}


var input = "3113322113";

function adventTen(start, n){
	debugger;
	var input = start;
	for (var i = 0; i < n; i++){
		var x = input.match(/(\w)\1*/g).map(function(el){return el.length + el[0]}).join("");
		input = x;
	}
	return input.length;
}


function interpreter(arr){
	var newString = "";
	for (var k = 0; k < arr.length; k++){
		newString += (arr[k].length + arr[k][0]);
	}
	return newString;
}

function splitter(input){
	var groups = [];
	var raw = oneRound(input);
	if (typeof(raw) == "string"){
		groups = raw.split(",");
	} else {
		for (var y = 0; y < raw.length; y++){
			if (raw[y].indexOf(",") < 0){
				groups.push(raw[y]);
			} else {
				var pairs = raw[y].split(",");
				pairs.forEach(function(el){
					groups.push(el);
				});
			}
		}
	}
	return groups;
}


function oneRound(string){
	debugger;
	if (string == ""){
		return [];
	} else if (string[0] != string[1]){
		return [string[0]].concat(oneRound(string.slice(1)))
	} else if (string[0] == string[1]){
		return [string[0]] + [oneRound(string.slice(1))];
	}
}



















