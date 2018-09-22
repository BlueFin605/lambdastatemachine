var sm = require('./statemachine/statemachine')

exports.offhook = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.offHook(event, changecallback), (err, result) => onCompleted(err, result, context, callback))
}

exports.dial = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.dial(event, changecallback), (err, result) => onCompleted(err, result, context, callback))
}

exports.connected = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.connected(event, changecallback), (err, result) => onCompleted(err, result, context, callback))
}

exports.hangup = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.hangUp(event, changecallback), (err, result) => onCompleted(err, result, context, callback))
}

function onCompleted(err, result, context, callback) {
    console.log(`onCompleted(${err},${result})`)
    callback(err,result)
}
// this.offhook('event offhook', null, (err, result) => console.log(`response from transition<${err}>`))
// this.dial('event dial', null, (err, result) => console.log(`response from transition<${err}>`))
// this.connected('event connected', null, (err, result) => console.log(`response from transition<${err}>`))
// this.hangup('event hangup', null, (err, result) => console.log(`response from transition<${err}>`))