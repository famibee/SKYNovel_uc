"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 変更後は「npm run webpack:dev」

const hPlg = {};
import h from './plugin.js';
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}`);

import {SysApp} from '@famibee/skynovel/app';
new SysApp(hPlg, {cur: process.cwd() +'/doc/prj/'});
