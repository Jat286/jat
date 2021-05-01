/*

    TTFOUR AND JATGAMES PRESENT

|‾\     /‾|      /‾\
|  \   /  |     / _ \     _____________
| \ \_/ / |    / /_\ \    | DEFENDERS |    
| |\___/| |   /  ___  \   ‾‾‾‾‾‾‾‾‾‾‾‾‾
| |     | |  / /     \ \
|_|     |_| /_/       \_\  

Original Engine Copyright (c) 2013 dissimulate at Codepen (codepen.io)
Story Jomun Rights NoCopy Tomo Technology Four
Game/Level Design Jomun Rights NoCopy Jomuneziun A Technology Games
The pronounciation of 'Ma' is 'Mah' and 't'Honza' is 'Honza'

THIS IS THE ORIGNIAL VERSION. FOR THE ACCESSIBLE, PLEASE SEE MAACCESSIBLE.JS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Game Story:
The Sacred Ma of the Tomobugs was once kept in the three Temples of The Ma in The Jungle. 
While they remained safe, the land of t'Honza was happy and well. One fateful day,
10000 years ago, a dark spirit called Evilz caused three great floods of the city 
and in each one snuck into the temples to steal the sacred pieces of The Ma. You are a 
young Tomobug who is a member of the MaDefenders, a secret group of bugs determined to 
save The Ma. You start your mission by making your way through MaDefenders HQ before
heading out into the Desert and beyond... Can you save The Ma from Evilz? No-one knows.   

*/

function runGame () {

/*CHECK ENERGY 0*/

setInterval(function(){ 
    if (document.getElementById("energy").value == 0) {
        document.getElementById("energy").value = 5;
	    alert("A PACKET OF PEPPER!!!");
    };
}, 10);

/*LEVEL 1 ENGINE*/

var map = {

    tile_size: 18,

    /*
    
    Key vairables:
    
    id       [required] - an integer that corresponds with a tile in the data array.
    colour   [required] - any javascript compatible colour variable.
    solid    [optional] - whether the tile is solid or not, defaults to false.
    bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
    jump     [optional] - whether the player can jump while over the tile, defaults to false.
    friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
    script   [optional] - refers to a script in the scripts section, executed if it is touched.
    
    */
    
    keys: [
        {id: 0, colour: '#444', solid: 0}, //bg
        {id: 1, colour: 'lightblue', solid: 0}, //air
        {id: 2,colour: '#813319',solid: 1,bounce: 0.35}, //brick 
        {id: 3,colour: '#0077BE',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1}, //water
        {id: 4,colour: '#C0C0C0'}, //elevator inside
        {id: 5,colour: '#007600',solid: 1,bounce: 1.1}, //tree
        {id: 6,colour: 'purple',solid: 1,bounce: 0}, //landings
        {id: 7,colour: '#807153',solid: 0}, //trunk
        {id: 8,colour: '#FADF73',solid: 0,script: 'next_level'}, //goal
        {id: 9,colour: '#C93232',solid: 0,script: 'death'}, //lava
        {id: 10,colour: '#813319',solid: 1}, //closed vent
        {id: 11,colour: 'lightblue',solid: 0,script: 'unlock'}, //unlock vent
        {id: 12,colour: '#44A6C6',solid: 0}, //decor block
        {id: 13,colour: 'lightblue',solid: 0,script: 'death'}, //void
        {id: 14,colour: 'lightblue',solid: 0,script: 'lock'}, //lock vent
        {id: 15,colour: '#E7F527',solid: 0,script: 'energybar'}, //popcake
        {id: 16,colour: '#E7F527',solid: 0,script: 'energybarthesecond'}, //popcake
        {id: 17,colour: '#C0C0C0',solid: 0,script: 'goUp'}, //elevator
        {id: 18,colour: '#C0C0C0',solid: 0,script: 'stopLifter'}, //elevator stop
        {id: 19,colour: '#C0C0C0',solid: 0,script: 'moveblock'}, //movestop
        {id: 20,colour: '#c0c0c0',solid: 0}, //1
        {id: 21,colour: 'lightblue',solid: 0}, //2
        {id: 22,colour: 'lightblue',solid: 0}, //3
    ],
    
    /*DATA*/
   
    data: [
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 12, 12, 1, 1, 1, 12, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 12, 1, 12, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 12, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 15, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 12, 1, 12, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 12, 1, 1, 1, 12, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 11, 10, 10, 2],
        [2, 1, 1, 12, 12, 12, 12, 12, 12, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 18, 2, 2, 2, 10, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 4, 2, 10, 10, 10, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 4, 2, 10, 2, 2, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 17, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 9, 9, 9, 2, 10, 10, 10, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 1, 1, 2],
        [2, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 6, 6, 2, 2, 2, 2, 2, 2, 9, 9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 2, 2, 2, 2, 9, 9, 2, 2, 2, 2, 2, 2, 2]
    ],
    
    /*GRAVITY*/
    
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 6,
        y: 2,
        colour: '#34bdff'
    },
    
    /*SCRIPTS*/

    scripts: {
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        next_level: 'document.getElementById("victory_sound").play();mapselect.player.x = 7;mapselect.player.y = 6;game.load_map(mapselect);mapselect.keys[4].colour = "#ddd";mapselect.keys[4].script = " ";document.getElementById("listofgames2").style.display = "block";document.getElementById("displayLevel").innerHTML = "Level 1/2: Ma Pyramid"',
        death: 'document.getElementById("game_over_sound").play();game.load_map(map);game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#813319";document.getElementById("energy").value -= 1',
        unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#555";',
        lock: 'game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#813319";',
        energybar: 'map.player.x = 34;map.player.y = 14;document.getElementById("ding").play();document.getElementById("energy").value += 1;game.current_map.keys[15].script = " ";game.current_map.keys[15].colour = "#999"',
        energybarthesecond: 'map.player.x = 20;map.player.y = 50;document.getElementById("energy").value += 1;game.current_map.keys[16].script = " ";game.current_map.keys[16].colour = "#999";document.getElementById("ding").play()',
        goUp: 'game.current_map.keys[4].gravity = {x:1,y:-0.005};game.current_map.keys[1].gravity = {x:1,y:-0.005}',
        stopLifter: 'game.current_map.keys[4].gravity = {x:0,y:0.3};game.current_map.keys[1].gravity = {x:0,y:0.3}',
        moveblock: ''
    }
    
};

/*LEVEL 2 ENGINE*/

var maptwo = {

    tile_size: 18,
    
    keys: [
        {id: 0, colour: '#444', solid: 0}, //bg
        {id: 1, colour: 'lightblue', solid: 0}, //air
        {id: 2,colour: '#EDA255',solid: 1,bounce: 0.35}, //brick 
        {id: 3,colour: '#555',solid: 0}, //inside pyramid
        {id: 4,colour: '#555',script: 'lavabanish'}, //nolava
        {id: 5,colour: '#007600',solid: 1,bounce: 1.1}, //tree
        {id: 6,colour: 'purple',solid: 1,bounce: 0}, //landings
        {id: 7,colour: '#EDA255',solid: 0, script: 'secondlock'}, //lock2
        {id: 8,colour: '#FADF73',solid: 0,script: 'next_level'}, //goal
        {id: 9,colour: '#C93232',solid: 0,script: 'death'}, //lava
        {id: 10,colour: '#EDA255',solid: 1}, //closed vent
        {id: 11,colour: 'lightblue',solid: 0,script: 'unlock'}, //unlock vent
        {id: 12,colour: '#44A6C6',solid: 0}, //decor block
        {id: 13,colour: 'lightblue',solid: 0}, //capstone
        {id: 14,colour: 'lightblue',solid: 0,script: 'lock'}, //lock vent
        {id: 15,colour: 'lightblue',solid: 1}, //end
        {id: 16,colour: '#EDA255',solid: 1}, //capstone2
        {id: 17,colour: '#0077BE',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1}, //water
        {id: 18,colour: '#0000B3',solid: 1}, //solid decor
        {id: 19,colour: '#C93232',solid: 0,script: 'death'}, //lava
        {id: 20,colour: '#E7F527',solid: 0,script: 'energybar'}, //popcake
        {id: 21,colour: '#E7F527',solid: 0,script: 'energybarthesecond'} //popcake
    ],
    
    /*DATA*/
   
    data: [
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 12, 1, 1, 1, 12, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 12, 1, 12, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 12, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 12, 1, 12, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 12, 1, 1, 1, 12, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 12, 12, 12, 12, 12, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 16, 11, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 7, 10, 2, 1, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 2, 1, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 2, 1, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 1, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 1, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 1, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 1, 15],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 15],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 12, 3, 3, 3, 2, 2, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 12, 3, 12, 3, 3, 2, 2, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 12, 3, 3, 3, 3, 2, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 12, 12, 12, 3, 3, 3, 3, 2, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 10, 10, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 10, 10, 10, 2, 2, 10, 10, 10, 2, 2, 10, 20, 10, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 4, 4, 4, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 9, 9, 9, 2, 2, 9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 6, 2, 2, 19, 19, 19, 19, 2, 2, 2, 2, 2, 2, 18, 2, 2, 2, 2, 18, 2, 2, 2, 2, 18, 2, 2, 2, 3, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 2, 2, 2, 2, 19, 2, 2, 2, 2, 19, 19, 2, 2, 6, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 21, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 19, 19, 6, 2, 2, 19, 19, 19, 19, 19, 19, 19, 2, 2, 2, 2, 2, 19, 19, 19, 19, 19, 19, 2, 2, 2, 2, 2, 3, 2],
        [2, 2, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2],
        [2, 2, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2],
        [2, 2, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2],
        [2, 2, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 2, 2, 2, 2, 2, 2, 2, 19, 19, 2, 19, 19, 2, 2, 2, 2, 2, 2, 19, 19, 2, 2, 2, 6, 2],
    ],

    /*GRAVITY*/
   
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 6,
        y: 2,
        colour: '#24BDFF'
    },
    
    /*SCRIPTS*/

    scripts: {
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        next_level: 'document.getElementById("victory_sound").play();mapselect.player.x = 12;mapselect.player.y = 4;game.load_map(mapselect);mapselect.keys[5].colour = "#ddd";mapselect.keys[5].script = " ";document.getElementById("listofgames3").style.display = "block";document.getElementById("displayLevel").innerHTML = "Level 1/3: Coral Sea"',
        death: 'document.getElementById("game_over_sound").play();game.load_map(maptwo);document.getElementById("energy").value -= 1',
        unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#555";game.current_map.keys[13].solid = 1;game.current_map.keys[13].colour = "#EDA255";game.current_map.keys[7].colour = "#555";game.current_map.keys[16].solid = 0;game.current_map.keys[16].colour = "#555"',
        lock: 'game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#EDA255";',
        secondlock: 'game.current_map.keys[13].solid = 0;game.current_map.keys[13].colour = "lightblue";game.current_map.keys[16].solid = 1;game.current_map.keys[16].colour = "#EDA255"',
        lavabanish: 'game.current_map.keys[9].script = " ";game.current_map.keys[9].colour = "#EDA255";game.current_map.keys[9].solid = 1',
        energybar: 'maptwo.player.x = 29;maptwo.player.y = 40;document.getElementById("energy").value += 1;game.current_map.keys[20].script = " ";game.current_map.keys[20].colour = "#999";document.getElementById("ding").play()',
        energybarthesecond: 'maptwo.player.x = 18;maptwo.player.y = 55;document.getElementById("energy").value += 1;game.current_map.keys[21].script = " ";game.current_map.keys[21].colour = "#999";document.getElementById("ding").play()'
    }
};

/*LEVEL 3 ENGINE*/

var mapthree = {

    tile_size: 18,
    
    keys: [
        {id: 0,colour: 'lightblue',solid: 0},//air
        {id: 1,colour: '#0077BE',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1},//water
        {id: 2,colour: '#E95770',solid: 1,bounce: 0.35}, //brick 
        {id: 3,colour: '#007600',solid: 1,bounce: 1.1}, //tree
        {id: 4,colour: 'purple',solid: 1,bounce: 0}, //landings
        {id: 5,colour: '#FADF73',solid: 0,script: 'next_level'}, //goal
        {id: 6,colour: '#C93232',solid: 0,script: 'death'}, //lava
        {id: 7,colour: '#fff',solid: 1}, //closed vent
        {id: 8,colour: 'lightblue',solid: 0,script: 'unlock'}, //unlock vent
        {id: 9,colour: 'lightblue',solid: 0,script: 'lock'}, //lock vent
        {id: 10,colour: '#44A6C6',solid: 0}, //decor block
        {id: 11,colour: '#555',solid: 0}, //decor block
        {id: 12,colour: 'purple',solid: 0,script: 'death'}, //thingy
        {id: 13,colour: '#0077BE',solid: 0,script: 'bad'}, //bad
        {id: 14,colour: '#0077BE',solid: 0}, //good
        {id: 15,colour: '#0077BE',solid: 0}, //bad2
        {id: 16,colour: '#0077BE',solid: 0}, //bad3        
    ],
    
    /*DATA*/
   
    data: [
        [2, 2, 2, 2, 11, 11, 11, 11, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 11, 11, 11, 11, 11, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 10, 0, 0, 0, 10, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 2, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 10, 0, 10, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 10, 10, 10, 10, 10, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 13, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],

    /*GRAVITY*/
    
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 6,
        y: 2,
        colour: '#24BDFF'
    },
    
    /*SCRIPTS*/

    scripts: {
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        next_level: 'document.getElementById("victory_sound").play();mapselect.player.x = 14;mapselect.player.y = 7;game.load_map(mapselect);mapselect.keys[6].colour = "#ddd";mapselect.keys[6].script = " ";document.getElementById("listofgames4").style.display = "block";document.getElementById("displayLevel").innerHTML = "Level 1/4: Dark Forest"',
        death: 'document.getElementById("game_over_sound").play();game.load_map(mapthree);document.getElementById("energy").value -= 1;mapthree.keys[13].colour = "#0077BE";mapthree.keys[15].colour = "#0077BE";mapthree.keys[16].colour = "#0077BE";mapthree.keys[13].solid = 0;mapthree.keys[15].solid = 0;mapthree.keys[16].solid = 0;',
        bad: 'game.current_map.keys[15].colour = "#E95770";game.current_map.keys[15].solid = 1;game.current_map.keys[16].colour = "purple";game.current_map.keys[16].script = "death"',
    }
};

/*LEVEL 4 ENGINE*/

var mapfour = {

    tile_size: 18,

    /*
    
    Key vairables:
    
    id       [required] - an integer that corresponds with a tile in the data array.
    colour   [required] - any javascript compatible colour variable.
    solid    [optional] - whether the tile is solid or not, defaults to false.
    bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
    jump     [optional] - whether the player can jump while over the tile, defaults to false.
    friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
    script   [optional] - refers to a script in the scripts section, executed if it is touched.
    
    */
    
    keys: [
        {id: 0, colour: '#444', solid: 0}, //bg
        {id: 1, colour: 'lightblue', solid: 0}, //air
        {id: 2,colour: '#813319',solid: 1,bounce: 0.35}, //brick 
        {id: 3,colour: '#0077BE',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1}, //water
        {id: 4,colour: '#C0C0C0'}, //elevator inside
        {id: 5,colour: '#007600',solid: 1,bounce: 1.1}, //tree
        {id: 6,colour: 'purple',solid: 1,bounce: 0}, //landings
        {id: 7,colour: '#807153',solid: 0}, //trunk
        {id: 8,colour: '#FADF73',solid: 0,script: 'next_level'}, //goal
        {id: 9,colour: '#C93232',solid: 0,script: 'death'}, //lava
        {id: 10,colour: '#813319',solid: 1}, //closed vent
        {id: 11,colour: 'lightblue',solid: 0,script: 'unlock'}, //unlock vent
        {id: 12,colour: '#44A6C6',solid: 0}, //decor block
        {id: 13,colour: 'lightblue',solid: 0,script: 'death'}, //void
        {id: 14,colour: 'lightblue',solid: 0,script: 'lock'}, //lock vent
        {id: 15,colour: '#E7F527',solid: 0,script: 'energybar'}, //popcake
        {id: 16,colour: '#E7F527',solid: 0,script: 'energybarthesecond'}, //popcake
        {id: 17,colour: '#C0C0C0',solid: 0,script: 'goUp'}, //elevator
        {id: 18,colour: '#C0C0C0',solid: 0,script: 'stopLifter'}, //elevator stop
        {id: 19,colour: '#C0C0C0',solid: 0,script: 'moveblock'}, //movestop
        {id: 20,colour: '#c0c0c0',solid: 0}, //1
        {id: 21,colour: 'lightblue',solid: 0}, //2
        {id: 22,colour: 'lightblue',solid: 0}, //3
    ],
    
    /*DATA*/
   
    data: [
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 12, 12, 1, 1, 1, 12, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 12, 1, 12, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 12, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 15, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 12, 1, 12, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 12, 1, 1, 1, 12, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 11, 10, 10, 2],
        [2, 1, 1, 12, 12, 12, 12, 12, 12, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 18, 2, 2, 2, 10, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 4, 2, 10, 10, 10, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 4, 2, 10, 2, 2, 2],
        [2, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 10, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 17, 4, 2, 10, 2, 2, 2, 2, 2, 8, 8, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 9, 9, 9, 2, 10, 10, 10, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 1, 1, 2],
        [2, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 6, 6, 2, 2, 2, 2, 2, 2, 9, 9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 2, 2, 2, 2, 9, 9, 2, 2, 2, 2, 2, 2, 2]
    ],
    
    /*GRAVITY*/
    
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 6,
        y: 2,
        colour: '#34bdff'
    },
    
    /*SCRIPTS*/

    scripts: {
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        next_level: 'document.getElementById("victory_sound").play();mapselect.player.x = 12;mapselect.player.y = 11;game.load_map(mapselect);mapselect.keys[10].colour = "#ddd";mapselect.keys[10].script = " ";document.getElementById("listofgames4").style.display = "block";document.getElementById("displayLevel").innerHTML = "Level 1/5: T`Honzan Clouds"',
        death: 'document.getElementById("game_over_sound").play();game.load_map(map);game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#813319";document.getElementById("energy").value -= 1',
        unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#555";',
        lock: 'game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#813319";',
        energybar: 'map.player.x = 34;map.player.y = 14;document.getElementById("ding").play();document.getElementById("energy").value += 1;game.current_map.keys[15].script = " ";game.current_map.keys[15].colour = "#999"',
        energybarthesecond: 'map.player.x = 20;map.player.y = 50;document.getElementById("energy").value += 1;game.current_map.keys[16].script = " ";game.current_map.keys[16].colour = "#999";document.getElementById("ding").play()',
        goUp: 'game.current_map.keys[4].gravity = {x:1,y:-0.005};game.current_map.keys[1].gravity = {x:1,y:-0.005}',
        stopLifter: 'game.current_map.keys[4].gravity = {x:0,y:0.3};game.current_map.keys[1].gravity = {x:0,y:0.3}',
        moveblock: ''
    }
    
};

/*SELECT LEVEL ENGINE*/

var mapselect = {

    tile_size: 18,
    
    keys: [
        {id: 0,colour: '#555',solid: 0}, //nothing
        {id: 1,colour: '#ccc',solid: 0},//air
        {id: 2,colour: 'green',solid: 1}, //brick
        {id: 3,colour: '#ccc',solid: 1}, //start
        {id: 4,colour: '#813319',solid: 0,script: 'lvlone'}, //lvl1
        {id: 5,colour: '#EDA255',solid: 0,script: 'lvltwo'}, //lvl2
        {id: 6,colour: '#E95770',solid: 0,script: 'lvlthree'}, //lvl3
        {id: 7,colour: '#0077BE',solid: 1}, //water
        {id: 8,colour: 'yellow',solid: 1}, //desert
        {id: 9,colour: '#555',solid: 1}, //rock
        {id: 10,colour: '#75816b',solid: 0,script: 'lvlfour'}, //lvl4
        {id: 11,colour: 'green',solid: 1}, //magic block
        {id: 12,colour: '#040',solid: 1}, //forest
        {id: 13,colour: 'purple',solid: 0,script: 'warp'}, //warp zone
        {id: 14,colour: '#ccc',solid: 0}, //magic closing path
        {id: 15,colour: 'yellow',solid: 0,script: 'wz'}, //wz
        {id: 16,colour: '#4ec474',solid: 0,script: 'lvlfive'}, //lvl5
        {id: 17,colour: '#B93232',solid: 0,script: 'lvlsix'}, //lvl6
        {id: 18,colour: '#777',solid: 0,script: 'lvlseven'}, //lvl7
        {id: 19,colour: 'darkgreen',solid: 0,script: 'lvleight'}, //lvl8/1
        {id: 21,colour: '#ccc',solid: 0,script: 'nextworld'}, //next world
        {id: 22,colour: '#C93232',solid: 1}, //zedi lava
        {id: 24,colour: 'darkgreen',solid: 1}, //jungle
        {id: 25,colour: 'green',solid: 0}, //st
        {id: 26,colour: '#0077BE',solid: 0,script: 'ste'}, //ste
    ],
    
    /*DATA*/
   
    data: [
        [7, 7, 7, 7, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7, 7, 7],
        [7, 7, 7, 26, 25, 1, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 7, 7, 7, 7],
        [7, 7, 7, 2, 2, 1, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 7, 7, 7],
        [7, 7, 7, 2, 2, 1, 1, 1, 2, 2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 7, 7, 7],
        [7, 7, 2, 2, 2, 2, 2, 1, 2, 2, 8, 1, 5, 1, 1, 2, 2, 2, 7, 7, 7, 7],
        [7, 7, 2, 2, 2, 2, 2, 1, 2, 2, 8, 1, 8, 8, 1, 2, 2, 7, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 8, 7, 1, 7, 7, 7, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 6, 1, 1, 7, 7, 7, 7, 7],
        [7, 2, 2, 13, 1, 1, 1, 1, 1, 2, 2, 2, 12, 7, 7, 7, 1, 7, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 12, 12, 12, 7, 7, 1, 7, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 2, 2, 11, 2, 12, 12, 12, 12, 2, 2, 1, 7, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 1, 14, 1, 1, 1, 10, 1, 1, 1, 1, 1, 2, 7, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 1, 2, 2, 12, 12, 12, 12, 12, 2, 2, 2, 2, 2, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 16, 2, 2, 2, 12, 12, 12, 2, 2, 2, 2, 2, 2, 7, 7, 7],
        [7, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7],
        [7, 2, 2, 2, 2, 2, 1, 1, 1, 2, 22, 22, 22, 2, 2, 9, 9, 9, 2, 2, 7, 7],
        [7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 1, 17, 14, 1, 1, 1, 18, 1, 2, 2, 7, 7],
        [7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 22, 22, 24, 11, 2, 9, 9, 1, 2, 2, 7, 7],
        [7, 7, 7, 2, 2, 2, 2, 2, 2, 24, 22, 24, 24, 13, 2, 2, 2, 1, 2, 2, 7, 7],
        [7, 7, 7, 2, 2, 2, 2, 2, 24, 24, 24, 24, 24, 24, 2, 2, 2, 1, 2, 2, 7, 7],
        [7, 7, 7, 7, 2, 2, 1, 1, 1, 1, 1, 19, 1, 1, 1, 1, 1, 1, 2, 2, 7, 7],
        [7, 7, 7, 7, 2, 2, 21, 2, 24, 24, 24, 24, 24, 24, 24, 2, 2, 2, 2, 2, 7, 7]
    ],


    /*GRAVITY*/
    
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 5,
        y: 1,
        colour: '#24bdff'
    },
    
    /*SCRIPTS*/

    scripts: {
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        death: 'document.getElementById("game_over_sound").play();game.load_map(maptwo)',
        lvlone: 'game.load_map(map)',
        lvltwo: 'game.load_map(maptwo);document.getElementById("energy").value += 1',
        lvlthree: 'game.load_map(mapthree);document.getElementById("energy").value += 1',
        lvlfour: 'game.load_map(mapfour);document.getElementById("energy").value += 1',
        wz: 'mapselect.player.x = 11;mapselect.player.y = 11;mapselect.keys[10].colour = "#ddd";mapselect.keys[10].script = " ";mapselect.keys[14].solid = 1;mapselect.keys[11].solid = 0;mapselect.keys[14].colour = "green";mapselect.keys[11].colour = "#ccc";game.load_map(mapselect)',
        warp: 'mapselect.player.x = 13;mapselect.player.y = 18;game.load_map(mapselect)',
        ste: 'alert("STUCK IN A TREE");game.load_map(maptree)',
    }
};

var maptree = {

    tile_size: 18,
    
    keys: [
        {id: 0,colour: '#555',solid: 0}, //nothing
        {id: 1,colour: 'lightblue',solid: 0},//air
        {id: 2,colour: 'green',solid: 1,bounce: 0}, //leaf
        {id: 3,colour: 'brown',solid: 1,bounce: 0.5}, //branch
        {id: 4,colour: 'lightblue',solid: 0,script: 'ste'}, //back
        {id: 5,colour: 'lightblue',solid: 1}, //wall
    ],
    
    /*DATA*/
   
    data: [
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    ],


    /*GRAVITY*/
    
    gravity: {
        x: 0,
        y: 0.3
    },
    
    /*VELOCITY LIMITS*/

    vel_limit: {
        x: 2,
        y: 16
    },

    /*MOVEMENT SPEED*/
    
    movement_speed: {
        jump: 7,
        left: 0.5,
        right: 0.5
    },
    
    /*PLAYER DATA*/

    player: {
        x: 5,
        y: 1,
        colour: '#24bdff'
    },
    
    /*SCRIPTS*/

    scripts: {
        ste: 'mapselect.player.x = 5;mapselect.player.y = 1;game.load_map(mapselect)',
    }
};

/*CLARITY ENGINE*/

var Clarity = function () {

    this.alert_errors   = false;
    this.log_info       = true;
    this.tile_size      = 16;
    this.limit_viewport = false;
    this.jump_switch    = 0;
    
    this.viewport = {
        x: 200,
        y: 200
    };
    
    this.camera = {
        x: 0,
        y: 0
    };
    
    this.key = {
        left: false,
        right: false,
        up: false
    };

    this.player = {

        loc: {
            x: 0,
            y: 0
        },
        
        vel: {
            x: 0,
            y: 0
        },
        
        can_jump: true
    };

    window.onkeydown = this.keydown.bind(this);
    window.onkeyup   = this.keyup.bind(this);
};

Clarity.prototype.error = function (message) {

    if (this.alert_errors) alert(message);
    if (this.log_info) console.log(message);
};

Clarity.prototype.log = function (message) {

    if (this.log_info) console.log(message);
};

Clarity.prototype.set_viewport = function (x, y) {

    this.viewport.x = x;
    this.viewport.y = y;
};

Clarity.prototype.keydown = function (e) {

    var _this = this;

    switch (e.keyCode) {
    case 37:
        _this.key.left = true;
        break;
    case 38:
        _this.key.up = true;
        break;
    case 39:
        _this.key.right = true;
        break;
    case 65:
        _this.key.left = true;
        break;
    case 68:
        _this.key.right = true;
        break;
    case 32:
        _this.key.up = true;
        break;
    }
};

Clarity.prototype.keyup = function (e) {

    var _this = this;

    switch (e.keyCode) {
    case 37:
        _this.key.left = false;
        break;
    case 38:
        _this.key.up = false;
        break;
    case 39:
        _this.key.right = false;
        break;
    case 65:
        _this.key.left = false;
        break;
    case 68:
        _this.key.right = false;
        break;
    case 32:
        _this.key.up = false;
        break;
    }
};

Clarity.prototype.load_map = function (map) {

    if (typeof map      === 'undefined'
     || typeof map.data === 'undefined'
     || typeof map.keys === 'undefined') {

        this.error('Error: Invalid map data!');

        return false;
    }

    this.current_map = map;

    this.current_map.background = map.background || '#333';
    this.current_map.gravity = map.gravity || {x: 0, y: 0.3};
    this.tile_size = map.tile_size || 16;

    var _this = this;
    
    this.current_map.width = 0;
    this.current_map.height = 0;

    map.keys.forEach(function (key) {

        map.data.forEach(function (row, y) {
            
            _this.current_map.height = Math.max(_this.current_map.height, y);

            row.forEach(function (tile, x) {
                
                _this.current_map.width = Math.max(_this.current_map.width, x);

                if (tile == key.id)
                    _this.current_map.data[y][x] = key;
            });
        });
    });
    
    this.current_map.width_p = this.current_map.width * this.tile_size;
    this.current_map.height_p = this.current_map.height * this.tile_size;

    this.player.loc.x = map.player.x * this.tile_size || 0;
    this.player.loc.y = map.player.y * this.tile_size || 0;
    this.player.colour = map.player.colour || '#000';
  
    this.key.left  = false;
    this.key.up    = false;
    this.key.right = false;
    
    this.camera = {
        x: 0,
        y: 0
    };
    
    this.player.vel = {
        x: 0,
        y: 0
    };

    this.log('Successfully loaded map data.');
    this.log('Yay!');

    return true;
   
};

Clarity.prototype.get_tile = function (x, y) {

    return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0;
};

Clarity.prototype.draw_tile = function (x, y, tile, context) {

    if (!tile || !tile.colour) return;

    context.fillStyle = tile.colour;
    context.fillRect(
        x,
        y,
        this.tile_size,
        this.tile_size
    );
};

Clarity.prototype.draw_map = function (context, fore) {

    for (var y = 0; y < this.current_map.data.length; y++) {

        for (var x = 0; x < this.current_map.data[y].length; x++) {

            if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {

                var t_x = (x * this.tile_size) - this.camera.x;
                var t_y = (y * this.tile_size) - this.camera.y;
                
                if(t_x < -this.tile_size
                || t_y < -this.tile_size
                || t_x > this.viewport.x
                || t_y > this.viewport.y) continue;
                
                this.draw_tile(
                    t_x,
                    t_y,
                    this.current_map.data[y][x],
                    context
                );
            }
        }
    }

    if (!fore) this.draw_map(context, true);
};

Clarity.prototype.move_player = function () {

    var tX = this.player.loc.x + this.player.vel.x;
    var tY = this.player.loc.y + this.player.vel.y;

    var offset = Math.round((this.tile_size / 2) - 1);

    var tile = this.get_tile(
        Math.round(this.player.loc.x / this.tile_size),
        Math.round(this.player.loc.y / this.tile_size)
    );
     
    if(tile.gravity) {
        
        this.player.vel.x += tile.gravity.x;
        this.player.vel.y += tile.gravity.y;
        
    } else {
        
        this.player.vel.x += this.current_map.gravity.x;
        this.player.vel.y += this.current_map.gravity.y;
    }
    
    if (tile.friction) {

        this.player.vel.x *= tile.friction.x;
        this.player.vel.y *= tile.friction.y;
    }

    var t_y_up   = Math.floor(tY / this.tile_size);
    var t_y_down = Math.ceil(tY / this.tile_size);
    var y_near1  = Math.round((this.player.loc.y - offset) / this.tile_size);
    var y_near2  = Math.round((this.player.loc.y + offset) / this.tile_size);

    var t_x_left  = Math.floor(tX / this.tile_size);
    var t_x_right = Math.ceil(tX / this.tile_size);
    var x_near1   = Math.round((this.player.loc.x - offset) / this.tile_size);
    var x_near2   = Math.round((this.player.loc.x + offset) / this.tile_size);

    var top1    = this.get_tile(x_near1, t_y_up);
    var top2    = this.get_tile(x_near2, t_y_up);
    var bottom1 = this.get_tile(x_near1, t_y_down);
    var bottom2 = this.get_tile(x_near2, t_y_down);
    var left1   = this.get_tile(t_x_left, y_near1);
    var left2   = this.get_tile(t_x_left, y_near2);
    var right1  = this.get_tile(t_x_right, y_near1);
    var right2  = this.get_tile(t_x_right, y_near2);


    if (tile.jump && this.jump_switch > 15) {

        this.player.can_jump = true;
        
        this.jump_switch = 0;
        
    } else this.jump_switch++;
    
    this.player.vel.x = Math.min(Math.max(this.player.vel.x, -this.current_map.vel_limit.x), this.current_map.vel_limit.x);
    this.player.vel.y = Math.min(Math.max(this.player.vel.y, -this.current_map.vel_limit.y), this.current_map.vel_limit.y);
    
    this.player.loc.x += this.player.vel.x;
    this.player.loc.y += this.player.vel.y;
    
    this.player.vel.x *= .9;
    
    if (left1.solid || left2.solid || right1.solid || right2.solid) {

        /*FIX OVERLAP*/

        while (this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near1).solid
            || this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near2).solid)
            this.player.loc.x += 0.1;

        while (this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near1).solid
            || this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near2).solid)
            this.player.loc.x -= 0.1;

        /*TILE BOUNCE*/

        var bounce = 0;

        if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
        if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
        if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
        if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

        this.player.vel.x *= -bounce || 0;
        
    }
    
    if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {

        /*FIX OVERLAP*/
        
        while (this.get_tile(x_near1, Math.floor(this.player.loc.y / this.tile_size)).solid
            || this.get_tile(x_near2, Math.floor(this.player.loc.y / this.tile_size)).solid)
            this.player.loc.y += 0.1;

        while (this.get_tile(x_near1, Math.ceil(this.player.loc.y / this.tile_size)).solid
            || this.get_tile(x_near2, Math.ceil(this.player.loc.y / this.tile_size)).solid)
            this.player.loc.y -= 0.1;

        /*TILE BOUNCE*/
        
        var bounce = 0;
        
        if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
        if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
        if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
        if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;
        
        this.player.vel.y *= -bounce || 0;

        if ((bottom1.solid || bottom2.solid) && !tile.jump) {
            
            this.player.on_floor = true;
            this.player.can_jump = true;
        }
        
    }
    
    /*CAMERA*/

    var c_x = Math.round(this.player.loc.x - this.viewport.x/2);
    var c_y = Math.round(this.player.loc.y - this.viewport.y/2);
    var x_dif = Math.abs(c_x - this.camera.x);
    var y_dif = Math.abs(c_y - this.camera.y);
    
    if(x_dif > 5) {
        
        var mag = Math.round(Math.max(1, x_dif * 0.1));
    
        if(c_x != this.camera.x) {
            
            this.camera.x += c_x > this.camera.x ? mag : -mag;
            
            if(this.limit_viewport) {
                
                this.camera.x = 
                    Math.min(
                        this.current_map.width_p - this.viewport.x + this.tile_size,
                        this.camera.x
                    );
                
                this.camera.x = 
                    Math.max(
                        0,
                        this.camera.x
                    );
            }
        }
    }
    
    if(y_dif > 5) {
        
        var mag = Math.round(Math.max(1, y_dif * 0.1));
        
        if(c_y != this.camera.y) {
            
            this.camera.y += c_y > this.camera.y ? mag : -mag;
        
            if(this.limit_viewport) {
                
                this.camera.y = 
                    Math.min(
                        this.current_map.height_p - this.viewport.y + this.tile_size,
                        this.camera.y
                    );
                
                this.camera.y = 
                    Math.max(
                        0,
                        this.camera.y
                    );
            }
        }
    }
    
    if(this.last_tile != tile.id && tile.script) {
    
        eval(this.current_map.scripts[tile.script]);
    }
    
    this.last_tile = tile.id;
};

Clarity.prototype.update_player = function () {

    if (this.key.left) {

        if (this.player.vel.x > -this.current_map.vel_limit.x)
            this.player.vel.x -= this.current_map.movement_speed.left;
    }

    if (this.key.up) {

        if (this.player.can_jump && this.player.vel.y > -this.current_map.vel_limit.y) {
            
            this.player.vel.y -= this.current_map.movement_speed.jump;
            this.player.can_jump = false;
        }
    }

    if (this.key.right) {

        if (this.player.vel.x < this.current_map.vel_limit.x)
            this.player.vel.x += this.current_map.movement_speed.left;
    }

    this.move_player();
};

Clarity.prototype.draw_player = function (context) {

    context.fillStyle = this.player.colour;

    context.beginPath();

    context.arc(
        this.player.loc.x + 18 / 2 - this.camera.x,
        this.player.loc.y + 15 - this.camera.y,
        this.tile_size / 2,
        0.9*Math.PI,
        0.1*Math.PI
    );

    context.fill();
    
};

Clarity.prototype.update = function () {

    this.update_player();
};

Clarity.prototype.draw = function (context) {

    this.draw_map(context, false);
    this.draw_player(context);
};

/*ENGINE SETUP*/

window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

document.getElementById("playb").style.display = "none";
document.getElementById("playb2").style.display = "none";
canvas.style.backgroundImage = "none";
canvas.style.backgroundColor = "#444";
canvas.width = 400;
canvas.height = 400;

var game = new Clarity();
    game.set_viewport(canvas.width, canvas.height);
    game.load_map(mapselect);

    /*LIMIT VIEWPORT*/
    game.limit_viewport = true;

var Loop = function() {
  
  ctx.fillStyle = '#444';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  game.update();
  game.draw(ctx);
  
  window.requestAnimFrame(Loop);
};

Loop();

}