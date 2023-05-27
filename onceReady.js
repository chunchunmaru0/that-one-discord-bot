const { sendAi } = require('./AutoSend/sendAi.js')
const { sendCos } = require('./AutoSend/sendCosplay.js')
const { sendH } = require('./AutoSend/sendHentai.js')
const { sendEcchi } = require('./AutoSend/sendEcchi.js')
const { sendMemes } = require('./AutoSend/sendMemes.js')
const { sendThigh } = require('./AutoSend/sendThigh.js')
const { sendTiktok } = require('./AutoSend/sendTiktok.js')
const { sendSFWTiktok } = require('./AutoSend/sendSFWTiktok.js')
const { sendP } = require('./AutoSend/sendPorn.js')
const { sendAsian } = require('./AutoSend/sendAsian.js')
const { sendBabes } = require('./AutoSend/sendBabes.js')
const { sendCompilation } = require('./AutoSend/sendCompilation.js')
const { sendCumshot } = require('./AutoSend/sendCumshot.js')
const { sendFacials } = require('./AutoSend/sendFacials.js')
const { sendHardcore } = require('./AutoSend/sendHardcore.js')
const { sendNSFW } = require('./AutoSend/sendNSFW.js')
const { sendonlyFans } = require('./AutoSend/sendOnlyfans.js')
const { sendonlyFans2 } = require('./AutoSend/sendOnlyfans2.js')
const { sendPussy } = require('./AutoSend/sendPussy.js')
const counter = require('./utils/Counter.js')
const {logToPrint} = require('./reddit-wrapper/redditExtract.js')

module.exports = {
    async onceReady(client) {
        console.log('\n\n____________________________________________________________')
        console.log('------------- \x1b[46mSearching for New Posts\x1b[0m -----------------------')
        console.log('************************************************************\n\n')
        try {
            await Promise.all([
                sendHardcore(client),
                sendTiktok(client),
                sendSFWTiktok(client),
                sendCos(client),
                sendP(client),
                sendH(client),
                sendEcchi(client),
                sendAi(client),
                sendThigh(client),
                sendMemes(client),
                sendAsian(client),
                sendBabes(client),
                sendCompilation(client),
                sendCumshot(client),
                sendFacials(client),
                sendNSFW(client),
                sendonlyFans(client),
                sendonlyFans2(client),
                sendPussy(client)
            ]);
            console.log("\n------------------ \x1b[1m DETAILED LOG TABLE \x1b[0m------------------------\n");
            logToPrint()
            console.log("\n------------------ Uploaded",(counter.getRequestCounter()),"\x1b[1m🫦  New post:👙 \x1b[0m------------------------\n");
        } catch (error) {
            console.error("Error occurred during onceReady():", error);
        }


        setInterval(async () => {
            counter.resetCounter();
            console.log('\n\n____________________________________________________________')
            console.log('------------- \x1b[46mResearching for Subreddits\x1b[0m -------------------')
            console.log('************************************************************\n\n')

            try {
                await Promise.all([
                    sendHardcore(client),
                    sendSFWTiktok(client),
                    sendTiktok(client),
                    sendP(client),

                    sendH(client),
                    sendCos(client),
                    sendMemes(client),
                    sendEcchi(client),
                    sendAi(client),
                    sendThigh(client),

                    sendAsian(client),
                    sendBabes(client),
                    sendCompilation(client),
                    sendCumshot(client),
                    sendFacials(client),
                    sendNSFW(client),
                    sendonlyFans(client),
                    sendonlyFans2(client),
                    sendPussy(client)
                ])
                console.log("\n------------------ \x1b[1m DETAILED LOG TABLE \x1b[0m------------------------\n");
                logToPrint()
                console.log("\n------------------ Uploaded",(counter.getRequestCounter()),"\x1b[1m 🫦  New post:👙 \x1b[0m------------------------\n");
            } catch (error) {

            }
        }, 420000);



    }
}
