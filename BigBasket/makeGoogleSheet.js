const { google } = require('googleapis');
const fs = require('fs');

// Load credentials from the JSON file
const credentials = JSON.parse(fs.readFileSync('./path/to/your/credentials.json'));

// Set up authentication
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Create a new instance of the Sheets API
const sheets = google.sheets({ version: 'v4', auth });

// Read the JSON or text data from file
const data = fs.readFileSync('surajpur.json', 'utf8'); // Change the file path accordingly

// Define the sheet data
const sheetData = [
    {
        range: 'Sheet1', // Change the sheet name if needed
        values: JSON.parse(data), // Parse JSON or use data as is for text file
    },
];

// Create the Google Sheet
async function createGoogleSheet() {
    const response = await sheets.spreadsheets.create({
        resource: {
            properties: {
                title: 'My Data Sheet', // Set the desired title for your sheet
            },
            sheets: sheetData,
        },
    });

    console.log('Google Sheet created:', response.data.spreadsheetUrl);
}

// Invoke the createGoogleSheet function
createGoogleSheet();
