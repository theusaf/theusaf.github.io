//MC COMMAND UPDATER
//VERSION 1.6.1.0
//(Major Update).(Commands_Completed).(Misc Changes).(if applicable, this is actually higher than the previous number and means that a subcommand has been completed)
/*Update log:
*Some Dates may be off
Monday 03/05/2018
0.1.0: Basic give support + nbt
0.1.1: Add damage and rename values
Tuesday 03/06/2018
0.1.2: basic selectors
0.1.3: nearest to furthest compensation
Wednesday 03/07/2018
0.1.4: almost full selector support
0.1.5: less wasteful selectors
0.1.6: small bug fix
0.1.7: nbt supports spaces
0.1.8: begin support for scoreboards (rip my brain lol)
0.1.9: fix score bug #1
0.1.10: fix score bug #2 (probably final for this category)
Thursday 03/08/2018
0.1.11: fix filter funct
0.1.12: fix scoreboard
0.1.13: fix small bug
0.1.14: fix scoreboard for loop cap
1.2.0: Gamemode works fully, webpage looks nicer
Friday 03/09/2018
1.3.0: Add toggledownfall
1.3.1: Allow spaces in selector though probably didnt need this as 1.13 is when spaces are added...
Friday 03/16/2018
1.3.2: Super minor update. Starting projects on setblock and summon
Wednesday 04/11/2018
1.3.3: Adding more data values for block list siiiighhhh...
Wednesday 04/18/2018
1.4.0: Adding more data values, fixing bugs, and making a working setblock thing
1.5.0: Added /help.... :p
Thursday 04/19/2018
1.5.1: Added string fixing in display.
1.5.2: Fixed bugs with string fixing
1.5.3: Adding shulker boxes to data list
Tuesday - Thursday 05/03/2018
1.5.4: Added a (better) string fixer!
1.5.5: Fixed the string fixer!
1.5.6: Added complete support for spawn eggs
1.5.7: Fixed the string fixer! (again)
1.5.8: Fixed another string fixer bug.. (again...)
1.5.9: Starting function to allow Numbers like 10b to be accepted by the string fixer
Monday 06/25/2018
1.5.10 Added fixes for enchantments
Wednesday 06/27/2018
1.5.11 Preparing to finish all damage values for blocks :(
Saturday 08/04/2018
1.5.12 Adding even more damage values... siiighh
Sunday 08/05/2018
1.5.13 Adding more damage values...
Monday 08/06/2018
1.5.14 Adding scoreboard command support
1.6.0 Finished testfor kindof
1.6.1 Fixed a bug with the testfor command
*/

/*Notes and Random Comments
Can somebody explain what the heck the wiki means by that "CollarColor has been swapped for consistency?"
Ugh. setblock is a nightmare!
*/

//vars
var out = document.getElementById('output');
/*var justincase = {con: console.log, clear: console.clear};
console.log = function(m){
    var consol = document.getElementById('console');
    if(typeof(m) == 'string' || typeof(m) == 'number'){
        consol.innerText += m + "\n";
    }else{
        consol.innerText += str(m) + "\n";
    }
};
console.clear = function(){
    var consol = document.getElementById('console');
    consol.innerText = "";
}*/

var damageList = {
    wool: ["white_wool","orange_wool","magenta_wool","light_blue_wool","yellow_wool","lime_wool","pink_wool","gray_wool","light_gray_wool","cyan_wool","purple_wool","blue_wool","brown_wool","green_wool","red_wool","black_wool"],
    stone: ["stone","granite","polished_granite","diorite","polished_diorite","andesite","polished_andesite"],
    dirt: ["dirt","coarse_dirt","podzol"],
    planks: ["oak_planks","spruce_planks","birch_planks","jungle_planks","acacia_planks","dark_oak_planks"],
    sapling: ["oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling"],
    sand: ["sand","red_sand"],
    log: ["oak_log","spruce_log","birch_log","jungle_log","oak_bark","spruce_bark","birch_bark","jungle_bark"],
    log2: ["acacia_log","dark_oak_log","acacia_bark","dark_oak_bark"],
    leaves: ["oak_leaves","spruce_leaves","birch_leaves","jungle_leaves"],
    leaves2: ["acacia_leaves","dark_oak_leaves"],
    sponge: ["sponge","wet_sponge"],
    sandstone: ["sanstone","chiseled_sandstone","cut_sandstone"],
    tallgrass: ["dead_bush","grass","fern"],
    red_flower: ["poppy","blue_orchid","allium","azure_buet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy"],
    wooden_slab: ["oak_slab","spruce_slab","birch_slab","jungle_slab","acacia_slab","dark_oak_slab"],
    stone_slab: ["stone_slab","sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","smooth_stone","smooth_sandstone","smooth_quartz"],
    stone_slab2: ["red_sandstone_slab","smooth_red_sanstone"],
    monster_egg: ["infested_stone","infested_cobblestone","infested_stone_bricks","infested_mossy_stone_bricks","infested_cracked_stone_bricks","infested_chiseled_stone_bricks"],
    stonebrick: ["stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks"],
    /*brown_mushroom_block: ["brown_mushroom_block","mushroom_stem"],
    red_mushroom_block: ["red_mushroom_block","mushroom_stem"],*/
    cobblestone_wall: ["cobblestone_wall","mossy_cobblestone_wall"],
    anvil: ["anvil","chipped_anvil","damaged_anvil"],
    quartz_block: ["quartz_block","chiseled_quartz_block","quartz_pillar"],
    stained_hardened_clay: ["white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta"],
    carpet: ["white_carpet","orange_carpet","magenta_carpet","light_blue_carpet","yellow_carpet","lime_carpet","pink_carpet","gray_carpet","light_gray_carpet","cyan_carpet","purple_carpet","blue_carpet","brown_carpet","green_carpet","red_carpet","black_carpet"],
    double_plant: ["sunflower","lilac","tall_grass","large_fern","rose_bush","peony"],
    stained_glass: ["white_stained_glass","orange_stained_glass","magenta_stained_glass","light_blue_stained_glass","yellow_stained_glass","lime_stained_glass","pink_stained_glass","gray_stained_glass","light_gray_stained_glass","cyan_stained_glass","purple_stained_glass","blue_stained_glass","brown_stained_glass","green_stained_glass","red_stained_glass","black_stained_glass"],
    stained_glass_pane: ["white_stained_glass_pane","orange_stained_glass_pane","magenta_stained_glass_pane","light_blue_stained_glass_pane","yellow_stained_glass_pane","lime_stained_glass_pane","pink_stained_glass_pane","gray_stained_glass_pane","light_gray_stained_glass_pane","cyan_stained_glass_pane","purple_stained_glass_pane","blue_stained_glass_pane","brown_stained_glass_pane","green_stained_glass_pane","red_stained_glass_pane","black_stained_glass_pane"],
    prismarine: ["prismarine","prismarine_bricks","dark_prismarine"],
    red_sandstone: ["red_sandstone","chiseled_red_sandstone","cut_red_sandstone"],
    concrete: ["white_concrete","orange_concrete","magenta_concrete","light_blue_concrete","yellow_concrete","lime_concrete","pink_concrete","gray_concrete","light_gray_concrete","cyan_concrete","purple_concrete","blue_concrete","brown_concrete","green_concrete","red_concrete","black_concrete"],
    concrete_powder: ["white_concrete_powder","orange_concrete_powder","magenta_concrete_powder","light_blue_concrete_powder","yellow_concrete_powder","lime_concrete_powder","pink_concrete_powder","gray_concrete_powder","light_gray_concrete_powder","cyan_concrete_powder","purple_concrete_powder","blue_concrete_powder","brown_concrete_powder","green_concrete_powder","red_concrete_powder","black_concrete_powder"],
    coal: ["coal","charcoal"],
    golden_apple: ["golden_apple","enchanted_golden_apple"],
    fish: ["cod","salmon","clownfish","pufferfish"],//more to come probs
    cooked_fish: ["cooked_cod","cooked_salmon"],
    dye: ["bone_meal","orange_dye","magenta_dye","light_blue_dye","dandelion_yellow","lime_dye","pink_dye","gray_dye","light_gray_dye","cyan_dye","purple_dye","lapis_lazuli","cocoa_beans","cactus_green","rose_red","ink_sac"],
    bed: ["white_bed","orange_bed","magenta_bed","light_blue_bed","yellow_bed","lime_bed","pink_bed","gray_bed","light_gray_bed","cyan_bed","purple_bed","blue_bed","brown_bed","green_bed","red_bed","black_bed"],
    //spawn eggs are not added as they do not have a "damage" value
    skull: ["skeleton_skull","wither_skeleton_skull","zombie_head","player_head","creeper_head","dragon_head"],
    banner: ["white_banner","orange_banner","magenta_banner","light_blue_banner","yellow_banner","lime_banner","pink_banner","gray_banner","light_gray_banner","cyan_banner","purple_banner","blue_banner","brown_banner","green_banner","red_banner","black_banner"]
}; //for give mostly

var safeFromDamageList = ["diamond_sword","iron_sword","golden_sword","wooden_sword","stone_sword","diamond_axe","golden_axe","iron_axe","stone_axe","wooden_axe","diamond_shovel","gold_shovel","iron_shovel","stone_shovel","wooden_shovel","diamond_hoe","golden_hoe","iron_hoe","stone_hoe","wooden_hoe","shears","diamond_helmet","golden_helmet","iron_helmet","chainmail_helmet","leather_helmet","diamond_leggings","golden_leggings","iron_leggings","chainmail_leggings","leather_leggings","diamond_chestplate","iron_chestplate","golden_chestplate","chainmail_chestplate","leather_chestplate","diamond_boots","golden_boots","iron_boots","chainmail_boots","leather_boots","flint_and_steel","fishing_rod","carrot_on_a_stick","bow","trident"];

var renameList = {
    grass: "grass_block",
    noteblock: "note_block",
    golden_rail: "powered_rail",
    web: "cobweb",
    deadbush: "dead_bush",
    piston_extension: "moving_piston",
    yellow_flower: "dandelion",
    double_purpur_slab: "purpur_slab",
    brick_block: "bricks",
    stone_stairs: "cobblestone_stairs",
    wooden_pressure_plate: "oak_pressure_plate",
    snow_layer: "snow",
    snow: "snow_block",
    fence: "oak_fence",
    pumpkin: "carved_pumpkin",
    lit_pumpkin: "jack_o_lantern",
    trapdoor: "oak_trapdoor",
    fence_gate: "oak_fence_gate",
    waterlily: "lily_pad",
    nether_brick: "nether_bricks",
    end_bricks: "end_stone_bricks",
    wooden_button: "oak_button",
    quartz_ore: "nether_quartz_ore",
    hardened_clay: "terracotta",
    slime: "slime_block",
    magma: "magma_block",
    red_nether_brick: "red_nether_bricks",
    silver_shulker_box: "light_gray_shulker_box",
    silver_glazed_terracotta: "light_gray_glazed_terracotta",
    wooden_door: "oak door",
    boat: "oak_boat",
    reeds: "sugar_cane",
    fireworks: "firework_rocket",
    firework_charge: "firework_star",
    netherbrick: "nether_brick",
    record_13: "music_disk_13",
    record_cat: "music_disk_cat",
    record_chirp: "music_disk_chirp",
    record_11: "music_disk_11",
    record_mall: "music_disk_mall",
    record_blocks: "music_disk_blocks",
    record_mellohi: "music_disk_mellohi",
    record_stal: "music_disk_stal",
    record_strad: "music_disk_strad",
    record_far: "music_disk_far",
    record_wait: "music_disk_wait"
};

//funcs
//submit button
function submit(text,startVersion,endVersion){
    var t = "";
    var split = [];
    var type = "";
    split = text.split(" ");
    
    type = getType(text);
    console.log("command type is type " + type);
    //Determine stuff
    t = parse(type,startVersion,endVersion,text);
    out.value = t;
}
//gets command type
function getType(text){
    var t = text.split(" ")[0];
    t = t.replace(/\//img,"");
    return t;
}
//main thing for fixing
function parse(typ,version,version2,te){
    //version and verstion2 are not used currently
    var fin = "";
    var p = " ";
    switch (typ) {
        case 'scoreboard':
            var ar = te.split(" ");
            let ty;
            
            if(ar[1] == "objectives"){
                if(ar[2] == "add"){
                    ty = "oa";
                }
            }else{
                
            }
            
            fin = ty == "oa"? ar[0] + p + ar[1] + p + ar[2]: null;
            break;
        case 'give':
            (function(){
            var ar = te.split(" ");
            //check to see if the selector is split into stuff. Removed. See update log
            /*if(ar[1][ar[1].length - 1] != "]"){
                var q = 0;
                var don = false;
                while(don === false){
                    q ++;
                    if(ar[1 + q][ar[q + 1].length - 1] == "]"){
                        don = true;
                        ar[1] = ar[1] + " " + ar[1 + q];
                        ar.splice(q + 1,1);
                    }else{
                        ar[1] = ar[1]+ " " + ar[1+q];
                        ar.splice(q + 1,1);
                        console.log(ar);
                        q = q - 1;
                    }
                }
            }*/
            
            //rejoin nbt data
            if(ar.length > 6){
                for(var q in ar){
                    if(q > 5){
                        ar[5] = ar[5] + " " + ar[q];
                    }
                }
            }
            
            console.log(ar);
            var s = checkDamage(ar[4],ar[2]);
            var altS = "";
            if(s.safe == null){
                s = checkRename(ar[2]);
            }
            if(s.safe === true){
                altS = s.data;
                s.data = ar[2];
            }
            var se = checkSelector(ar[1]);
            //if there was a selector
            if(se !== ""){
                ar[1] = ar[1].substr(0,3);
            }
            
            var nbt2 = ar[5];
            var id = checkNBT(nbt2).id;
            var nbt = checkNBT(ar[5]).data;
            if(altS !== ""){
                if(typeof(nbt) != 'undefined' && nbt != ""){
                    nbt = nbt.substr(0,nbt.length - 1);
                    nbt = nbt + "," + altS + "}";
                }else{
                    nbt = "{" + altS + "}";
                }
            }
            if(nbt == "{}"){
                nbt = "";
            }
            if(typeof(id) != 'undefined'){
                s.data = id;
            }
            //if statement :p
            if(ar[3] === undefined){
                ar.push("");
            }
            fin = ar[0] + p + ar[1] + se + p + s.data + nbt + p + ar[3];
            })();
            break;
            
        case 'gamemode':
            (function(){
            var ar = te.split(" ");
            var g = checkGamemode(ar[1]);
            var sel = "";
            
            if(typeof(ar[2]) != 'undefined'){
                console.log("selector is missing");
                sel = checkSelector(ar[2]);
            }
            
            if(sel != "" && typeof(sel) != 'undefined'){
                ar[2] = ar[2].substr(0,3);
            }
            
            if(typeof(ar[2]) != 'undefined'){
                fin = ar[0] + p + g + p + ar[2] + sel;
            }else{
                fin = ar[0] + p + g + p;
            }
            })();
            break;
            
        case 'toggledownfall':
            (function(){
            fin = "weather clear";
            alert("In 1.13, /toggledownfall was removed. There is now no command that toggles rain and clear skies. So, this fixer just assumes you use it to clear the sky");
            })();
            break;
        case 'testfor':
            (function(){
            var ar = te.split(" ");
            if(ar.length > 3){
                ar[2] = ar.slice(2).join(" ");
            }
            if(ar[2] == undefined){
                ar[2] = "";
            }
            let sel = checkSelector(ar[1]);
            ar[1] = sel != "" ? ar[1].substr(0,3) + sel : ar[1].substr(0,2);
            
            ar[1] = ar[2] != "" ? ar[1].substr(0,ar[1].length - 1) + ",nbt=" + ar[2] + "]" : ar[1];
            //checkEntityNBT later :p
            fin = "execute if entity " + ar[1] + " run summon falling_block ~ ~ ~ {BlockState:{Name:\"barrier\"}}";
            })();
            break;
        case 'summon':
            var ar = te.split(" ");
            ar[1] = ar[1].toLowerCase();
            var type = ar;
            if(ar.length > 6){
                for(var q in ar){
                    if(q > 6){
                        ar[6] = ar[6] + " " + ar[q];
                    }
                }
            }
            var nbt = checkEntityNBT(ar[5],typ);
            fin = ar[0] + p + type + p + ar[2] + p + ar[3] + p + ar[4]; + nbt; 
            break;
        case 'setblock':
            (function(){
                var ar = te.split(" ");
                console.log(ar);
                //fixes spaces in nbt data
                if(ar.length > 6){
                console.log("length is too long");
                var spliceList = [];
                for(var q in ar){ //supposed to make nbt same
                    if(q > 6){
                        ar[6] = ar[6] + " " + ar[q];
                        spliceList.push(q);
                    }
                }
                var nn = 0;
                for(var y in spliceList){
                    ar.splice(y + 7 - nn);
                    nn ++;
                }
            }
                console.log(ar);
                /*if(ar[6] !== undefined){ //there is nbt data
                console.log(ar[6]);
                if(ar[6].substr(0,7).search("keep") !== -1){
                    ar[4] = ar[4] + ar[6].split("keep")[1].substr(1,Infinity);
                }
                if(ar[6].substr(0,7).search("destroy") !== -1){
                    ar[4] = ar[4] + ar[6].split("destroy")[1].substr(1,Infinity);
                }
                if(ar[6].substr(0,7).search("replace") !== -1){
                    ar[4] = ar[4] + ar[6].split("replace")[1].substr(1,Infinity);
                }
            }
            if(isNaN(ar[5]) && ar[5] !== undefined){ //data value is a block state
                console.log("found block state");
                //s is the new block id and state
                var s = checkBlockDamage(-1,ar[4]);
                s = s + "[" +ar[5] + "]";
            }else{ //data value is a number
                console.log("Found number");
                var s = checkBlockDamage(ar[5],ar[4]);
            }*/
                //setblock x y z block data/state handling {nbt}
                var correct = ar[4]; //block
                var nbt = ar[6]; //handling {nbt}
                var numstate = ar[5]; //data/state
                var handling = ar[6]; // handling {nbt}
                var correct2 = correct;
                
                correct = checkBlockDamage(numstate,correct).id;
                correct = checkRename(correct).data;
                if (correct.toLowerCase() == "snowdelete"){
                    correct = "snow";
                }
                
                numstate = checkBlockDamage(numstate,correct2).state;
                if(numstate == "[null]"){
                    numstate = "";
                }
                
                if(handling !== undefined){
                    handling = handling.split(" ")[0];
                }else{
                    handling = "";
                }
                
                if(nbt !== undefined){
                    if(nbt.substr(0,7).search("keep") !== -1){
                        nbt = nbt.split("keep")[1].substr(1,Infinity);
                    }
                    if(nbt.substr(0,7).search("destroy") !== -1){
                        nbt = nbt.split("destroy")[1].substr(1,Infinity);
                    }
                    if(nbt.substr(0,7).search("replace") !== -1){
                        nbt = nbt.split("replace")[1].substr(1,Infinity);
                    }
                }else{
                    nbt = "";
                }
                
                
                
                fin = ar[0] + p + ar[1] + p + ar[2] + p + ar[3] + p + correct + numstate + nbt + p + handling;
                console.log(fin);
            })();
            break;
        case 'help':
            (function(){
            var randomHelpList = ["try fixing a real command...","Subscribe! https://www.youtube.com/theusaf","Type /help for a list of commands","This is a line of text","This might help you! https://shortr.github.io/?A","Dolphins are cool!","I wish we could ride dolphins","Stop pressing the fix button please...","Error 404-Command found","Open the banana from the bottom!","Those are my cookies","Searge says theusaf says Dinnerbone says hi","https://www.minecraft.net","Not an official Minecraft website... Duh...","Have you tried swimming in the ocean?"];
            var randomStr = randomHelpList[Math.round(Math.random()*randomHelpList.length - 1)];
            fin = "theusaf says " + randomStr;
            })();
            break;
        default:
            console.error("parseError: Unidentified type " + typ + " or invalid version");
            fin = null;
    }
    return fin;
}
/*Notes for dataList
Check sapling and leave variant block state
Make sure that values that are currently replaced by 'null' are correct
*/
var dataList = { //list of data values for blocks. May be incorrect. Rip me... WARNING: some commands will be a bit off. MAY NEED MORE WORK AS SOME DEFAULLT VALUES ARE NOT THE SAME AS 0. You better thank be as I even allow non-correct block data numbers. NOTE TO SELF-REMOVE ALL "NULL" LATER
    sapling:{
        id: ["oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling","oak_sapling","oak_sapling","oak_sapling","spruce_sapling","birch_sapling","acacia_sapling","dark_oak_sapling","oak_sapling","oak_sapling"],
        values: [null,null,null,null,null,null,null,null,"stage=1","stage=1","stage=1","stage=1","stage=1","stage=1","stage=1","stage=1"],
        hasMultiple: true
    },
    torch: {
        id: ["torch","wall_torch","wall_torch","wall_torch","wall_torch","torch","torch","torch","torch","torch","torch","torch","torch","torch","torch","torch"],
        values: [null,"facing=east","facing=west","facing=south","facing=north",null,null,null,null,null,null,null,null,null,null,null],
        hasMultiple: true
    },
    golden_rail: {
        id: "powered_rail",
        values: ["shape=north_south","shape=west_east","shape=ascending_east","shape=ascending_west","shape=ascending_north","shape=ascending_south",null,null,"powered=true"],
        hasMultiple: false
    },
    leaves: {
        id: ["oak_leaves","spruce_leaves","birch_leaves","jungle_leaves","oak_leaves","spruce_leaves","birch_leaves","jungle_leaves","oak_leaves","spruce_leaves","birch_leaves","jungle_leaves","oak_leaves","spruce_leaves","birch_leaves","jungle_leaves"],
        values: [null,null,null,null,"decayable=false","decayable=false","decayable=false","decayable=false","check_decay=true","check_decay=true","check_decay=true","check_decay=true","check_decay=true,decayable=false","check_decay=true,decayable=false","check_decay=true,decayable=false","check_decay=true,decayable=false"],
        hasMultiple: true
    },
    leaves2: {
        id: ["acacia_leaves","dark_oak_leaves","acacia_leaves","dark_oak_leaves","acacia_leaves","dark_oak_leaves","acacia_leaves","dark_oak_leaves"],
        values: [null,null,"decayable=false","decayable=false","check_decay=true","check_decay=true","check_decay=true,decayable=false","check_decay=true,decayable=false"],
        hasMultiple: true
    },
    wooden_slab:{
        id: ["oak_slab","spruce_slab","birch_slab","jungle_slab","acacia_slab","dark_oak_slab","oak_slab","oak_slab","oak_slab","spruce_slab","birch_slab","jungle_slab","acacia_slab","dark_oak_slab","oak_slab","oak_slab"],
        values: [null,null,null,null,null,null,null,null,"type=top","type=top","type=top","type=top","type=top","type=top","type=top","type=top"],
        hasMultiple: true
    },
    double_wooden_slab: {
        id: ["oak_slab","spruce_slab","birch_slab","jungle_slab","acacia_slab","dark_oak_slab","oak_slab","oak_slab","oak_slab","spruce_slab","birch_slab","jungle_slab","acacia_slab","dark_oak_slab","oak_slab","oak_slab"],
        values: ["type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double"],
        hasMultiple: true
    },
    stone_slab: {
        id: ["stone_slab","sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","stone_slab","sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab"],
        values: [null,null,null,null,null,null,null,null,"type=top","type=top","type=top","type=top","type=top","type=top","type=top","type=top"],
        hasMultiple: true
    },
    double_stone_slab: {
        id: ["stone_slab","sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","stone_slab","sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab"],
        values: ["type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double"],
        hasMultiple: true
    },
    stone_slab2: {
        id: "red_sandstone_slab",
        values: [null,null,null,null,null,null,null,null,"type=top","type=top","type=top","type=top","type=top","type=top","type=top","type=top"],
        hasMultiple: false
    },
    double_stone_slab2: {
        id: "red_sandstone_slab",
        values: ["type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double"],
        hasMultiple: false
    },
    purpur_slab: {
        id: "purpur_slab",
        values: [null,null,null,null,null,null,null,null,"type=top","type=top","type=top","type=top","type=top","type=top","type=top","type=top"],
        hasMultiple: false
    },
    double_purpur_slab: {
        id: "purpur_slab",
        values: ["type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double","type=double"],
        hasMultiple: false
    },
    furnace: {
        id: "furnace",
        values: [null,null,null,"facing=south","facing=west","facing=east",null,null,null,"facing=south","facing=west","facing=east",null,null,null,"facing=south"],
        hasMultiple: false
    },
    lit_furnace: {
        id: "furnace",
        values: ["lit=true","lit=true","lit=true","facing=south,lit=true","facing=west,lit=true","facing=east,lit=true","lit=true","lit=true","lit=true","facing=south,lit=true","facing=west,lit=true","facing=east,lit=true","lit=true","lit=true","lit=true","facing=south,lit=true"],
        hasMultiple: false
    },
    stone_stairs: {
        id: "cobblestone_stairs",
        values: ["facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top","facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top"],
        hasMultiple: false
    }, //seems a bit off... (bug, perhaps?)
    wooden_pressure_plate: {
        id: "oak_pressure_plate",
        values: [null,"powered=true",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        hasMultiple: false
    },
    lit_redstone_ore: {
        id: "redstone_ore",
        values: ["lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true"],
        hasMultiple: false
    },
    redstone_torch: {
        id: [null,"redstone_wall_torch","redstone_wall_torch","redstone_wall_torch","redstone_wall_torch",null,null,null,null,null,null,null,null,null,null,null],
        values: [null,"facing=east","facing=west","facing=south","facing=north",null,null,null,null,null,null,null,null,null,null,null],
        hasMultiple: true
    },
    unlit_redstone_torch: {
        id: [null,"redstone_wall_torch","redstone_wall_torch","redstone_wall_torch","redstone_wall_torch",null,null,null,null,null,null,null,null,null,null,null],
        values: ["lit=false","facing=east,lit=false","facing=west,lit=false","facing=south,lit=false","facing=north,lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false","lit=false"],
        hasMultiple: true
    },
    snow_layer: {
        id: "snowDELETE", //needed because snow_layer goes to snow and snow goes to snow_block
        values: [null,"layers=2","layers=3","layers=4","layers=5","layers=6","layers=7","layers=8",null,"layers=2","layers=3","layers=4","layers=5","layers=6","layers=7","layers=8"],
        hasMultiple: false
    }, //remeber to check this one...
    pumpkin: {
        id: "carved_pumpkin",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east"]
    }, //once again, off...
    lit_pumpkin: {
        id: "jack_o_lantern",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east"]
    },//seriously, this needs a fix
    trapdoor: {
        id: "oak_trapdoor",
        values: ["facing=north","facing=south","facing=west","facing=east","facing=north,open=true","facing=south,open=true","facing=west,open=true","facing=east,open=true","facing=north,half=top","facing=south,half=top","facing=west,half=top","facing=east,half=top","facing=north,half=top,open=true","facing=south,half=top,open=true","facing=west,half=top,open=true","facing=east,half=top,open=true"],
        hasMultiple: false
    },
    red_mushroom_block: {
        id: ["red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","red_mushroom_block","mushroom_stem","red_mushroom_block","red_mushroom_block","red_mushroom_block","mushroom_stem"],
        values: ["up=false,down=false,east=false,west=false,north=false,south=false","down=false,east=false,south=false","down=false,east=false,west=false,south=false","down=false,west=false,south=false","down=false,east=false,north=false,south=false","down=false,east=false,west=false,north=false,south=false","down=false,west=false,north=false,south=false","down=false,east=false,north=false","down=false,east=false,west=false,north=false","down=false,west=false,north=false","up=false,down=false","up=false,down=false,east=false,west=false,north=false,south=false","up=false,down=false,east=false,west=false,north=false,south=false","up=false,down=false,east=false,west=false,north=false,south=false",null,null],
        hasMultiple: true
    },
    brown_mushroom_block: {
        id: ["brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","mushroom_stem","brown_mushroom_block","brown_mushroom_block","brown_mushroom_block","mushroom_stem"],
        values: ["up=false,down=false,east=false,west=false,north=false,south=false","down=false,east=false,south=false","down=false,east=false,west=false,south=false","down=false,west=false,south=false","down=false,east=false,north=false,south=false","down=false,east=false,west=false,north=false,south=false","down=false,west=false,north=false,south=false","down=false,east=false,north=false","down=false,east=false,west=false,north=false","down=false,west=false,north=false","up=false,down=false","up=false,down=false,east=false,west=false,north=false,south=false","up=false,down=false,east=false,west=false,north=false,south=false","up=false,down=false,east=false,west=false,north=false,south=false",null,null],
        hasMultiple: true
    },
    fence_gate: {
        id: "oak_fence_gate",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=east,open=true","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,powered=true,open=true","facing=west,powered=true,open=true","facing=north,powered=true,open=true","facing=east,powered=true,open=true"]
    },
    lit_redstone_lamp: {
        id: "redstone_lamp",
        hasMultiple: false,
        values: ["lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true","lit=true"]
    },
    cobblestone_wall: {
        id: ["cobblestone_wall","mossy_cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall","cobblestone_wall"],
        hasMultiple: true,
        values: ["up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true","up=true"]
    },
    wooden_button: {
        id: "oak_button",
        values: ["face=floor","facing=east","facing=west","facing=south","facing=north","face=ceiling","face=ceiling","face=ceiling","face=floor,powered=true","facing=east,powered=true","facing=west,powered=true","facing=south,powered=true","facing=north,powered=true","face=ceiling,powered=true","face=ceiling,powered=true","face=ceiling,powered=true"],
        hasMultiple: false
    }, //fixed.
    anvil: {
        id: ["anvil","anvil","anvil","anvil","chipped_anvil","chipped_anvil","chipped_anvil","chipped_anvil","damaged_anvil","damaged_anvil","damaged_anvil","damaged_anvil"],
        hasMultiple: true,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east"]
    }, //strange: one of the few blocks that doesn't support non-used values. (goes from 0-11. no more...)
    daylight_detector: {
        ud: "daylight_detector",
        hasMultiple: false,
        values: [null,"power=0","power=1","power=2","power=3","power=4","power=5","power=6","power=7","power=8","power=9","power=10","power=11","power=12","power=13","power=14","power=15"]
    },
    daylight_detector_inverted: {
        id: "daylight_detector",
        hasMultiple: false,
        values: ["inverted=true","power=0,inverted=true","power=1,inverted=true","power=2,inverted=true","power=3,inverted=true","power=4,inverted=true","power=5,inverted=true","power=6,inverted=true","power=7,inverted=true","power=8,inverted=true","power=9,inverted=true","power=10,inverted=true","power=11,inverted=true","power=12,inverted=true","power=13,inverted=true","power=14,inverted=true","power=15,inverted=true"]
    },
    quartz_block: {
        id: ["quartz_block","chiseled_quartz_block","quartz_pillar","quartz_pillar","quartz_pillar","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block","quartz_block"],
        hasMultiple: false,
        values: [null,null,"axis=y","axis=x","axis=z",null,null,null,null,null,null,null,null,null,null,null]
    },
    double_plant: {
        id: ["sunflower","lilac","tall_grass","large_fern","rose_bush","peony","sunflower","sunflower","sunflower","sunflower","sunflower","sunflower","sunflower","sunflower","sunflower","sunflower"],
        hasMultiple: true,
        values: [null,null,null,null,null,null,null,null,"half=upper","half=upper","half=upper","half=upper","half=upper","half=upper","half=upper","half=upper"]
    }, //no more facing. plants now work like lilypads :p
    silver_shulker_box: {
        id: "light_gray_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    white_shulker_box: {
        id: "white_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    orange_shulker_box: {
        id: "orange_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    magenta_shulker_box: {
        id: "magenta_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    light_blue_shulker_box: {
        id: "light_blue_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    yellow_shulker_box: {
        id: "yellow_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    lime_shulker_box: {
        id: "lime_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    pink_shulker_box: {
        id: "pink_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    gray_shulker_box: {
        id: "gray_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    cyan_shulker_box: {
        id: "cyan_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    purple_shulker_box: {
        id: "purple_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    blue_shulker_box: {
        id: "blue_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    brown_shulker_box: {
        id: "brown_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    green_shulker_box: {
        id: "green_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    red_shulker_box: {
        id: "red_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    black_shulker_box: {
        id: "black_shulker_box",
        hasMultiple: false,
        values:["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    wooden_door: {
        id: "oak_door",
        hasMultiple: false,
        values: ["facing=east","facing=south","facing=west","facing=north","facing=east,open=true","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=north,half=upper","facing=north,half=top,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,hinge=right,powered=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,powered=true,hinge=right"]
    },
    powered_repeater: {
        id: "repeater",
        hasMultiple: false,
        values: ["facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,powered=true,delay=2","facing=west,powered=true,delay=2","facing=north,powered=true,delay=2","facing=east,powered=true,delay=2","facing=south,powered=true,delay=3","facing=west,powered=true,delay=3","facing=north,powered=true,delay=3","facing=east,powered=true,delay=3","facing=south,powered=true,delay=4","facing=west,powered=true,delay=4","facing=north,powered=true,delay=4","facing=east,powered=true,delay=4"]
    },
    unpowered_repeater: {
        id: "repeater",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,delay=2","facing=west,delay=2","facing=north,delay=2","facing=east,delay=2","facing=south,delay=3","facing=west,delay=3","facing=north,delay=3","facing=east,delay=3","facing=south,delay=4","facing=west,delay=4","facing=north,delay=4","facing=east,delay=4"]
    }, 
    powered_comparator: {
        id: "comparator",
        hasMultiple: false,
        values:["facing=south","facing=west","facing=north","facing=east","facing=south,mode=subtract","facing=west,mode=subtract","facing=north,mode=subtract","facing=east,mode=subtract","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,mode=subtract,powered=true","facing=west,mode=subtract,powered=true","facing=north,mode=subtract,powered=true","facing=east,mode=subtract,powered=true"]
    },
    unpowered_comparator: {
        id: "comparator",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,mode=subtract","facing=west,mode=subtract","facing=north,mode=subtract","facing=east,mode=subtract","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,mode=subtract,powered=true","facing=west,mode=subtract,powered=true","facing=north,mode=subtract,powered=true","facing=east,mode=subtract,powered=true"]
    }, 
    //funnily enough, the powered/unpowered comparators are both exactly the same
    standing_sign: {
        id: "sign",
        hasMultiple: false,
        values: ["rotation=south","rotation=south-southwest","rotation=southwest","rotation=west","rotation=west-northwest","rotation=northwest","rotation=north","rotation=north-northeast","rotation=northeast","rotation=east-northeast","rotation=east","rotation=east-southeast","rotation=southeast","rotation=south-southeast"]
    },
    wall_sign: {
        id: "wall_sign",
        hasMultiple: false,
        values: ["facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south"]
    }, 
    reeds: {
        id: "sugar_cane",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5","age=6","age=7","age=8","age=9","age=10","age=11","age=12","age=13","age=14","age=15"]
    },
    bed: {
        id: "red_bed",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south","facing=west","facing=north","facing=east","facing=south,part=head","facing=west,part=head","facing=north,part=head","facing=east,part=head","facing=south,part=head,occupied=true","facing=west,part=head,occupied=true","facing=north,part=head,occupied=true","facing=east,part=head,occupied=true"]
    },
    pumpkin_stem: {
        id: "pumpkin_stem",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5","age=6","age=7",null,null,null,null,null,null,null,null]
    },
    melon_stem: {
        id: "melon_stem",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5","age=6","age=7",null,null,null,null,null,null,null,null]
    }, 
    skull: {
        id: ["skeleton_wall_skull","skeleton_skull","skeleton_wall_skull","skeleton_wall_skull","skeleton_wall_skull","skeleton_wall_skull","skeleton_wall_skull","skeleton_skull","skeleton_wall_skull","skeleton_skull","skeleton_wall_skull","skeleton_wall_skull","skeletong_wall_skull","skeleton_wall_skull","skeleton_wall_skull","skeleton_skull"],
        hasMultiple: true,
        values: ["facing=east","rotation=0","facing=north","facing=south","facing=west","facing=east","facing=east","rotation=0","facing=east","rotation=0","facing=north","facing=south","facing=west","facing=east","facing=east","rotation=0"]
    }, 
    standing_banner: {
        id: "black_banner",
        hasMultiple: false,
        values: ["rotation=0","rotation=1","rotation=2","rotation=3","rotation=4","rotation=5","rotation=6","rotation=7","rotation=8","rotation=9","rotation=10","rotation=11","rotation=12","rotation=13","rotation=14","rotation=15"]
    }, 
    wall_banner: {
        id: "black_wall_banner",
        hasMultiple: false,
        values: ["facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south"]
    },
    command_block: {
        id: "command_block",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=down,conditional=true","facing=up,conditional=true","facing=north,conditional=true","facing=south,conditional=true","facing=west,conditional=true","facing=east,conditional=true","facing=down,conditional=true","facing=up,conditional=true"]
    },
    repeating_command_block: {
        id: "repeating_command_block",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=down,conditional=true","facing=up,conditional=true","facing=north,conditional=true","facing=south,conditional=true","facing=west,conditional=true","facing=east,conditional=true","facing=down,conditional=true","facing=up,conditional=true"]
    }, 
    chain_command_block: {
        id: "chain_command_block",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=down,conditional=true","facing=up,conditional=true","facing=north,conditional=true","facing=south,conditional=true","facing=west,conditional=true","facing=east,conditional=true","facing=down,conditional=true","facing=up,conditional=true"]
    }, 
    chest: {
        id: "chest",
        hasMultiple: false,
        values: ["facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south"]
    }, 
    trapped_chest: {
        id: "trapped_chest",
        hasMultiple:false,
        values: ["facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south"]
    },
    acacia_door: {
        id: "acacia_door",
        hasMultiple: false,
        values: ["facing=east","facing=south","facing=west","facing=north","facing=east,open=true","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,hinge=right,powered=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,powered=true,hinge=right"]
    },
    acacia_fence: {
        id: "acacia_fence",
        hasMultiple: false,
        values: [null,"east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true"]
    },
    acacia_fence_gate: {
        id: "acacia_fence_gate",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=east,open=true","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,powered=true,open=true","facing=west,powered=true,open=true","facing=north,powered=true,open=true","facing=east,powered=true,open=true"]
    },
    acacia_stairs: {
        id: "acacia_stairs",
        hasMultiple: false,
        values: ["facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top","facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top"]
    },
    beetroots: {
        id: "beetroots",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3",null,null,null,null,null,null,null,null,null,null,null,null]
    },
    birch_door: {
        id: "birch_door",
        hasMultiple: false,
        values: ["facing=east","facing=south","facing=west","facing=north","facing=east,open=true","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,hinge=right,powered=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,powered=true,hinge=right"]
    },
    birch_fence: {
        id: "birch_fence",
        hasMultiple: false,
        values: [null,"east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true"]
    },
    birch_fence_gate: {
        id: "birch_fence_gate",
        hasMultiple:false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=east,open=true","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,powered=true,open=true","facing=west,powered=true,open=true","facing=north,powered=true,open=true","facing=east,powered=true,open=true"]
    },
    birch_stairs: {
        id: "birch_stairs",
        hasMultiple: false,
        values: ["facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top","facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top"]
    },
    brick_stairs: {
        id: "brick_stairs",
        hasMultiple:false,
        values: ["facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top","facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top"]
    },
    brewing_stand: {
        id: "brewing_stand",
        hasMultiple: false,
        values: [null,"has_bottle_0=true","has_bottle_1=true","has_bottle_0=true,has_bottle_1=true","has_bottle_2=true","has_bottle_0=true,has_bottle_2=true","has_bottle_1=true,has_bottle_2=true","has_bottle_0=true,has_bottle_1=true,has_bottle_2=true",null,"has_bottle_0=true","has_bottle_1=true","has_bottle_0=true,has_bottle_1=true","has_bottle_2=true","has_bottle_0=true,has_bottle_2=true","has_bottle_1=true,has_bottle_2=true","has_bottle_0=true,has_bottle_1=true,has_bottle_2=true"]
    },
    cactus: {
        id: "cactus",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5","age=6","age=7","age=8","age=9","age=10","age=11","age=12","age=13","age=14","age=15"]
    },
    cake: {
        id: "cake",
        hasMultiple: false,
        values: ["bites=0","bites=1","bites=2","bites=3","bites=4","bites=5","bites=6",null,null,null,null,null,null,null,null,null]
    },
    carrots: {
        id: "carrots",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5","age=6","age=7",null,null,null,null,null,null,null,null]
    },
    cauldron: {
        id: "cauldron",
        hasMultiple: false,
        values: ["level=0","level=1","level=2","level=3",null,null,null,null,null,null,null,null,null,null,null,null]
    },
    chorus_flower: {
        id: "chorus_flower",
        hasMultiple: false,
        values: ["age=0","age=1","age=2","age=3","age=4","age=5",null,null,null,null,null,null,null,null,null,null]
    },
    cocoa: {
        id: "cocoa",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,age=1","facing=west,age=1","facing=north,age=1","facing=east,age=1","facing=south,age=2","facing=west,age=2","facing=north,age=2","facing=east,age=2",null,null,null,null]
    },
    dark_oak_door: {
        id: "dark_oak_door",
        hasMultiple: false,
        values: ["facing=east","facing=south","facing=west","facing=north","facing=east,open=true","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,hinge=right,powered=true","facing=north,half=upper","facing=north,half=upper,hinge=right","facing=north,half=upper,powered=true","facing=north,half=upper,powered=true,hinge=right"]
    },
    dark_oak_fence: {
        id: "dark_oak_fence",
        hasMultiple: false,
        values: [null,"east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true"]
    },
    dark_oak_fence_gate: {
        id: "dark_oak_fence_gate",
        hasMultiple:false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,open=true","facing=west,open=true","facing=north,open=true","facing=east,open=true","facing=south,powered=true","facing=west,powered=true","facing=north,powered=true","facing=east,powered=true","facing=south,powered=true,open=true","facing=west,powered=true,open=true","facing=north,powered=true,open=true","facing=east,powered=true,open=true"]
    },
    dark_oak_stairs: {
        id: "dark_oak_stairs",
        hasMultiple:false,
        values: ["facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top","facing=east","facing=west","facing=south","facing=north","facing=east,half=top","facing=west,half=top","facing=south,half=top","facing=north,half=top"]
    },
    dispenser: {
        id: "dispenser",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=down,triggered=true","facing=up,triggered=true","facing=north,triggered=true","facing=south,triggered=true","facing=west,triggered=true","facing=east,triggered=true","facing=down,triggered=true","facing=up,triggered=true"]
    },
    dropper: {
        id: "dropper",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=down,triggered=true","facing=up,triggered=true","facing=north,triggered=true","facing=south,triggered=true","facing=west,triggered=true","facing=east,triggered=true","facing=down,triggered=true","facing=up,triggered=true"]
    },
    end_portal_frame: {
        id: "end_portal_frame",
        hasMultiple: false,
        values: ["facing=south","facing=west","facing=north","facing=east","facing=south,eye=true","facing=west,eye=true","facing=north,eye=true","facing=east,eye=true","facing=south","facing=west","facing=north","facing=east","facing=south,eye=true","facing=west,eye=true","facing=north,eye=true","facing=east,eye=true"]
    },
    end_rod: {
        id: "end_rod",
        hasMultiple: false,
        values: ["facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south","facing=west","facing=east","facing=down","facing=up","facing=north","facing=south"]
    },
    ender_chest: {
        id: "ender_chest",
        hasMultiple: false,
        values: ["facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south","facing=west","facing=east","facing=north","facing=north","facing=north","facing=south"]
    },
    farmland: {
        id: "farmland",
        hasMultiple: false,
        values: [null,"moisture=1","moisture=2","moisture=3","moisture=4","moisture=5","moisture=6","moisture=7",null,"moisture=1","moisture=2","moisture=3","moisture=4","moisture=5","moisture=6","moisture=7"]
    },
    fence: {
        id: "oak_fence",
        hasMultiple: false,
        values: [null,"east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true","east=true"]
    },
    flowing_lava: {
        id: "lava",
        hasMultiple: false,
        values: [null,"level=7","level=6","level=5","level=4","level=3","level=2","level=1","level=9","level=9","level=9","level=9","level=9","level=9","level=9","level=9"]
    },
    flowing_water: {
        id: "water",
        hasMultiple: false,
        values: [null,"level=7","level=6","level=5","level=4","level=3","level=2","level=1","level=9","level=9","level=9","level=9","level=9","level=9","level=9","level=9"]
    },
    heavy_weighted_pressure_plate: {
        id: "heavy_weighted_pressure_plate",
        hasMultiple: false,
        values: [null,"power=1","power=2","power=3","power=4","power=5","power=6","power=7","power=8","power=9","power=10","power=11","power=12","power=13","power=14","power=15"]
    },
    hopper: {},
    iron_bars: {},
    iron_door: {},
    iron_trapdoor: {},
    jukebox: {},
    jungle_door: {},
    jungle_fence: {},
    jungle_fence_gate: {},
    jugnle_stairs: {},
    ladder: {},
    lava: {},
    lever: {},
    monster_egg: {},
    dirt: {},
    nether_brick_fence: {},
    nether_brick_stairs: {},
    nether_wart: {},
    oak_stairs: {},
    observer: {},
    piston: {},
    piston_extension: {},
    piston_head: {},
    purpur_pillar: {},
    purpur_stairs: {},
    quartz_stairs: {},
    red_flower: {},
    red_sandstone_stairs: {},
    redstone_wire: {},
    sandstone_stairs: {},
    sponge: {},
    spruce_door: {},
    spruce_fence: {},
    spruce_fence_gate: {},
    spruce_stairs: {},
    stained_glass_pane: {},
    sticky_piston: {},
    stone_brick_stairs: {},
    stone_button: {},
    stone_pressure_plate: {},
    tallgrass: {},
    stained_glass: {},
    stained_hardened_clay: {},
    tnt: {},
    tripwire: {},
    tripwire_hook: {},
    vine: {},
    water: {},
    waterlily: {},
    wheat: {},
};

//list of scoreboard renames
var scoreboardList = {
    "stat.animalsBred": "minecraft.custom:minecraft.animals_bred",
    "stat.armorCleaned": "minecraft.custom:minecraft.clean_armor",
    "stat.aviateOneCm": "minecraft.custom:minecraft.aviate_one_cm",
    "stat.bannerCleaned": "minecraft.custom:minecraft.clean_banner",
    "stat.beaconInteraction": "minecraft.custom:minecraft.interact_with_beacon",
    "stat.boatOneCm": "minecraft.custom:minecraft.boat_one_cm",
    "stat.breakItem.minecraft.": "minecraft.broken:minecraft.", //note. this one needs special code...
    "stat.brewingStandInteraction": "minecraft.custom:minecraft.interact_with_brewingstand",
    "stat.craftItem.minecraft.": "minecraft.cratfed:minecraft.", //also special
    "stat.cakeSlicesEaten": "minecraft.custom:minecraft.eat_cake_slice",
    "stat.cauldronFiled": "minecraft.custom:minecraft.fill_cauldron",
    "stat.cauldronUsed": "minecraft.custom:minecraft.use_cauldron",
    "stat.chestOpened": "minecraft.custom:minecraft.open_chest",
    "stat.climbOneCm": "minecraft.custom:minecraft.climb_one_cm",
    "stat.craftingTableInteraction": "minecraft.custom:minecraft.interact_with_crafting_table",
    "stat.crouchOneCm": "minecraft.custom:minecraft.crouch_one_cm",
    "stat.damageDealt": "minecraft.custom:minecraft.damage_dealt",
    "stat.damageTaken": "minecraft.custom:minecraft.damage_taken",
    "stat.deaths": "minecraft.custom:minecraft.deaths",
    "stat.dispenserInspected": "minecraft.custom:minecraft.inspect_dispenser",
    "stat.diveOneCm": "minecraft.custom:minecraft.walk_under_water_one_cm",
    "stat.enderChestOpened": "minecraft.custom:minecraft.open_enderchest",
    "stat.drop.minecraft.": "minecraft.dropped:minecraft.", //special
    "stat.entityKilledBy.": "minecraft.killed_by:minecraft.", //special
    "stat.fallOneCm": "minecraft.custom:minecraft.fall_one_cm",
    "stat.fishCaught": "minecraft.custom:minecraft.fish_caught",
    "stat.flyOneCm": "minecraft.custom:minecraft.fly_one_cm",
    "stat.furnaceInteraction": "minecraft.custom:minecraft.interact_with_furnace",
    "stat.hopperInspected": "minecraft.custom:minecraft.inspect_hopper",
    "stat.horseOneCm": "minecraft.custom:minecraft.horse_one_cm",
    "stat.itemEnchanted": "minecraft.custom:minecraft.enchant_item",
    "stat.jump": "minecraft.custom:minecraft.jump",
    "stat.killEntity.": "minecraft.killed:minecraft.", //special
    "stat.leaveGame": "minecraft.custom:minecraft.leave_game",
    "stat.mineBlock.minecraft.": "minecraft.mined:minecraft.", //special
    "stat.minecartOneCm": "minecraft.custom:minecraft.minecart_one_cm",
    "stat.mobKills": "minecraft.custom:minecraft.mob_kills",
    "stat.noteblockPlayed": "minecraft.custom:minecraft.play_noteblock",
    "stat.noteblockTuned": "minecraft.custom:minecraft.tune_noteblock",
    "stat.pickup.minecraft.": "minecraft.picked_up:minecraft.", //special
    "stat.pigOneCm": "minecraft.custom:minecraft.pig_one_cm",
    "stat.playOneMinute": "minecraft.custom:minecraft.play_one_minute",
    "stat.playerKills": "minecraft.custom:minecraft.player_kills",
    "stat.recordPlayed": "minecraft.custom:minecraft.play_record",
    "stat.shulkerBoxOpened": "minecraft.custom:minecraft.open_shulker_box",
    "stat.sleepInBed": "minecraft.custom:minecraft.sleep_in_bed",
    "stat.sneakTime": "minecraft.custom:minecraft.sneak_time",
    "stat.sprintOneCm": "minecraft.custom:minecraft.sprint_one_cm",
    "stat.swimOneCm": "minecraft.custom:minecraft.swim_one_cm",
    "stat.talkedToVillager": "minecraft.custom:minecraft.talked_to_villager",
    "stat.timeSinceDeath": "minecraft.custom:minecraft.time_since_death",
    "stat.tradedWithVillager": "minecraft.custom:minecraft.traded_with_villager",
    "stat.trappedChestTriggered": "minecraft.custom:minecraft.trigger_trapped_chest",
    "stat.useItem.minecraft.": "minecraft.used:minecraft.",
    "stat.walkOneCm": "minecraft.custom:minecraft.walk_one_cm"
};

//checks block names with damage and states
function checkBlockDamage(n,id){
    var n2 = n;
    console.log("original state: " + n2);
    n = Number(n);
    console.log(n);
    console.log(id);
    if(Object.keys(dataList).includes(id) && isNaN(n) == false){
        if(dataList[id].hasMultiple){
            return {id: dataList[id].id[n], state: "[" + dataList[id].values[n] + "]"};
        }else{
            return {id: dataList[id].id, state: "[" + dataList[id].values[n] + "]"};
        }
    }
    if(n2 == undefined){
        return {
            id: id,
            state: ""
        };
    }
    return {
        id: id,
        state: "[" + n2 + "]"
    };
} //checks the list of data values for blocks. renames are used in checkRename();

//checks entity nbt
function checkEntityNBT(nbt,type){
    //will start on this when setblock is complete
}

//checks item name with damage (/give)
function checkDamage(n,obj){
    obj = obj.toLowerCase();
    if(typeof(n) != 'undefined'){
        n = Number(n);
    }else{
        n = 0;
    }
    var safe = null;
    //array.includes or array.indexOf
    if(safeFromDamageList.includes(obj) || safeFromDamageList.includes(obj.replace("minecraft:",""))){
        console.log("Object " + obj + " has been identified as a tool");
        safe = true;
        if(n > 0){
            return {
                safe: safe,
                data: "Damage:" + n
            };
        }else{
            return {
                safe: safe,
                data: ""
            }
        }
    }else{
        var da = "";
        for(var i in damageList){
            if(i == obj || i == obj.replace("minecraft:","")){
                safe = false;
                da = damageList[i][n];
                console.log("Object has a damage value and is renamed to " + da);
            }
        }
        return {
            safe: safe,
            data: da
        };
    }
}

//checks item name
function checkRename(obj){
    obj = obj.toLowerCase();
    for(var i in renameList){
        if(i == obj || i == obj.replace("minecraft:","")){
            console.log("Item has a rename id: " + renameList[i]);
            return {data: renameList[i]};
        }
    }
    return {data: obj};
}

//attepmts to remove non-needed whitespace. Might not use it right now
function removeWhiteSpace(t){
    var tab = "\u0009";
}

//attempts to fix a string object and convert it to object
function strfix(s){
    //{Command:setblock x y z command_block 1 0 {Command:"hi this is a bracket: {}"} } --> {Command:"setblock x y z command_block 1 0 {Command:\"hi this is a braket: {}\"}"}
    var insertlist = [];
    var inserttype = [];
    var instr = false;
    var nest = false;
    var complete = false;
    var needsfix = false;
    var brackets = 0;
    for(var i in s){
        if(!instr && s[i] == "\"" && !nest){ //if single quote
            console.log("found start of string");
            if(complete == false && needsfix == true){
                inserttype.push("\\");
                insertlist.push(Number(i));
            }
            instr = true;
        }else if (s.substr(i,2) == "\\\"" && !nest){ //if \"
            console.log("Found a nested string.");
            if(complete == false && needsfix == true){
                inserttype.push("\\");
                insertlist.push(Number(i));
            }
            nest = true;
        }else if (s.substr(i,2) == "\\\"" && nest){ //if ending \"
            console.log("Found 'end' of nested string");
            if(complete == false && needsfix == true){
                inserttype.push("\\");
                insertlist.push(Number(i));
            }
            nest=false;
        }else if(!nest && instr && s[i] == "\""){
            console.log("Found end of string");
            instr = false;
            if(complete == false && needsfix == true){
                inserttype.push("\\");
                insertlist.push(Number(i));
            }
        }else if(!complete && brackets == 0 && needsfix && s[i] == "{"){
            console.log("Found start of bracket");
            brackets = brackets + 1;
        }else if(!complete && brackets > 0 && s[i] == "}"){
            console.log("Found an end of bracket");
            brackets = brackets - 1;
        }else if (!instr && s[i] == ":" && s[Number(i)+1] != "\"" && !needsfix && s[Number(i) + 1] != "{" && s[Number(i) + 1] != "["){ //if not in a string, and is : and is not a number.
            if(nn(s.substr(Number(i) + 1,Infinity))){
                console.log("Found a missing quote");
                insertlist.push(Number(i) + 1);
                inserttype.push("\"");
                complete = false;
                needsfix = true;
            }
        }else if(!instr && (s[i] == "}" || s[i] == ",") && !complete && needsfix && brackets == 0){
            console.log("Found end of broken string");
            insertlist.push(Number(i));
            inserttype.push("\"");
            complete = true;
            needsfix = false;
        }
    }
    var l = s.split("");
    console.log(inserttype);
    console.log(insertlist);
    for(var u in insertlist){
        console.log(insertlist[u]);
        l[insertlist[u]] = inserttype[u] + l[insertlist[u]];
    }
    console.log("result: " + l.join(""));
    return l.join("");
}

//looks for repetition
function repetition(obj,n){}

//this will be used to fix 10b, 10.0f, etc errors
function fixsub(str){}

//checks string for number...
function nn(st){
    var str = "";
    
    for(var k in st){
        if(st[k] == "}" || st[k] == "]" || st[k] == ","){
            console.log("Hit end of 'string'. String: " + str);
            if(str == ""){
                return true;
            }
            return isNaN(str);
        }else{
            str = str + st[k];
        }
    }
    console.log("Hit end of 'string'. String: " + str);
    if(str == ""){
        return true;
    }
    return isNaN(str);
}

//converts strings to objects
function pars(str){
    var o;
    eval("o = " + strfix(str));
    /*global o*/console.log(o);
    return o;
}

//item nbt tag COME BACK TO CHECKNBT AND CHECKSPAWNEGG AFTER SUMMON COMMAND COMPLETE
function checkNBT(dat){
    if(typeof(dat) != 'undefined'){
        var fixednbt = pars(dat);
        var id = undefined;
        //checkRepeat();
        
        //spawn egg
        if(typeof(fixednbt.EntityTag) != 'undefined'){
            id = checkSpawnEgg(fixednbt.EntityTag).item;
            fixednbt = pars(dat);
            fixednbt.EntityTag = checkSpawnEgg(fixednbt.EntityTag).nbt;
            if(typeof(fixednbt.EntityTag != 'undefined')){
                delete fixednbt.EntityTag;
            }
        }
        //display
        if(typeof(fixednbt.display) != 'undefined'){
            fixednbt.display = updateDisplay(fixednbt.display);
        }
        
        //enchants
        if(typeof(fixednbt.ench) != 'undefined'){
            fixednbt.Enchantments = updateEnchantments(fixednbt.ench);
            delete fixednbt.ench;
        }
        
        return {data:str(fixednbt),id:id};
    }
    return "";
} //item nbt

//updates spawn egg tag
function checkSpawnEgg(nbt){
    //for summon
    //looks like this: {EntityTag:{id:blah,CustomName:blah,etc}}
    
    nbt.id = nbt.id.toLowerCase();
    
    //for give or item
    var it = nbt.id + "_spawn_egg";
    delete nbt.id;
    
    return {data: nbt, item: it};
}

//thanks to http://jsfiddle.net/numoccpk/1/
//converts objects to strings
function str(obj) {
    var prop;
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (obj == undefined) {
    	return String(obj);
    } else if (typeof(obj) == "object" && (obj.join == undefined)) {
        for (prop in obj) {
        	if (obj.hasOwnProperty(prop))
            string.push(prop + ":" + str(obj[prop]));
        };
    console.log("{" + string.join(",") + "}");
    return "{" + string.join(",") + "}";

    //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        for(prop in obj) {
            string.push(str(obj[prop]));
        }
    return "[" + string.join(",") + "]";

    //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

    //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }
    
    console.log(string.join(","));
    return string.join(",");
}

var enchantFixes = ["protection","fire_protection","feather_falling","blast_protection","projectile_protection","respiration","aqua_affinity","thorns","depth_strider","frost_walker","binding_curse","","","","","","sharpness","smite","bane_of_arthropods","knockback","fire_aspect","looting","sweeping","","","","","","","","","","efficiency","silk_touch","unbreaking","fortune","","","","","","","","","","","","","power","punch","flame","infinity","","","","","","","","","","luck_of_the_sea","lure","","","","","","","","mending","vanishing_curse"];

function updateEnchantments(data){
    if(typeof(data) == 'undefined'){
        return "";
    }else{
        var enchObj = [];
        for(let i in data){
            enchObj.push({id:enchantFixes[data[i].id],lvl:data[i].lvl});
        }
        return enchObj;
    }
}

//updates display tag
function updateDisplay(dats){
    if(typeof(dats) == 'undefined'){
        return "";
    }else{
        //fix the display tag
        if(typeof(dats.Name) !== 'undefined'){
            console.log("dats.Name: " + dats.Name);
            dats.Name = dats.Name.replace(/\\/img,"\\\\");
            dats.Name = dats.Name.replace(/\"/img,"\\\"");
            dats.Name = "{\"text\":\"" + dats.Name + "\"}";
        }
        /*if(typeof(dats.Lore) !== 'undefined'){
            for(var i in  dats.Lore){
                dats.Lore[i] = "{\"text\":\"" + dats.Lore[i] + "}";
            }
        }*///Aparently, Lore does not use the new text format...
        return dats;
    }
}

//checks selector
function checkSelector(sel){
    sel = sel.substr(3);
    sel = sel.substr(0,sel.length - 1);
    console.log(sel);
    //hopefully, all odds should be the actual selector thing
    sel = sel.split(/=|,/img);
    console.log("'sel' after split");
    console.log(sel);
    var onlyOdds = [];
    var onlyEvens = [];
    for(var h in sel){
        if(h % 2 != 0){
            onlyEvens.push(sel[h]);
        }
    }
    console.log(onlyEvens);
    for(var i in sel){
        if(i % 2 == 0){
            onlyOdds.push(sel[i]);
        }
    }
    console.log(onlyOdds);
    var ok = false;
    var mins = [];
    var maxs = [];
    var add = [];
    var scores = {};
    var deleted = [];
    
    //removing all scoreboard tings from onlyEvens and onlyOdds
    //requires fix V 0.1.10 Fix Version 0.1.14
    console.log("length of onlyOdds is " + onlyOdds.length);
    var oldL = onlyOdds.length;
    for(var z = 0; z < oldL + 1; z++){
        console.log(z - down(deleted,2));
        //make sure no darn TypeError occurs :p
        if(typeof(onlyOdds[z - down(deleted,z)]) != 'undefined'){
            if(onlyOdds[z - down(deleted,z)].substr(0,5) == "score"){
                scores[onlyOdds[z - down(deleted,z)]] = onlyEvens[z - down(deleted,z)];
                
                //delete
                onlyOdds.splice(z - down(deleted,z),1);
                onlyEvens.splice(z - down(deleted,z),1);
                deleted.push(z - down(deleted,z));
                console.log("successfully removed score object");
            }
        }
    }
    console.log("results after removing scores: ");
    console.log(deleted);
    console.log(scores);
    console.log(onlyOdds);
    console.log(onlyEvens);
    
    //needs fix (V 0.1.8) fix version: V 0.1.9
    if(JSON.stringify(scores) != "{}"){
        ok = true;
    }
    for(var j in onlyOdds){
        switch (onlyOdds[j]) {
            case 'm':
                onlyOdds[j] = "gamemode";
                onlyEvens[j] = checkGamemode(onlyEvens[j]);
                ok = true;
                break;
            case 'r':
                maxs.push("r");
                ok = true;
                break;
            case 'l':
                maxs.push("l");
                ok = true;
                break;
            case 'c':
                onlyOdds[j] = "limit";
                if(Number(onlyEvens[j]) > 0){
                    add.push("sort");
                    add.push("nearest");
                }
                if(Number(onlyEvens[j]) < 0){
                    console.log("limit is lower than 0, attemping to update it to a positive number: " + onlyEvens[j] + " at index " + j);
                    onlyEvens[j] = String(Math.abs(Number(onlyEvens[j])));
                    add.push("sort");
                    add.push("furthest");
                }
                ok = true;
                break;
            case 'lm':
                mins.push("lm");
                ok = true;
                break;
            case 'rm':
                mins.push("rm");
                ok = true;
                break;
            case 'rx':
                maxs.push("rx");
                ok = true;
                break;
            case 'ry':
                maxs.push("ry");
                ok = true;
                break;
            case "rxm":
                mins.push("rxm");
                ok = true;
                break;
            case "rym":
                mins.push("rym");
                ok = true;
                break;
            default:
                //no selector!
                console.log("No selector found");
                if(ok == false && j >= onlyOdds.length - 1){
                    return "";
                }
        }
    }
    
    function down(arg,num){
        var g = 0;
        for(var i in arg){
            if(num > arg[i]){
                g ++;
            }
        }
        return g;
    }
    
    console.log("minimum selectors found: " + mins);
    console.log("maximum selectors found: " + maxs);
    //determines what to delete and stuff :p
    for(var k in maxs){
        var min;
        var max;
        var indexMax;
        var indexMin;
        //if r was found
        if(maxs[k] == 'r'){
            //using this for all maxs and mins btw
            var includesRM = false;
            //if rm was also used
            if(mins.includes('rm')){
                includesRM = true;
                min = onlyEvens[onlyOdds.indexOf('rm')];
                indexMin = onlyOdds.indexOf('rm');
                max = onlyEvens[onlyOdds.indexOf('r')];
                indexMax = onlyOdds.indexOf('r');
                //removes the min
                onlyOdds.splice(indexMin,1);
                onlyEvens.splice(indexMin,1);
                mins.splice(mins.indexOf('rm'),1);
                
                if(indexMax > indexMin){
                    indexMax -= 1;
                }
                //renames the max to correct thing
                onlyOdds[indexMax] = "distance";
                onlyEvens[indexMax] = min + ".." + max;
                //if rm is equal to r
                if(min == max){
                    onlyEvens[indexMax] = String(max);
                }
            }
            //if rm was not used
            if(includesRM == false){
                indexMax = onlyOdds.indexOf('r');
                max = onlyEvens[onlyOdds.indexOf('r')];
                //renames
                onlyOdds[indexMax] = "distance";
                onlyEvens[indexMax] = ".." + max;
            }
        }
        //if it contains 'l'
        if(maxs[k] == 'l'){
            var includesLM = false;
            //if lm is used
            if(mins.includes('lm')){
                includesLM = true;
                min = onlyEvens[onlyOdds.indexOf('lm')];
                indexMin = onlyOdds.indexOf('lm');
                max = onlyEvens[onlyOdds.indexOf('l')];
                indexMax = onlyOdds.indexOf('l');
                //removes the min
                onlyOdds.splice(indexMin,1);
                onlyEvens.splice(indexMin,1);
                mins.splice(mins.indexOf('lm'),1);
                
                if(indexMax > indexMin){
                    indexMax -= 1;
                }
                //renames the max to correct thing
                onlyOdds[indexMax] = "level";
                onlyEvens[indexMax] = min + ".." + max;
                //if lm = l
                if(min == max){
                    onlyEvens[indexMax] = String(max);
                }
            }
            //if lm was not used
            if(includesLM == false){
                indexMax = onlyOdds.indexOf('l');
                max = onlyEvens[onlyOdds.indexOf('l')];
                //renames
                onlyOdds[indexMax] = "level";
                onlyEvens[indexMax] = ".." + max;
            }
        }
        //if i contains rx
        if(maxs[k] == 'rx'){
            var includesRX = false;
            //if rxm is used
            if(mins.includes('rxm')){
                includesRX = true;
                min = onlyEvens[onlyOdds.indexOf('rxm')];
                indexMin = onlyOdds.indexOf('rxm');
                max = onlyEvens[onlyOdds.indexOf('rx')];
                indexMax = onlyOdds.indexOf('rx');
                //removes the min
                onlyOdds.splice(indexMin,1);
                onlyEvens.splice(indexMin,1);
                mins.splice(mins.indexOf('rxm'),1);
                
                if(indexMax > indexMin){
                    indexMax -= 1;
                }
                //renames the max to correct thing
                onlyOdds[indexMax] = "x_rotation";
                onlyEvens[indexMax] = min + ".." + max;
                //if rx =rxm
                if(min == max){
                    onlyEvens[indexMax] = String(max);
                }
            }
            //if rxm was not used
            if(includesRX == false){
                indexMax = onlyOdds.indexOf('rx');
                max = onlyEvens[onlyOdds.indexOf('rx')];
                //renames
                onlyOdds[indexMax] = "x_rotation";
                onlyEvens[indexMax] = ".." + max;
            }
        }
        //if ry is used
        if(maxs[k] == 'ry'){
            var includesRY = false;
            //if rym is used
            if(mins.includes('rym')){
                includesRY = true;
                min = onlyEvens[onlyOdds.indexOf('rym')];
                indexMin = onlyOdds.indexOf('rym');
                max = onlyEvens[onlyOdds.indexOf('ry')];
                indexMax = onlyOdds.indexOf('ry');
                //removes the min
                onlyOdds.splice(indexMin,1);
                onlyEvens.splice(indexMin,1);
                mins.splice(mins.indexOf('rym'),1);
                
                if(indexMax > indexMin){
                    indexMax -= 1;
                }
                //renames the max to correct thing
                onlyOdds[indexMax] = "y_rotation";
                onlyEvens[indexMax] = min + ".." + max;
                //if ry = rym
                if(min == max){
                    onlyEvens[indexMax] = String(max);
                }
            }
            //if rxm was not used
            if(includesRY == false){
                indexMax = onlyOdds.indexOf('ry');
                max = onlyEvens[onlyOdds.indexOf('ry')];
                //renames
                onlyOdds[indexMax] = "y_rotation";
                onlyEvens[indexMax] = ".." + max;
            }
        }
    }
    //loop thru mins. If the min still exists, then the max doesnt as all the maxs remove the mins above
    console.log(mins);
    console.log(maxs);
    for(var l in mins){
        //radius min
        if(mins[l] == 'rm'){
            onlyOdds[l] = "distance";
            onlyEvens[l] = onlyEvens[l] + "..";
        }
        //level min
        if(mins[l] == 'lm'){
            onlyOdds[l] = "level";
            onlyEvens[l] = onlyEvens[l] + "..";
        }
        //rotation x
        if(mins[l] == 'rxm'){
            onlyOdds[l] = "x_rotation";
            onlyEvens[l] = onlyEvens[l] + "..";
        }
        //rotation y
        if(mins[l] == 'rym'){
            onlyOdds[l] = "y_rotation";
            onlyEvens[l] = onlyEvens[l] + "..";
        }
    }
    
    //scoreboard stuffs
    //requires fix 0.1.10 Fix version: 0.1.12
    if(JSON.stringify(scores) != "{}"){
        mins = [];
        maxs = [];
        max = 0;
        min = 0;
        console.log("old scores:");
        console.log(scores);
        for(var w in scores){
            //if the var is not a min
            if(w.substr(w.length - 4,4) !== "_min"){
                max = scores[w];
                //if a min version does exist
                if(typeof(scores[w + "_min"]) != 'undefined'){
                    //if the numbers are the same
                    if(Number(scores[w]) == Number(scores[w + "_min"])){
                        delete scores[w + "_min"];
                        delete scores[w];
                        scores[w.substr(6,w.length - 6)] = max;
                    }else{
                        scores[w.substr(6,w.length - 6)] = scores[w + "_min"] + ".." + max;
                        delete scores[w];
                        delete scores[w + "_min"];
                    }
                //if min version doesn't exist
                }else{
                    delete scores[w];
                    scores[w.substr(6,w.length - 6)] = ".." + max;
                }
            }
        }
        //new loop thru to see if there are any stray mins
        console.log("scores after first loop");
        console.log(scores);
        for(w in scores){
            //if a min is still found
            if(w.substr(w.length - 4,4) == '_min'){
                min = scores[w];
                delete scores[w];
                var str = w.substr(0,w.length - 4);
                str = str.substr(6,str.length - 6);
                scores[str] = min + "..";
            }
        }
    }
    console.log("new scores:");
    console.log(scores);
    
    sel = [];
    for(var m in onlyOdds){
        sel.push(onlyOdds[m]);
        sel.push(onlyEvens[m]);
    }
    for(var p in add){
        if(p % 2 == 0){
            p = Number(p);
            sel.push(add[p]);
            sel.push(add[p+1]);
        }
    }
    //addScores
    var nu = 0;
    //used to delete extra obj
    //fix needed 0.1.10 Fix version 0.1.13
    for(m in scores){
        //if first time adding scores
        if(nu == 0){
            //if it is the only thing in it..
            if(Object.keys(scores).length == 1){
                sel.push("scores=={");
                sel.push(m);
                sel.push(scores[m] + "}");
            }else{
                sel.push("scores=={");
                sel.push(m);
                sel.push(scores[m]);
            }
        //if last item
        }else if(nu == Object.keys(scores).length - 1){
            sel.push(m);
            sel.push(scores[m] + "}");
        }else{
            sel.push(m);
            sel.push(scores[m]);
        }
        nu ++;
    }
    
    console.log("final res");
    console.log(sel);
    return (filter(sel.join("=")) + "]").replace("scores={,","scores={");
}

//requires fix 0.1.10 Fix Version: 0.1.11
function filter(str){
    str = str.split("");
    var skip = 0;
    for(var i in str){
        //if scoreboard?
        var ignore = false;
        if(str[i] + str[i-1] == "=="){
            ignore = true;
            str.splice(i, 1);
            console.log("Skipping object as index " + i);
            console.log(str);
        }
        if(str[i] == "=" && ignore == false){
            skip += 1;
            if(skip % 2 == 0){
                str[i] = ",";
                skip = 0;
            }
        }
    }
    return str.join("");
}

//checks gamemode
function checkGamemode(mode){
    mode = mode.toLowerCase();
    if(mode == 1 || mode.substr(0,1) == 'c'){
        return "creative";
    }
    if(mode == 0 || mode.substr(0,2) == 'su'){
        return "survival";
    }
    if(mode == 2 || mode.substr(0,1) == 'a'){
        return "adventure";
    }
    if(mode == 3 || mode.substr(0,2) == 'sp'){
        return "spectator";
    }
    console.log("undefined gamemode " + mode);
    return "error";
}