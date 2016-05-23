#!/usr/bin/env node

'use strict';

const fetch = require('node-fetch');
const fs = require('fs-promise');

const ang = process.argv[2];
const filename = process.argv[3];

const defaultFilename = (d = new Date()) => `Hukamnama ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.txt`;
const randomAng = 1 + parseInt(Math.random()*1430);

const getHukamnama = (ang = randomAng) => {
  console.log(`Fetching ang ${ang}`);
  return fetch(`http://api.sikher.com/page/${ang}`)
    .then(r => { console.log(`Downloaded ang ${ang}`); return r.json(); })
    .then(lines => fetch(`http://api.sikher.com/hymn/${lines.slice(-1)[0].hymn}`))
    .then(r => r.json())
    .then(lines => {
      console.log(`Downloaded hymn ${lines[0].hymn}`);
      return Promise.resolve(lines.reduce((para, line) => para += `${line.text}\n\t${line.translation.text}\n`, ''));
    });
};

const saveHukamnama = (ang = randomAng, filename = defaultFilename()) => getHukamnama(ang)
  .then(hukamnama => {
    console.log(hukamnama);
    return fs.writeFile(filename, hukamnama, 'utf8')
  })
  .catch(e => console.log(`Error: ${e}, ${JSON.stringify(e, null, 2)}`));

saveHukamnama(ang, filename);

