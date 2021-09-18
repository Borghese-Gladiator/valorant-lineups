import fs from 'fs'
import path from 'path'

export default (req, res) => {
  console.log("BLAH")

  const dirRelativeToPublicFolder = 'img'
  console.log(dirRelativeToPublicFolder)
  
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  console.log(dir)

  const filenames = fs.readdirSync(dir);
  console.log(filenames)
  
  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))
  console.log(images);

  res.statusCode = 200
  res.json(images);
}

/**
 * Finds list of image paths given filter parameters agent, map, attackDefense
 * 
 * @param request
 * @param response
 * @returns {array} list of paths

export default (req, res) => {
  console.log("START")
  const { agent, map, attackDefense } = req.query;
  console.log(agent, map, attackDefense)
  const dirFilterRelativePath = path.join('img', 'lineups', agent, map, attackDefense);
  console.log(dirFilterRelativePath);
  
  const logoPath = fs.readdirSync(path.resolve('./public', 'img'));
  console.log("TEST", logoPath);

  const dirAbsolutePath = path.resolve('./public', dirFilterRelativePath);
  console.log(dirAbsolutePath);
  const filenames = fs.readdirSync(dirAbsolutePath);
  console.log(filenames);
  const images = filenames.map(name => path.join("/", dirFilterRelativePath, name))
  console.log(images);

  res.statusCode = 200;
  res.json(images);
}
 */