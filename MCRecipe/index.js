//MC COMMAND UPDATER
//VERSION 0.1.8
/*Update log:
*Dates may be off
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
*/

//vars
var out = document.getElementById('output');
var justincase = {con: console.log, clear: console.clear};
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
}

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
    brown_mushroom_block: ["brown_mushroom_block","mushroom_stem"],
    red_mushroom_block: ["red_mushroom_block","mushroom_stem"],
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
};

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
function getType(text){
    var t = text.split(" ")[0];
    t = t.replace(/\//img,"");
    return t;
}
function parse(typ,version,version2,te){
    var fin = "";
    var p = " ";
    switch (typ) {
        case 'give':
            var ar = te.split(" ");
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
            
            var nbt = checkNBT(ar[5]);
            if(altS !== ""){
                if(typeof(nbt) != 'undefined' && nbt != ""){
                    nbt = nbt.substr(0,nbt.length - 1);
                    nbt = nbt + "," + altS + "}";
                }else{
                    nbt = "{" + altS + "}";
                }
            }
            //if statement :p
            if(ar[3] === undefined){
                ar.push("");
            }
            fin = ar[0] + p + ar[1] + se + p + s.data + nbt + p + ar[3];
            break;
            
        case 'gamemode':
            ar = te.split(" ");
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
            break;
            
        case 'toggledownfall':
            fin = "weather clear";
            alert("In 1.13, /toggledownfall was removed. There is now no command that toggles rain and clear skies. So, this fixer just assumes you use it to clear the sky");
            break;
        
        default:
            console.error("parseError: Unidentified type " + typ + " or invalid version");
            fin = null;
    }
    return fin;
}
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
function pars(str){
    eval("var o =" +  str);
    /*global o*/console.log(o);
    return o;
}
//item nbt tag COME BACK TO CHECKNBT AND CHECKSPAWNEGG AFTER SUMMON COMMAND COMPLETE
function checkNBT(dat){
    if(typeof(dat) != 'undefined'){
        var fixednbt = pars(dat);
        //checkRepeat();
        //spawn egg
        if(typeof(fixednbt.EntityTag) != 'undefined'){
            fixednbt.EntityTag = checkSpawnEgg(fixednbt.EntityTag);
        }
        //display
        if(typeof(fixednbt.display) != 'undefined'){
            fixednbt.display = updateDisplay(fixednbt.display);
        }
        
        return str(fixednbt);
    }
    return "";
}

function checkSpawnEgg(nbt){
    //for summon
    //looks like this: {EntityTag:{id:blah,CustomName:blah,etc}}
    
    nbt.id = nbt.id.toLowerCase();
    
    
    //for give or item
    var it = nbt.id + "_spawn_egg";
    
    return {data: nbt, item: it};
}

//thanks to http://jsfiddle.net/numoccpk/1/
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


function updateDisplay(dats){
    if(typeof(dats) == 'undefined'){
        return "";
    }else{
        //fix the display tag
        if(typeof(dats.Name) !== 'undefined'){
            dats.Name = "{\"text\":\"" + dats.Name + "\"}";
        }
        if(dats.Lore !== undefined){
            for(var i in  dats.Lore){
                dats.Lore[i] = "{\"text\":\"" + dats.Lore[i] + "}";
            }
        }
        return dats;
    }
}
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
                if(ok == false){
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