/*
Next.js next build command removes all unused images from /public

This script populates constants.js with a list of all files in /public/img/lineups so no lineups are considered unused

NOTE: Run this script from the root directory (NOT in /utils)
*/
const fs = require('fs');
const path = require('path');

const dirAbsolutePath = path.resolve('public', 'img', 'lineups');
walk(dirAbsolutePath, function(err, absolutePathsList) {
  if (err) throw err;
  const relativePathsList = absolutePathsList.map((absolutePath, idx) => {
    const relativePath = absolutePath.split("public")[1] // need content after /public for imgPath
    return relativePath.replace(/\\/g, "/"); // global /g applies replace all to string
  })
  
  // overwrite constants.js with new image array
  const codeString = "const imageList = [" + "\"" + relativePathsList.join('\",\n\"') + "\"\n]\n\nexport default imageList;"
  try {
    fs.writeFileSync(path.join('utils', 'constants.js'), codeString)
  } catch (err) {
    console.error(err)
  }
});

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
  return results
};
