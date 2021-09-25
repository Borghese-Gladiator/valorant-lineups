// Used once to batch rename filenames
const path = require("path");
const fs = require('fs');
const log = console.log;
const parentFolder = 'C:\\Users\\Timot\\Documents\\GitHub\\valorant-lineups\\public\\img\\lineups\\viper';

fs.readdirSync(parentFolder).forEach(directory => {
  fs.readdirSync(path.join(parentFolder, directory)).forEach(blah => {
    fs.readdirSync(path.join(parentFolder, directory, blah)).forEach(file => {

      const extname = path.extname(file);
      const filename = path.basename(file, extname);


      log("File : ", file);
      log("filename : ", filename);
      log("extname : ", extname);

      if (filename.includes("start")) {
        const result = filename.replace(/start/g, 'begin');
        log(result)

		  const myAbsolutePath1 = path.join(parentFolder, directory, blah, file)
		  const myAbsolutePath2 = path.join(parentFolder, directory, blah, result)
		  fs.renameSync(myAbsolutePath1, myAbsolutePath2 + ".png");
	  }

    });
  })
});