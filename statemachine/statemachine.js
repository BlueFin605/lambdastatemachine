var sm = require('object-state-machine/')
var s3 = require('./s3persistance')
var onhook = require('./states/stateonhook.js')
var dialtone = require('./states/statedialtone')
var offering = require('./states/stateoffering')
var ringback = require('./states/stateringback')
var connected = require('./states/stateconnected')

const StateMachine = (function () {
  var states = new sm.DefaultFactory.Builder()
    .addState('onhook', (statemachine) => new onhook.OnHook(statemachine))
    .addState('dialtone', (statemachine) => new dialtone.DialTone(statemachine))
    .addState('offering', (statemachine) => new offering.Offering(statemachine))
    .addState('ringback', (statemachine) => new ringback.RingBack(statemachine))
    .addState('connected', (statemachine) => new connected.Connected(statemachine))
    .build()

  var statemachine = new sm.StateMachineAsync.Builder('lambda state machine', states, (creator, callback) => s3.createStateFromS3(creator, callback))
    .withPersistance((state, data, callback) => {
      s3.persistStateToS3(state, data, callback)
    })
    .build()

  return statemachine
}())

module.exports.StateMachine = StateMachine
