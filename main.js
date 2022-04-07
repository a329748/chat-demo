const amqp = require('amqplib/callback_api');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const chatrooms = ['Public'];
var current_queue = 'Public';

async function chatBegin() {
	console.log("\nWelcome to AMQP chatrooms");
	console.log("\nCommands")
	console.log("/rooms\t\t\tDisplays existing chatrooms.");
	console.log("/create <name>\t\tCreate a new chatroom.")
	console.log("/send <name>\t\tSend messages to an existing chatroom.");
	console.log("/read <name>\t\tRead a chatroom's messages.");
	console.log("/disconnect\t\tDisconnect from a chatroom.");
	console.log("/exit\t\t\tExit chat.\n");

	recursiveRL();
}

var recursiveRL = function () {
	rl.question('> ', function (answer) {
		if (answer == '/exit') {
			return rl.close();
		}

		handleMessage(answer);

		recursiveRL();
	});
};

function handleMessage(input) {
	if(input === '/rooms') {
		console.log("\nAvailable chatrooms:\n");
		console.log(chatrooms);
		console.log();
	} else if(input.split(' ')[0] === '/create') {
		chatrooms.push(input.split(' ')[1]);
		console.log("\nRoom '" + input.split(' ')[1] + "' has been created.\n");
	} else if(input.split(' ')[0] === '/send') {
		current_queue = input.split(' ')[1];
		if(chatrooms.includes(current_queue)) {
			console.log("\nSending messages to '" + current_queue + "'...\n")
			current_queue = input.split(' ')[1];
		}		
	} else if(input.split(' ')[0] === '/read') {
		current_queue = input.split(' ')[1];
		if(chatrooms.includes(current_queue)) {
			enterChatroom(current_queue);
		} else {
			console.log("\nChatroom '" + current_queue + "' does not exist.\n");
		}
	} else if(input === '/disconnect') {
		console.log("\nDisconnected from '" + current_queue + "'.\n")
		current_queue = null;
	} else {
		sendMessage(input);
	}
}

function enterChatroom(queue) {
	amqp.connect("amqp://jay:1234@127.0.0.1:49158", (err, con) => {
		if(err) {
			throw err;
		}

		con.createChannel((err1, channel) => {
			if(err1) {
				throw err1;
			}

			channel.assertQueue(queue, {
				durable: false
			});

			console.log("\nReceiving messages from '" + current_queue + "'...\n")
			channel.consume(queue, (message) => {
				console.log("-> " + message.content.toString());
			}, { noAck: true });

		});

	});	
}

function sendMessage(message) {
	amqp.connect("amqp://jay:1234@127.0.0.1:49158", (err, con) => {
		if(err) {
			throw  err;
		}

		con.createChannel((err1, channel) => {
			if(err1) {
				throw err1;
			}

			channel.assertQueue(current_queue, {
				durable: false
			});

			channel.sendToQueue(current_queue, Buffer.from(message));
		});

		setTimeout(() => {
			con.close();
		}, 500);

	});
}

chatBegin();