const { spawn } = require('child_process');

// Number of client instances to spawn
const numClients = 1000;

// Duration of the load test in seconds
const testDurationSeconds = 60;

// Track total messages received by each client
const messageCounts = {};

// Track start time for each client
const startTime = {};

// Function to generate a random number within a specified range
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to run the client script with random arguments
const runClient = () => {
    const userID = getRandomNumber(1, 1000);
    // const companyID = 1;
    const companyID = getRandomNumber(1, 50);

    // Spawn a child process to run the client script
    const clientProcess = spawn('node', ['client.js', userID, companyID]);

    clientProcess.on('close', (code) => {
        console.log(`Client (${userID}-${companyID}) exited with code ${code}`);
    });
};

// Function to start load test by spawning multiple client instances
const startLoadTest = () => {
    console.log(`Starting load test - ${numClients} client instances for ${testDurationSeconds} seconds`);

    // Start the load test
    for (let i = 0; i < numClients; i++) {
        setTimeout(runClient, i * 60); // Delay spawning clients to avoid overwhelming the server
    }

    // Stop the load test after the specified duration
    setTimeout(stopLoadTest, testDurationSeconds * 1000);
};

// Function to stop the load test and generate log
const stopLoadTest = () => {
    console.log(`Load test completed - generating log`);

};

// Start the load test
startLoadTest();
