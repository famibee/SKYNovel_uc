"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const hPlg = {};
const h = require('./plugin.js').default;
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}/index.js`);

const SysMob_1 = require('skynovel/core/lib/sn/SysMob');
new SysMob_1.SysMob(hPlg);
