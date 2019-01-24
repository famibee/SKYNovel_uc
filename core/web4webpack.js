"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const hPlg = {};
const h = require('./plugin.js').default;
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}/index.js`);

const SysWeb_1 = require('skynovel/core/lib/sn/SysWeb');
new SysWeb_1.SysWeb(hPlg);
