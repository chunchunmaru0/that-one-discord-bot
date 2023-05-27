const MongoClient = require('mongodb').MongoClient;
const counter = require('../utils/Counter.js')
const url = 'mongodb://192.168.1.12:27017';
const dbName = 'introPerVertDB'

let testCounter = 0;
let newLog = []
async function redditExtract(subreddits, filter, collName, callingMethod) {
    const methodName = callingMethod.name;
    //console.log(methodName)
    try {
        const mongoClient = await MongoClient.connect(url);
        const db = mongoClient.db(dbName);
        let resArr = [];
        let consoleTable = []
        for (const subreddit of subreddits) {

            //console.log("\x1b[32m",subreddit,"\x1b[0m")
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/${filter}.json?limit=1`)//${filter} ?limit=100&t=all
            //Check for rate limitaion
            const remainingRequests = parseInt(response.headers.get('x-ratelimit-remaining'));
            const resetTime = parseInt(response.headers.get('x-ratelimit-reset'));

            //console.log(remainingRequests, resetTime)
            if (remainingRequests === 0) {
                // Calculate time until rate limit reset (in seconds)
                //Redit uses x-ratelimit-reset as reset second itself!
                //if(response.status !==200){await new Promise((resolve) => setTimeout(resolve, 120 * 1000));}
                if (resetTime > 0) {
                    //console.log(`Rate limit reached. Waiting for ${resetTime} seconds...`);
                    //await new Promise((resolve) => setTimeout(resolve, resetTime * 1000));
                }
            }

            const data = await response.json();
            const posts = data.data.children.map(child => child.data); //Post Data from Reddit Response API

            const collection = db.collection(collName); //Collection of documents from the db //this can be passed as an argument for diffrent collection collName

            for (const post of posts) {

                const existingPost = await collection.findOne({ id: post.id });
                //check if there's already such post in my db
                if (!existingPost) {
                    testCounter++
                    
                    await collection.insertOne({
                        id: post.id, subreddit: post.subreddit, permalink: post.permalink,
                        url: post.url
                    });

                    let extractedPayload = (extractRedditPost(post))
                    
                    //console.log(extractedPayload)
                    if (extractedPayload !== undefined) {
                        counter.incrementCounter();
                        //Send to Discord

                        //console.log('New post:', post.title, 'Subreddit:', subreddit);
                        let title = post.title;
                        if (post.title.length > 60) {
                            title = post.title.substring(0, 57) + '...'
                        }
                        const logData = { 'method': methodName, 'Title': title, 'Subreddit': post.subreddit };
                        console.log('\x1b[1m 🔥 New post:💦 \x1b[0m', post.title, 'Subreddit:', `\x1b[32m ${post.subreddit}\x1b[0m`);
                        consoleTable.push(logData);
                        resArr.push(extractedPayload)
                    }

                }
            }
        }
        // Close the MongoDB connection
        if (consoleTable.length > 0) {
            newLog = [...newLog, ...consoleTable]
            consoleTable = [];
            //console.table(newLog)
        }

        mongoClient.close();
        //console.log("Searched This Many Subreddits : ", counter.getRequestCounter())


        return resArr;
    } catch (error) {
        console.error('Error:', error);
    }

}
function logToPrint() {
    console.table(newLog)
    newLog.push({})
    if (newLog.length > 100) {
        newLog = [];
    }
}
function extractRedditPost(post) {
    
    if (post.url.startsWith("https://www.reddit")) {
        //console.log("BRO STARTED WITH REDDIT")
        
        return
    }

    if (post.media !== null) {
        console.log("here")
        if (!post.media.reddit_video) {
            if (post.media.type.includes('redgifs')) {
                let payload = {
                    title: post.title,
                    url: post.url,
                    source: post.permalink,
                    nsfw: true,

                }
                return payload;
            }
        }
        console.log("after rehere")



    }
    if (post.preview) {
        if (post.preview.reddit_video_preview != undefined) {
            let payload = {
                title: post.title,
                url: post.preview.reddit_video_preview.fallback_url,
                source: post.permalink,
                nsfw: true,

            };
            return (payload);
        }
    }
    if (post.is_video) {
        if (post.media != null) {
            let vidUrl = post.media.reddit_video.fallback_url;
            let testUrl = vidUrl.split("?source")
            let myUrl = testUrl.shift()
            if (!myUrl.includes("mp4")) {
                myUrl = myUrl + ".mp4"
            }
            let payload = {
                title: post.title,
                url: myUrl,
                source: post.permalink,
                nsfw: true,

            };
            return (payload);

        }

    }
    let payload = {
        title: post.title,
        url: post.url,
        source: post.permalink,
        nsfw: true,

    };
    return (payload);

}

    module.exports = { redditExtract, logToPrint }