const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// Define a dynamic route for getting metadata
app.get('/get_meta_data/:category/:name', (req, res) => {
    // extract values from the req.params using destructor
    const { category, name } = req.params;

    // represent the directory structure where location of  JSON files 
    const filePath = path.join(__dirname, 'src', 'ui-config', 'specification', category, `${name}.json`);

    // Read the content of the specified JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        // error handling
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            try {
                // Parse JSON content and send it as the response
                const metaData = JSON.parse(data);
                res.json(metaData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                res.status(500).send('Internal Server Error');
            }
        }
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


//git link 
https://github.com/Javid22/goodworklabs-assessment.git