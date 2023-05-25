
const {redditExtract} = require('./redditExtract.js');


class RedditCheckPost {
    constructor(filter,dbName) {
        this.filter = filter;
        this.dbName = dbName;
        //this.hentai = new Hentai;
    }

    meme() {
        let subreddits = ['animemes', 'dankmemes']
        return redditExtract(subreddits,this.filter,this.dbName);
    }
    cosplay(){
        let subreddits = ['CosplayLewd','CosplayNsfw','CosplayPornVideos','NudeCosplay','AhegaoCosplay','Waifus34','GeekyBikini','GeekyChan','cosplaybabes','nsfwcosplay']
        return redditExtract(subreddits,this.filter,this.dbName);
    }
    ecchi(){
        let subreddits = ['Artistic_Ecchi']
        return redditExtract(subreddits,this.filter,this.dbName);
    }
    ai_gen(){
        let subreddits = ['AIhentai','Artistic_AI','HentaiAI','AiUncensored'] //AIpornhub AI_porn_general AI_Girl NovelAI_Hentai
        return redditExtract(subreddits,this.filter,this.dbName);
    }
    thigh(){
        let subreddits = ['thighdeology','muchihentai','ThighGapHentai','Thighjobhentai','thighhighhentai','thick_hentai']
        return redditExtract(subreddits,this.filter,this.dbName);
    }
}

module.exports = RedditCheckPost;
// async function test() {
//     let testClass = new RedditCheckPost('new','testP');

//     let mytest;
//     mytest = (await testClass.pornhwa());
//     // if(mytest.error){
//     //     console.log('err')
//     //     return test();

//     // };
//     console.log(mytest);
//     console.log(mytest.length);

// }

// test();