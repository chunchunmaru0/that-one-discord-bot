const MongoClient = require('mongodb').MongoClient;
const { extractRedditPost } = require('./reddit-wrapper/postExtractor.js')
// Connection URL and database name
const url = 'mongodb://192.168.1.12:27017';
const dbName = 'introPerVertDB';

module.exports = {

  async sendH(discordClient) {
    console.log("Working as Intended")
    const channel_id = '586776239650635777'
    let subreddits = ['pornhwa', 'hentai', 'HENTAI_GIF']

    try {
      // Connect to the MongoDB server
      const mongoClient = await MongoClient.connect(url);
      const db = mongoClient.db(dbName);

      for (const subreddit of subreddits) {
        // Fetch the latest posts from the subreddit
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/new.json`);
        const data = await response.json();
        const posts = data.data.children.map(child => child.data);

        // Check if each post already exists in the database
        const collection = db.collection('hentaiReddit');
        for (const post of posts) {
          const existingPost = await collection.findOne({ id: post.id });

          if (!existingPost) {
            // If the post does not exist, insert it into the database
            await collection.insertOne({ id: post.id, permalink: post.permalink, url: post.url });

            // Log the new post
            let extractedPayload = (extractRedditPost(post))
            if (extractedPayload !== undefined) {
              console.log('New post:', post.title);
              const channel = await discordClient.channels.fetch(channel_id);
              await channel.send(extractedPayload.url);
            }



            // Send the new post to Discord

          }
        }
      }

      // Close the MongoDB connection
      mongoClient.close();
    } catch (error) {
      console.error('Error:', error);
    }

  }
}