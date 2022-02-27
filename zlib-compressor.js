const archiver = require('archiver');

const fs = require('fs');
const path = require('path');

// --------- This code is just to display file sizes before archiving
const filePath1 = path.join(__dirname, 'copy.txt');
const filePath2 = path.join(__dirname, 'logo.jpg');
let prevBytes = 0;

// Read file stats
fs.stat(filePath1, (err, stats) => {
    if (err) {
      console.log(`File doesn't exist.`);
    } else {
      prevBytes = prevBytes + stats.size;
    }
});

// Read file stats
fs.stat(filePath2, (err, stats) => {
    if (err) {
      console.log(`File doesn't exist.`);
    } else {
      prevBytes = prevBytes + stats.size;
      
      console.log(`\nTotal bytes before archiving: ${prevBytes}`);
    }
});

// --------------------------------------------------------------

const ZLIB_BEST_COMPRESSION = 9;
// create a file to stream archive data to.
const zipPath = path.join(__dirname, 'files.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: ZLIB_BEST_COMPRESSION }
});

// listen for all archive data to be written
output.on('close', () => {
  console.log(`\nTotal bytes: ${archive.pointer()}`);
  console.log('archiving has now finished.\n');
});

// good practice to catch this error explicitly
archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// add files (read the copy.txt and logo.jpg and output with different names)
const textPath = path.join(__dirname, 'copy.txt');
const logoPath = path.join(__dirname, 'logo.jpg');
archive.append(fs.createReadStream(textPath), { name: 'content.txt' });
archive.append(fs.createReadStream(logoPath), { name: 'nobot.jpg' });

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();