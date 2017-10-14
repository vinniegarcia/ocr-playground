const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});

const resize = ({ inputPath, outputPath }) => {
    // resize and remove EXIF profile data
    gm(inputPath)
        .resize(240, 240)
        .noProfile()
        .write(outputPath, function (err) {
            if (!err) console.log('done');
        });
}

