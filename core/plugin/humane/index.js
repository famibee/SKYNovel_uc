"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const Humane = require('humane-js');
require("!style-loader!css-loader!humane-js/themes/bigbox.css");

exports.init = hSN=> {
	Humane.baseCls = 'humane-bigbox';
	hSN.addTag('notice', hArg=> {
		Humane.log(hArg.text);
		return false;
	});
};
