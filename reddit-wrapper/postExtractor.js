
function extractRedditPost(post, tries) {
    if (tries >= 10) return console.log({ reason: "retry limit exceeded", message: "Failed to find a suitable post" });

    tries++;
    // let rng = Math.floor(Math.random() * body.length)
    // let post = body[rng].data;
    // console.log("RNG is:", rng)

    //is_video
    if (post.url.startsWith("https://www.reddit")) {
        //console.log("BRO STARTED WITH REDDIT")
        return

    }

    if(post.media !== null){
        if(post.media.type.includes('redgifs')){
            let payload = {
                url: post.url,
                source: post.permalink,
                nsfw: true,
                tries: tries,
            };
            return payload;
        }


    }
    if (post.preview) {
        if (post.preview.reddit_video_preview != undefined) {
            let payload = {
                url: post.preview.reddit_video_preview.fallback_url,
                source: post.permalink,
                nsfw: true,
                tries: tries,
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
                tries: tries,
            };
            return (payload);
        }
    }

    let payload = {
        url: post.url,
        source: post.permalink,
        nsfw: true,
        tries: tries,
    };
    return (payload);


}

module.exports = { extractRedditPost };