var sm = require('./statemachine/statemachine')

exports.offhook = function (event, context, callback) {
    sm.StateMachine.debugDump();
    sm.StateMachine.changeStateAsync((state, data, changecallback) => state.offHook(event, changecallback), callback)
}

exports.dial = function (event, context, callback) {
    sm.StateMachine.debugDump();
    sm.StateMachine.changeStateAsync((state, data, changecallback) => state.dial(event, changecallback), callback)
}

exports.connected = function (event, context, callback) {
    sm.StateMachine.debugDump();
    sm.StateMachine.changeStateAsync((state, data, changecallback) => state.connected(event, changecallback), callback)
}

exports.hangup = function (event, context, callback) {
    sm.StateMachine.debugDump();
    sm.StateMachine.changeStateAsync((state, data, changecallback) => state.hangUp(event, changecallback), callback)
}

// this.offhook('event offhook', null, (err, result) => console.log(`response from transition<${err}>`))
// this.dial('event dial', null, (err, result) => console.log(`response from transition<${err}>`))
// this.connected('event connected', null, (err, result) => console.log(`response from transition<${err}>`))
// this.hangup('event hangup', null, (err, result) => console.log(`response from transition<${err}>`))