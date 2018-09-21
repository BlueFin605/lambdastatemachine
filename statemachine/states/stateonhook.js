// My module
function OnHook (statemachine) {
  this.name = 'onHook'
  this.statemachine = statemachine
}

OnHook.prototype.offHook = function offHook (data, callback) {
  console.log(`sm event:offhook current state:${this.name}`)
  callback(null, this.statemachine.createNextState('dialtone', data))
}

OnHook.prototype.dial = function dial (data, callback, number) {
  console.log(`sm event:dial current state:${this.name}`)
  callcack(this.statemachine.createNextState('ringback', { number: number }))
}

module.exports.OnHook = OnHook
