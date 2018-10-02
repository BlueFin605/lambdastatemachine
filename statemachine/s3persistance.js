const AWS = require('aws-sdk')

// var s3access = process.env.AWS_LAMBDA_ACCESS_KEY_ID
// var s3secret = process.env.AWS_LAMBDA_SECRET_ACCESS_KEY
var s3bucket = process.env.S3_BUCKET_NAME

// configuring the AWS environment
// AWS.config.update({
//   accessKeyId: s3access,
//   secretAccessKey: s3secret
// })

module.exports = {
  createStateFromS3: function (creator, callback) {
    var s3 = new AWS.S3()

    // configuring parameters
    var params = {
      Bucket: s3bucket,
      Key: 'lambda state machine'
    }

    s3.getObject(params, function (err, data) {
      if (err) {
        console.log('createStateFromS3: Error', err)
        return callback(err, null)
      }

      // success
      if (data) {
        let objectData = data.Body.toString('utf-8')
        var body = JSON.parse(objectData)
        console.log('createStateFromS3: state retrieved:', body.state)
        var nextState = creator.createNextState(body.state, body.data)
        return callback(null, nextState)
      }

      // there is no data in the storage
      console.log('createStateFromS3: no data, use default instead')
      return callback(null, creator.createNextState('onhook', null))
    })
  },
  persistStateToS3: function (state, data, callback) {
    var s3 = new AWS.S3()

    var body = {
      state: state,
      data: data
    }

    var bodySrfy = JSON.stringify(body)
    console.log(`persistStateToS3 ${state}:${bodySrfy}`)

    // configuring parameters
    var params = {
      Bucket: s3bucket,
      Body: bodySrfy,
      Key: 'lambda state machine'
    }

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('Error', err)
        callback(err, false)
        return
      }

      // success
      if (data) {
        callback(null, true)
        return
      }

      console.log(`persistStateToS3 failed to persist ${state}:${data}`)
      var errMsg = 'no data written'
      callback(errMsg, false)
    })
  }
}
