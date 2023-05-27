let requestCounter = 0;

function incrementCounter() {
  requestCounter++;
}

function getRequestCounter() {
  return requestCounter;
}
function resetCounter() {
    requestCounter=0;
  }
module.exports = {
  incrementCounter,
  getRequestCounter,
  resetCounter
};