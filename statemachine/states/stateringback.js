// My module
function RingBack (statemachine) {
  this.name = 'ringBack'
  this.statemachine = statemachine
}

RingBack.prototype.hangUp = function hangUp (data, callback) {
  console.log(`sm event:hangup current state:${this.name}`)
  callback(null, this.statemachine.createNextState('onhook', data))
}

RingBack.prototype.connected = function connected (data, callback) {
  console.log(`sm event:connected current state:${this.name}`)
  callback(null,this.statemachine.createNextState('connected', data))
}

module.exports.RingBack = RingBack
