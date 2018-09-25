var sm = require('./statemachine/statemachine')
var statem = require('object-state-machine')

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
    console.log(`event:<${JSON.stringify(event)}>`)
    processSQSBatch(event.Records, context, callback)
}

async function processSQSBatch(batch, context, callback)
{
    var statemachine = sm.StateMachine()

    for (const record of batch) {
        console.log(`record:<${record.body}>`)
        let action = JSON.parse(record.body)
        console.log(`record:<${action.action}>`)
        switch (action.action) {
            case 'offhook':
                await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.offHook(data, changecallback))
                break;
            case 'dial':
                await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.dial(data, changecallback, action.data.number))
                break;
            case 'connected':
                await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.connected(data, changecallback))
                break;
            case 'hangup':
                await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.hangUp(data, changecallback))
                break;
        }
    }

    callback(null, true)
}

// function onCompleted(err, result, context, callback) {
//     console.log(`onCompleted(${err},${result})`)
//     callback(err,result)
// }

// this.offhook('event offhook', null, (err, result) => console.log(`response from transition<${err}>`))
// this.dial({number: '+6402712345'}, null, (err, result) => console.log(`response from transition<${err}>`))
// this.connected('event connected', null, (err, result) => console.log(`response from transition<${err}>`))
// this.hangup('event hangup', null, (err, result) => console.log(`response from transition<${err}>`))

// batchSample = {
//     Records: [
//         {
//             action: 'hangup'
//         },
//         {
//             action: 'offhook'
//         },
//         {
//             action: 'hangup'
//         },
//     ]
// }

// this.action(batchSample, null, (err, result) => console.log(`response from transition<${err}>`))
