var sm = require('./statemachine/statemachine')

exports.offhook = function (event, context, callback) {
    sm.StateMachine.changeStateAsync((state, data, callback) => state.offHook(event, callback), (err, result) => console.log(`response from transition<${err}>`))
}

exports.dial = function (event, context, callback) {
    sm.StateMachine.changeStateAsync((state, data, callback) => state.dial(event, callback), (err, result) => console.log(`response from transition<${err}>`))
}

exports.connected = function (event, context, callback) {
    sm.StateMachine.changeStateAsync((state, data, callback) => state.connected(event, callback), (err, result) => console.log(`response from transition<${err}>`))
}

exports.hangup = function (event, context, callback) {
    sm.StateMachine.changeStateAsync((state, data, callback) => state.hangUp(event, callback), (err, result) => console.log(`response from transition<${err}>`))
}

// this.offhook('event offhook', null, null)
// this.dial('event dial', null, null)
// this.connected('event connected', null, null)
// this.hangup('event hangup', null, null)