
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