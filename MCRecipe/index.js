//MC COMMAND UPDATER
//VERSION 0.1.1

//vars
var out = document.getElementById('output');
var justincase = console.log;
console.log = function(m){
    var consol = document.getElementById('console');
    if(typeof(m) == 'string' || typeof(m) == 'number'){
        consol.innerText += m + "\n";
    }else{
        consol.innerText += str(m) + "\n";
    }
};

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
            var nbt = checkNBT(ar[5]);
            if(altS !== ""){
                if(typeof(nbt) != 'undefined' && nbt != ""){
                    nbt = nbt.substring(0,nbt.length - 1);
                    nbt = nbt + "," + altS + "}";
                }else{
                    nbt = "{" + altS + "}";
                }
            }
            //if statement :p
            if(ar[3] === undefined){
                ar.push("");
            }
            fin = ar[0] + p + ar[1] + p + s.data + nbt + p + ar[3];
            break;
        
        default:
            console.error("parseError: Unidentified type " + typ + " or invalid version");
            fin = null;
    }
    return fin;
}
function checkDamage(n,obj){
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
function checkNBT(dat){
    if(typeof(dat) != 'undefined'){
        var fixednbt = pars(dat);
        //checkRepeat();
        
        //checkSpawnEgg();
        
        if(typeof(fixednbt.display) != 'undefined'){
            fixednbt.display = updateDisplay(fixednbt.display);
        }
        
        return str(fixednbt);
    }
    return "";
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
    
}