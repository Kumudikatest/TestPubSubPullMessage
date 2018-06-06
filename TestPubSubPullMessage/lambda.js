let AWS = require('aws-sdk');
let _auth = require('./Authorizer');
let google = require('googleapis').google;
const pubsub = google.pubsub('v1');
exports.handler = function (event, context, callback) {
	pubsub.projects.subscriptions.pull({
		subscription: `projects/${process.env.GCLOUD_PROJECT_ID}/subscriptions/firstNlastN`,
		resource: {
			maxMessages: 10,
			returnImmediately: false,
		}
	})
		.then(response => {
			console.log(response.data);           // successful response
			/*
			response.data = {
				"receivedMessages": [
					{
						"ackId": "<ack-id>",
						"message": {
							"data": "<base64-encoded payload>",
							"attributes": {
								"<key1>": "<val1>",
								"<key2>": "<val2>",
								...
							},
							"messageId": "<message-id>",
							"publishTime": "<yyyy-MM-ddTHH:mm:ss.###Z>"
						}
					},
					...
				]
			}
			*/
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});


	callback(null, 'Successfully executed');
}