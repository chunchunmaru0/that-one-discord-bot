const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
//https://api.redgifs.com/v2/gifs/<gifID>

async function downloadRedgifsHD(url, dest) {
    //wait for stream to finish then return destReal
    let accessRes = await fetch(`https://api.redgifs.com/v2/auth/temporary`);
    let accessData = await accessRes.json()
    const accessToken = accessData.token
    const addr = accessData.addr
    const agent = accessData.agent

    const params = new URLSearchParams({
        'user-addr': addr,
        'user-agent': agent,
    });
    //console.log(accessData)
    return new Promise(async (resolve, reject) => {

        //format dest
        dest = path.join(dest);
        //check if dest exists
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        //get last part of url
        let fileName = url.split('/').pop();
        let newfileName = fileName.replace(/[^\w]/g, '')
        let destReal = `${dest}/${newfileName}.mp4`
        try {
            let APIurl = `https://api.redgifs.com/v2/gifs/${fileName}`
            let response = await fetch(APIurl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            });

            if (response.status !== 200) {
                reject({ err: response.status })

            }

            let data = await response.json();
            if (data.error) {
                reject('Err')
            } else {
                let gif = data.gif.urls.hd;
                let gif2 = data.gif.urls.sd;

                let stream = fs.createWriteStream(destReal);
                try {
                    await fetch(gif).then(res => res.body.pipe(stream));
                    stream.on('finish', () => {
                        // console.log("\x1b[35m", url, '\x1b[0m', 'was downloaded \x1b[32m sucessfully!\x1b[0m');
                        resolve(destReal);
                    })
                    stream.on('error', (err) => {
                        delVid(destReal)
                        reject(err);
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }

    })
}
async function downloadRedgifsSD(url, dest) {
    //wait for stream to finish then return destReal
    let accessRes = await fetch(`https://api.redgifs.com/v2/auth/temporary`);
    let accessData = await accessRes.json()
    const accessToken = accessData.token
    const addr = accessData.addr
    const agent = accessData.agent

    const params = new URLSearchParams({
        'user-addr': addr,
        'user-agent': agent,
    });
    //console.log(accessData)
    return new Promise(async (resolve, reject) => {

        //format dest
        dest = path.join(dest);
        //check if dest exists
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        //get last part of url
        let fileName = url.split('/').pop();
        let newfileName = fileName.replace(/[^\w]/g, '')
        let destReal = `${dest}/${newfileName}_sd.mp4`
        //const specialCharRegex = /[^A-Za-z0-9_.]/g;
        try {
            let APIurl = `https://api.redgifs.com/v2/gifs/${fileName}`
            let response = await fetch(APIurl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            });

            if (response.status !== 200) {
                reject({ err: response.status })

            }

            let data = await response.json();

            if (data.error) {
                reject('Err')
            } else {
                let gif = data.gif.urls.sd;
                let stream = fs.createWriteStream(destReal);
                try {
                    await fetch(gif).then(res => res.body.pipe(stream));
                    stream.on('finish', () => {
                        // console.log("\x1b[35m", url, '\x1b[0m', 'was downloaded \x1b[32m sucessfully!\x1b[0m');
                        resolve(destReal);
                    })
                    stream.on('error', (err) => {
                        delVid(destReal)
                        reject(err);
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }

    })
}
function delVid(path) {
    fs.unlink(path, (err) => {
        if (err) { console.error(err) };
        //console.log("\x1b[2m", path, '\x1b[31m DELETED!! \x1b[0m');
    })
}

module.exports = {
    downloadRedgifsHD,
    delVid,
    downloadRedgifsSD
}

// async function test() {
//     console.log(await downloadRedgifs('https://api.redgifs.com/v2/gifs/honorablekeenarmedcrab', './vid'))
// }
// test()