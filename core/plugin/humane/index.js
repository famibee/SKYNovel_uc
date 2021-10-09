"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const Humane = require('humane-js');
require("!style-loader!css-loader!humane-js/themes/bigbox.css");

exports.init = pia=> {
	Humane.baseCls = 'humane-bigbox';
	pia.addTag('notice', hArg=> {
		Humane.log(hArg.text);
		return false;
	});
};
