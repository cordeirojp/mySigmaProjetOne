let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {
    debugger;

    let receiver = event['receiver'];
    let sender = event['sender'];
    let message = event['message'];
    // console.log("Sending message", message, "to receiver", receiver);

    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Transactional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': sender
            }
        },
        PhoneNumber: receiver
    }).promise()
        .then(data => {
            console.log("message", message, "sent to receiver", receiver);
            callback(null, data);
        })
        .catch(err => {
            console.log("Sending failed", err,"message", message, "to receiver", receiver );
            callback(err);
        });

    callback(null, { "message": "Successfully executed" });
}