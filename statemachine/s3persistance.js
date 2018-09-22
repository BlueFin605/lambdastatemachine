const AWS = require('aws-sdk')

// configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_LAMBDA_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_LAMBDA_SECRET_ACCESS_KEY
})

module.exports = {
  createStateFromS3: function(creator, callback) {
    console.log(`createStateFromS3`)

    var s3 = new AWS.S3()

    // configuring parameters
    var params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'lambda state machine'
    }

    s3.getObject(params, function (err, data) {
      if (err) {
        console.log('Error', err)
        return callback(err, null)
      }

      // success
      if (data) {
        console.log('data retrieved:', data.Body)
        let objectData = data.Body.toString('utf-8')
        var body = JSON.parse(objectData)
        var nextState = creator.createNextState(body.state, body.data)
        return callback(null, nextState)
      }

      // there is no data in the storage
      return callback(null, creator.createNextState('onhook', null))
    })
  },
  persistStateToS3: function(state, data, callback) {
    console.log(`persistStateToS3 ${state}:${data}`)

    var s3 = new AWS.S3()

    var body = {
      state: state,
      data: data
    }

    // configuring parameters
    var params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Body: JSON.stringify(body),
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
        console.log('Uploaded in:', data.Location)
        callback(null, true)
        return
      }

      console.log(`persistStateToS3 failed to persist ${state}:${data}`)
      var errMsg = 'no data written'
      callback(errMsg, false)
    })
  }
}