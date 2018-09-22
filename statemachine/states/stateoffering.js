// My module
function Offering (statemachine) {
  this.name = 'offering'
  this.statemachine = statemachine
}

Offering.prototype.hangUp = function hangUp (data, callback) {
  console.log(`sm event:hangup current state:${this.name}`)
  callback(null, this.statemachine.createNextState('onhook', null))
}

module.exports.offering = Offering
