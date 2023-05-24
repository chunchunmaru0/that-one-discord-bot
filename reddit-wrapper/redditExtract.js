const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.12:27017';
const dbName = 'introPerVertDB';

async function redditExtract(subreddits, filter, collName) {
    // console.log(subreddits, filter)
    try {
        const mongoClient = await MongoClient.connect(url);
        const db = mongoClient.db(dbName);
        let resArr = [];
        for (const subreddit of subreddits) {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/${filter}.json`)
            const data = await response.json();
            const posts = data.data.children.map(child => child.data); //Post Data from Reddit Response API

            const collection = db.collection(collName); //Collection of documents from the db //this can be passed as an argument for diffrent collection

            for (const post of posts) {
                const existingPost = await collection.findOne({ id: post.id });
                //check if there's already such post in my db
                if (!existingPost) {
                    await collection.insertOne({ id: post.id, permalink: post.permalink, url: post.url });
                    console.log('New post:', post.title, 'Subreddit:',`\x1b[32m ${subreddit}\x1b[0m`);
                    let extractedPayload = (extractRedditPost(post))
                    if (extractedPayload !== undefined) {
                        //Send to Discord
                        //console.log('New post:', post.title, 'Subreddit:', subreddit);
                        resArr.push(extractedPayload)
                    }

                }
            }
        }
        // Close the MongoDB connection

        mongoClient.close();
        return resArr;
    } catch (error) {
        console.error('Error:', error);
    }

}

function extractRedditPost(post) {

    if (post.url.startsWith("https://www.reddit")) {
        //console.log("BRO STARTED WITH REDDIT")
        return
    }

    if (post.media !== null) {
        if (!post.media.reddit_video) {
            if (post.media.type.includes('redgifs')) {
                let payload = {
                    url: post.url,
                    source: post.permalink,
                    nsfw: true,

                };
                return payload;
            }
        }



    }
    if (post.preview) {
        if (post.preview.reddit_video_preview != undefined) {
            let payload = {
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
                url: myUrl,
                source: post.permalink,
                nsfw: true,

            };
            return (payload);
        }
    }

    let payload = {
        url: post.url,
        source: post.permalink,
        nsfw: true,

    };
    return (payload);


}

module.exports = { redditExtract }