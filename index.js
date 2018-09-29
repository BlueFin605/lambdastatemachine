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
  try {
    console.log(`event:<${JSON.stringify(event)}>`)
    var statemachine = sm.StateMachine()

    for (const record of event.Records) {
      processRecord(statemachine, record)
    }
  } catch (err) {
    console.log('Caught Error:', err.message)
  }

  callback(null, true)
}

function processRecord (statemachine, record) {
  if (record.kinesis != null) {
    processKinesisRecord(statemachine, record)
  } else
  if (record.body != null) {
    processSQSRecord(statemachine, record)
  } else {
    console.log('unknown payload type')
  }
}

function processKinesisRecord (statemachine, record) {
  // Kinesis data is base64 encoded so decode here
  var payload = new Buffer.Alloc(record.kinesis.data, 'base64').toString('ascii')
  console.log('Kinesis: Decoded payload:', payload)
  let action = JSON.parse(payload)
  console.log(`Kinesis: record:<${action.action}>`)
  processAction(statemachine, action)
}

function processSQSRecord (statemachine, record) {
  console.log(`SQS: record:<${record.body}>`)
  let action = JSON.parse(record.body)
  console.log(`SQS: record:<${action.action}>`)
  processAction(statemachine, action)
}

async function processAction (statemachine, action) {
  switch (action.action) {
    case 'offhook':
      await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.offHook(data, changecallback))
      break
    case 'dial':
      await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.dial(data, changecallback, action.data.number))
      break
    case 'connected':
      await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.connected(data, changecallback))
      break
    case 'hangup':
      await statem.Promises.StateChangePromise(statemachine, (state, data, changecallback) => state.hangUp(data, changecallback))
      break
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
