#!/usr/bin/env node

'use strict';

const fetch = require('node-fetch');
const fs = require('fs-promise');

const hymn = process.argv[2];
const filename = process.argv[3];

const defaultFilename = (d = new Date()) => `Hukamnama ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.txt`;
const randomHymn = 1 + parseInt(Math.random()*3620);

const getHukamnama = (hymn = randomHymn) => {
  console.log(`Fetching hymn ${hymn}`);
  return fetch(`http://api.sikher.com/hymn/${hymn}`)
    .then(r => r.json())
    .then(lines => {
      console.log(`Downloaded hymn ${lines[0].hymn}`);
      return Promise.resolve(lines.reduce((para, line) => para += `${line.text}\n\t${line.translation.text}\n`, ''));
    });
};

const saveHukamnama = (hymn = randomHymn, filename = defaultFilename()) => getHukamnama(hymn)
  .then(hukamnama => {
    console.log(hukamnama);
    return fs.writeFile(filename, hukamnama, 'utf8')
  })
  .catch(e => console.log(`Error: ${e}, ${JSON.stringify(e, null, 2)}`));

saveHukamnama(hymn, filename);

