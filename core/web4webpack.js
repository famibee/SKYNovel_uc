"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 変更後は「npm run webpack:dev」

const hPlg = {};
import h from './plugin.json';
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}`);

import {SysWeb} from '@famibee/skynovel/web';
globalThis.addEventListener('DOMContentLoaded', async ()=> {
	new SysWeb(hPlg);	// 拡張機能で【(hPlg);】置換するので触らない

}, {once: true, passive: true});
