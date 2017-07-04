/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

"use strict";

var _ = require('underscore');
var swarm = require("swarm-js");



var Bzz = function Bzz(provider) {
    return swarm.setProvider(provider);
};

// set default ethereum provider
Bzz.prototype.givenProvider = null;
if(typeof ethereumProvider !== 'undefined' && ethereumProvider.bzz) {
    Bzz.prototype.givenProvider = ethereumProvider;
}

swarm.setProvider = function(provider) {
    var ethereumProvider = null;

    // is ethereum provider
    if(_.isObject(provider) && _.isString(provider.bzz)) {
        provider = provider.bzz;
        ethereumProvider = provider;

    // is no string, set default
    } else if(!_.isString(provider)) {
        provider = 'http://swarm-gateways.net'; // default to gateway
    }


    var bzz = swarm.at(provider);
    bzz.setProvider = swarm.setProvider;
    bzz.currentProvider = provider;
    bzz.givenProvider = Bzz.prototype.givenProvider;
    return bzz;
};


module.exports = Bzz;

