const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Array to store URLs to monitor
const urlsToMonitor = [
    'https://cool-vknc.onrender.com/status',
];

// Function to check the status of a URL
const checkUrlStatus = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(`URL: ${url} is up. Status code: ${response.status}`);
    } catch (error) {
        if (error.response) {
            console.log(`URL: ${url} is down. Status code: ${error.response.status}`);
        } else {
            console.log(`URL: ${url} is down. Error: ${error.message}`);
        }
    }
};

// Schedule the URL checks to run every minute
cron.schedule('* * * * *', () => {
    console.log('Checking URLs...');
    urlsToMonitor.forEach(url => checkUrlStatus(url));
});

// Endpoint to get the status of all monitored URLs
app.get('/status', (req, res) => {
    res.send('URL monitoring service is running.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
