"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const Humane = require('humane-js');
require("!style-loader!css-loader!humane-js/themes/bigbox.css");

exports.init = hSN=> {
	hSN.addTag('notice', hArg=> {
		hArg.baseCls = 'humane-bigbox';
		Humane.create(hArg).log(hArg.text);
		return false;
	});
};
