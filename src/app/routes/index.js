import koaRouter from 'koa-router';
import os from 'os';
import path from 'path';
import fs from 'fs-promise';
import read from '../../lib/read/';

const router = koaRouter();

// router.get('/', async (ctx, next) => {
//     ctx.body = 'hi there';
// });

router.post('/read', async (ctx, next) => {
    // create a temporary folder to store files
    const tmpdir = path.join(os.tmpdir(), uid());

    // make the temporary directory
    await fs.mkdir(tmpdir);
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        filePaths.push(filePath);
    }

    const textResults = await Promise.all(filePaths.map(async (path) => read(path)));

    ctx.body = textResults;
});

const uid = () => Math.random().toString(36).slice(2);

export default router;

/*
const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs-promise');
const koaBody = require('koa-body');

app.use(async function(ctx) {
  // create a temporary folder to store files
  const tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  await fs.mkdir(tmpdir);
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
});

if (!module.parent) app.listen(3000);



*/