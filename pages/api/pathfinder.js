import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const { agent, map, attackDefense } = req.body;
  console.log([agent, map, attackDefense]);

  const dirRelativeToPublicFolder = path.join('img', agent, map, attackDefense);
  console.log(dirRelativeToPublicFolder);

  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  console.log(dir);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  res.statusCode = 200
  res.json(images);
}

/*
// pathfinder enables me to find all the images in a directory 
import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

/**
 * Finds list of image paths given filter parameters agent, map, attackDefense
 * 
 * @param request
 * @param response
 * @returns {array} list of paths
 
export default function handler(req, res) {
  const { agent, map, attackDefense } = req.body;
  console.log(req.body);
  const absoluteDirPath = serverPath(path.join("public", "img", "lineups", agent, map, attackDefense));
  console.log(absoluteDirPath);
  const pathsList = fs.readdirSync(absoluteDirPath);
  const clientPathsList = pathsList.map((val, idx) => {
    console.log(val);
    return val;
  })
  res.status(200).json({ pathsList: clientPathsList })
}
*/

/*
const a = {
  "viper": {
    "ascent": {
      "attack": [],
      "defense": []
    }
  }
}
*/