// FIRST ATTEMPT getStaticProps pathsObject
export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const getDirectories = source => {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  }

  const pathsObject = {}
  const lineupsDir = path.join(process.cwd(), 'public', 'img', 'lineups')
  const agentDirList = getDirectories(lineupsDir)
  for (const agentDir of agentDirList) {
    pathsObject[agentDir] = {}
    const mapDirList = getDirectories(path.join(lineupsDir, agentDir))
    for (const mapDir of mapDirList) {
      pathsObject[agentDir][mapDir] = {}
      const attackDefendDirList = getDirectories(path.join(lineupsDir, agentDir, mapDir))
      for (const attackDefendDir of attackDefendDirList) {
        const imgList = fs.readdirSync(path.join(lineupsDir, agentDir, mapDir, attackDefendDir)).map((filename, idx) => {
          return path.join('img', 'lineups', agentDir, mapDir, attackDefendDir, filename)
        });
        pathsObject[agentDir][mapDir][attackDefendDir] = imgList
      }
    }
  }
  console.log("CORRECT")
  console.log(pathsObject)

  return {
    props: {
      pathsObject,
    },
  }
}

/*
// API CALL
const url = "/api/pathfinder";
fetch(`${url}?map=${map}&agent=${agent}&attackDefense=${attackDefense}`)
  .then(response => response.json())
  .then(data => {
    setImgList(data);
  });
import fs from 'fs'
import path from 'path'

// API ENDPOINT
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