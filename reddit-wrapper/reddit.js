const {request} = require('./request.js');

class RedditAPI{
    constructor(){
        this.real = new Real;
        //this.hentai = new Hentai;
    }
}

class Real{
    pifs(){
        let subreddits=['porninaminute','PornIn1Minute','PornInMinute','porninfifteenseconds']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    random() {
        let subreddits = ["girlsinyogapants", "Thighs", "thighhighs", "ThickThighs", "UnderwearGW", "datgap", "leggingsgonewild", "pawg", "hipcleavage", "legs", "pantyhose", "ass", 
        "paag", "asstastic", "buttplug", "whooties", "AssholeBehindThong", "Frogbutt", "rearpussy", "CuteLittleButts", "HungryButts", "reversecowgirl", "facedownassup", 
        "butt", "butts", "pawg", "bigasses", "cosplaybutts", "BubbleButts", "assinthong", "smalltitsbigass", "CelebrityButts", "booty", "panties", "FullBackPanties", "PantiesToTheSide",
        "thongs", "xsmallgirls", "PublicSexPorn", "cameltoe", "smallboobs", "LegalTeens", "TooCuteForPorn", "adorableporn", "AsiansGoneWild", "trashyboners", "StraightGirlsPlaying", 
        "LipsThatGrip", "spreadeagle", "dirtysmall", "nsfw", "pussy", "gonewild", "SexyTummies", "SpreadEm", "Ahegao_IRL", "nsfwcosplay", "RealGirls", "lesbians", "Fingering", "AnalGW",
        "anal", "freeuse", "BorednIgnored", "grool", "jilling", "porn", "Amateur", "TinyTits", "PetiteGoneWild", "cumsluts", "AsianHotties", "simps", "slimgirls", "ginger", "palegirls", 
        "BustyPetite", "Innie"];
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    
    }
    thighs() {
        let subreddits = ["girlsinyogapants", "Thighs", "thighhighs", "ThickThighs", "UnderwearGW", "datgap", "leggingsgonewild", "pawg", "hipcleavage", "legs", "pantyhose"];
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    ass() {
        let subreddits = ["AssholeBehindThong",'LoveToWatchYouLeave',
        'SpreadEm',
        'HighResASS',
        'twerking',
        'ButtsAndBareFeet',
        'booty_gifs',
        'Underbun',
        'AssOnTheGlass',
        'Tushy',
        'datass',
        'NoTorso',
        'BoltedOnBooty',
        'Top_Tier_Asses',
        'assgifs',
        'Cheeking',
        'datbuttfromthefront','StandingAsshole',
        'asshole',
        'FaceAndAsshole'];
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    panties() {
        let subreddits = ["panties", "FullBackPanties", "AssholeBehindThong", "assinthong", "PantiesToTheSide", "thongs", "UnderwearGW"];
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    goneWild() {
        let subreddits = [
            'gonewild',
            'gonewildcurvy',
            'asstastic',
            'AsiansGoneWild',
            'GWCouples', 
            'treesgonewild',
            'gonewildaudio',
            'workgonewild',
            'GWNerdy',
            'BigBoobsGW',
            'GoneMild',
            'altgonewild',
            'gifsgonewild',
            'gonewildcolor',
            'BDSMGW',
            'AnalGW',
            'dykesgonewild',
            'gonewildcouples',
            'GoneWildSmiles',
            'UnderwearGW',
            'TributeMe',
            'LabiaGW',
            'BigBoobsGonewild',
            'GoneInsane',
            'GonewildAlbums',
            'TallGoneWild',
            'gwpublic',
            'leggingsgonewild',
            'GoneWildHairy',
            'ArtGW',
            'IndiansGoneWild',
            'GoneWildCD',
            'mycleavage',
            'daresgonewild',
            'RateMyNudeBody',
            'TeaseMePleaseMe',
            'GoneWildScrubs',
            'couplesgonewild',
            'bigonewild',
            'GonewildFaces',
            'gwbooks',
            'MasturbationGoneWil',
            'LingerieGW',
            'ShowerBeerGoneWild',
            'gonewildmetal',
            'GONEWILDTWERK',
            'socksgonewild',
            'GoneErotic',
            'DirtyPantiesGW',
            'goneclothed',
            'GirlsGoneDogeCoin',
            'DesiGoneWild',
            'ketogonewild',
            'milfgw',
            'EdmontonGoneWild']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    bouncy(){
        return request('resonantfrequency')
    }
    tightCloths(){
        let subreddits = ['SmallBoobsTightShirts',
            'girlsinyogapants',
            'thongbodysuit',
            '2busty2hide',
            'YogaPants',
            'HungryButts',
            'leggingsgonewild',
            'tight_shorts',
            'tightsqueeze',          
            'TightsAndTightClothes',
            'cameltoeoriginals',
            'BarelyContained',     
            'girlsinyogashorts',
            'tights',
            'TightAndPhat',          
            'StrainedButtons',
            'YogaCameltoes',          
            'TightWetClingy',          
            'RearCameltoe',
            'Nipple_Ripple',
            ];
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);

    }
    topless(){
        let subreddits = ['toplessbeachamateurs',
        'skirtnoshirt',
        'ToplessInPanties',
        'ToplessInPublic',
        'EquallyTopless',
        'ToplessInJeansPlus',
        'Topless_Vixens',
        'ToplessInYogaPants',
        'NoShoesNoShirt',
        'ToplessOnePiece']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    uniform(){
        let subreddits = ['nsfwoutfits',
            'GoneWildScrubs',
            'NSFWCostumes',
            'MilitaryGoneWild',
            'SluttyHalloween',
            'nursesgw',
            'Secretary',
            'frenchmaid',
            'hotofficegirls',
            'GirlsInRealUniforms',
            'OfficeSexPorn',
            'UniformFetish',
            'WafukuAsians',
            'girlsinuniform',
           'WorkGoneWildNurse',
            'AsianCheerleaders',
]
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    cosplay(){
        let subreddits =['CosplayPornVideos',
        'cosplaygirls',
        'nsfwcosplay',
        'cosplaybabes',
        'CosplayBoobs',
        'cosplaybutts',
        'CosplayLewd',
        'cat_girls',
        'CosplayNation',
        'ParodyPornVideos',
        'gwcosplay',
        'CosPlayPorn',
        'Superherosluts',
        'BootyCosplay',
        'CosplayFeet',
        'CosplayGals',
        'Cosplayheels']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    pussy(){
        let subreddits = [
            'pussy',
            'rearpussy',
            'simps',
            'vagina',
         
            'PussyMound',
           

            'vulva',

            'spreading',
            'Pink',
            'bigclit',

            'pelfie',
            'closeup',
            'shavedpussies',

            'HairyPussy',
           
            'Naturalgirls',
            'thefullbush',
            'HairyAssGirls',
            'Hairy',
           
            'FuzzyPeeks',
            'DyedPubes',
            'hairychicks',
            'LipsThatGrip',
          
            'ButterflyWings',
            'peachlips',]
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    boobs(){
        let subreddits = [
            'Boobies',
            'TittyDrop',
            'boobbounce',
            'boobs',
            'homegrowntits',
            'youtubetitties',
            'BreastEnvy',

            'naturaltitties',
            'tits',
            'handbra',
            'Saggy',
            'Bigtitssmalltits',
            'torpedotits',
           
            'SloMoBoobs',
            'PerfectTits',
            
            'Perky',
            'cleavage',
            'TheUnderboob',
            'TheHangingBoobs',
            'JustOneBoob',
            
            'underboob',
            'OneInOneOut',
            'boltedontits',
           
            'BeforeAndAfterBolton',
            'BoltedOnMaxed',
            'BustyPetite',
            'burstingout',
            'hugeboobs',
            'Stacked',

            'Hugeboobshardcore',

            'bigboobs',
            'EngorgedVeinyBreasts',
           
            'Busty',
            
            'Bustyfit',
            
            'SlutBusty',
            
            'Nipples',
           
            'Puffies',
            'areolas',
           
            'bigareolas',
            'dirtysmall',
            'TinyTits',
            'aa_cups',
            'B_Cups',
]
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    cum(){
        let subreddits = ['before_after_cumsluts',
            'cumsluts',
            'cumfetish',
            'cumcoveredfucking',
            'amateurcumsluts',

            'cumonclothes',
            'CumSwap',
            'OhCumOn',
            'IsThatCUM',

            'FakeCum',
            'prematurecumshots',
            'World_of_cum'
        ]
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);

    }
    creampie(){
        let subreddits = ['creampiegifs',
        'creampies',
        'creampie',
        'Breeding',
        'felching',
        'CumFarting']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);

    }
    cumshot(){
        let subreddits = ['GirlsFinishingTheJob', 'OralCreampie',
            'CumSwallowing',
            'thickloads',
            'CumHaters',
            'bodyshots',
            'cumshots',
            'coveredincum',
            'cumshotgifs',
            'CumInTheAir',
            'pulsatingcumshots',
            'cumbtwntits',
            'FacialFun',
            'Facials',
            'after_the_shot',
            'facialcumshots',
            'CumshotSelfies']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);

    }
    asian(){
        let subreddits = [,
            'AsianHotties',
            'juicyasians',
            'AsianPorn',
            'bustyasians',
            'NSFW_China',
            'AsianCumsluts',
            'JapaneseHotties',
            'AsianPussy',
            'AmateurAsianGirls',
            'AsianAsshole',
            'asian_gifs',
            'AsianBlowjobs',
            'KoreanHotties',
            'AsianNipples',
            'AsianChicks',
            'Asian_Fever',
            'SexDolls',
            'NSFW_Japan',
            'Gravure',
            'SoftcoreJapan',
        ]
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);

    }
    general(){
        let subreddits = [
            'nsfw',
            'nsfwhardcore',
            'HighResNSFW',
            'BonerMaterial',
            'porn',
            'iWantToFuckHer',
            'Sexy',
            'NSFW411',
            'UnrealGirls',
            'nsfw_hd',
            'UHDnsfw',
            'HotGirls',
            'Babes',
            'FilthyGirls',
            'sexynsfw',
            'HardcoreSex',
            'PornLovers',
            'NSFWgaming',
            'oculusnsfw',
            'Ranked_Girls',
            'fapfactory',
            'fapfapfap',
            'Sexyness',
            'LuckyCameraman',
            'fappygood',
            'QualityNsfw']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
    gifs(){
        let subreddits = ['porninfifteenseconds',
            'NSFW_GIF',
            'nsfw_gifs',
            '60fpsporn',
            'NSFW_HTML5',
            'porn_gifs',
            'adultgifs',
            'randomsexygifs',
            'XXX_Animated_Gifs',
            'PornGifs',
            'motiontrackedboobs',
            'NSFW_SEXY_GIF',
            'nsfwgif',
            'NSFW_GFY',
            'MotionTrackedPorn',
            'chixxx_gifs',
            'AnimatedGIF',
            'Penetration_gifs',
            'porngif',
            'sexgifs',
            'PornGifsbyBot',
            'rud_fuckers',
            'nsfwHTML5',
            'AnimatedPornGifs',
            'ThickLogic']
        return request(subreddits[Math.floor(Math.random() * subreddits.length)]);
    }
}
class Hentai{

}
class Memes{

}

// async function test(){
//     let testClass = new RedditAPI;

//     let mytest = await testClass.real.gifs();
//     if(mytest.error){
//         console.log('err')
//         return test();
        
//     };
//     console.log(mytest);
    
// }

// test();
module.exports = {RedditAPI};