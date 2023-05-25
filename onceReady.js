const { sendAi } = require('./AutoSend/sendAi.js')
const { sendCos } = require('./AutoSend/sendCosplay.js')
const { sendH } = require('./AutoSend/sendHentai.js')
const { sendEcchi } = require('./AutoSend/sendEcchi.js')
const { sendMemes } = require('./AutoSend/sendMemes.js')
const { sendThigh } = require('./AutoSend/sendThigh.js')

module.exports = {
    onceReady(client) {
       
        sendMemes(client)
        sendCos(client)
        sendH(client)
        sendEcchi(client)
        sendAi(client)
        sendThigh(client)


        setInterval(() => {
            sendH(client)
            sendCos(client)
            sendMemes(client)
            sendEcchi(client)
            sendAi(client)
            sendThigh(client)
        }, 600000);

    }
}
