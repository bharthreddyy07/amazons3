// Initialize AWS S3
AWS.config.update({
    accessKeyId: 'AKIAW3MEBQHGS7R37P7E',
    secretAccessKey: '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',
    region: 'us-east-1'
});

const s3 = new AWS.S3();

document.getElementById('application-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = JSON.stringify(Object.fromEntries(formData.entries()));
    const params = {
        Bucket: 'formdatacc',
        Key: `application-data-${Date.now()}.json`, // Save data as a JSON file
        Body: data,
        ContentType: 'application/json'
    };

    s3.putObject(params, function (err, data) {
        if (err) {
            document.getElementById('form-error').innerText = 'Error uploading data. Please try again.';
            console.log(err, err.stack);
        } else {
            document.getElementById('form-message').innerText = 'Application submitted successfully!';
            document.getElementById('application-form').reset();
            console.log('Data uploaded successfully:', data);
        }
    });
});
