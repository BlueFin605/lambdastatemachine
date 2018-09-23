var sm = require('./statemachine/statemachine')
const util = requite('util')

exports.offhook = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.offHook(data, changecallback), callback)
}

exports.dial = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.dial(data, changecallback, event.number), callback)
}

exports.connected = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.connected(data, changecallback), callback)
}

exports.hangup = function (event, context, callback) {
    sm.StateMachine().changeStateAsync((state, data, changecallback) => state.hangUp(data, changecallback), callback)
}

exports.action = function (event, context, callback) {
    console.log(`event:<${event}> context:<${context}> callback:<${callback}>`)

    switch (event.action)
    {
        case 'offhook':
            sm.StateMachine().changeStateAsync((state, data, changecallback) => state.offHook(data, changecallback), callback)
            break;
        case 'dial':
            sm.StateMachine().changeStateAsync((state, data, changecallback) => state.dial(data, changecallback, event.data.number), callback)
            break;
        case 'connected':
            sm.StateMachine().changeStateAsync((state, data, changecallback) => state.connected(data, changecallback), callback)
            break;
        case 'hangup':
            sm.StateMachine().changeStateAsync((state, data, changecallback) => state.hangUp(data, changecallback), callback)
            break;
    }
}

// function onCompleted(err, result, context, callback) {
//     console.log(`onCompleted(${err},${result})`)
//     callback(err,result)
// }

// this.offhook('event offhook', null, (err, result) => console.log(`response from transition<${err}>`))
// this.dial({number: '+6402712345'}, null, (err, result) => console.log(`response from transition<${err}>`))
// this.connected('event connected', null, (err, result) => console.log(`response from transition<${err}>`))
// this.hangup('event hangup', null, (err, result) => console.log(`response from transition<${err}>`))