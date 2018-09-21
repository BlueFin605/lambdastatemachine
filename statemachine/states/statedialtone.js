// My module
function DialTone (statemachine) {
  this.statemachine = statemachine
  this.name = 'dialTone'
}

DialTone.prototype.offHook = function offHook (data, callback) {
  console.log(`sm event:offhook current state:${this.name}`)
  callback(null, null)
}

DialTone.prototype.hangUp = function hangUp (data, callback) {
  console.log(`sm event:hangup current state:${this.name}`)
  callback(null, this.statemachine.createNextState('onhook', data))
}

DialTone.prototype.dial = function dial (data, callback, number) {
  console.log(`sm event:dial current state:${this.name}`)
  callback(null, this.statemachine.createNextState('ringback', { number: number }))
}

module.exports.DialTone = DialTone
