/*
 Copyright 2016-2017 IBM All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

	  http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

'use strict';

var sm2 = require('sm2');
// var sm2 = require('jsrsasign');
var SM2 = sm2.SM2;
var KEYUTIL = sm2.KEYUTIL;
var util = require('util');
var utils = require('../utils.js');
var SM2_KEY = require('./sm2/key.js');
var ASN1 = require('./asn1/ASN1')
var Hex = require('./asn1/hex')

var logger = utils.getLogger('CryptoKeyStore.js');

/*
 * The mixin enforces the special indexing mechanism with private and public
 * keys on top of a standard implementation of the KeyValueStore interface
 * with the getKey() and putKey() methods
 */
var CryptoKeyStoreMixin = (KeyValueStore) => class extends KeyValueStore {
	getKey(ski) {
		var self = this;

		// first try the private key entry, since it encapsulates both
		// the private key and public key
		return this.getValue(_getKeyIndex(ski, true))
			.then((raw) => {
				if (raw !== null) {
					// var privKey = KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(raw);
					var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
					var privKey = getHexFromPEM(raw, "PRIVATE KEY")
					var der = reHex.test(privKey) ? Hex.decode(privKey) : Base64.unarmor(privKey);
					var asn1 = ASN1.decode(der, 1)
					var ec = new SM2({ 'curve': 'sm2' });
					var charlen = ec.ecparams['keylen'] / 4;
					var epPub = ec.ecparams['G'].multiply(new sm2.BigInteger(asn1, 16))
					var biX = epPub.getX().toBigInteger();
					var biY = epPub.getY().toBigInteger();
					var hX = ("0000000000" + biX.toString(16)).slice(- charlen);
					var hY = ("0000000000" + biY.toString(16)).slice(- charlen);
					var hPub = "04" + hX + hY;
					ec.setPrivateKeyHex(asn1)
					ec.setPublicKeyHex(hPub)
					console.log("????????????????????????????")
					console.log(privKey)
					console.log(ec)
					console.log("????????????????????????????")

					ec.type = "SM2"
					// TODO: for now assuming ECDSA keys only, need to add support for RSA keys
					return new SM2_KEY(ec);
				}

				// didn't find the private key entry matching the SKI
				// next try the public key entry
				return self.getValue(_getKeyIndex(ski, false));
			}).then((key) => {
				if (SM2_KEY.isInstance(key))
					return key;

				if (key !== null) {
					var pubKey = KEYUTIL.getKey(key);
					return new SM2_KEY(pubKey);
				}
			});
	}

	putKey(key) {
		try {
			var idx = _getKeyIndex(key.getSKI(), key.isPrivate());
			logger.debug(util.format("key before input %v ", key, " idx %s", idx));
			var pem = key.toBytes();
			return this.setValue(idx, pem)
				.then(() => {
					return key;
				});
		} catch (err) {
			console.log(err)
		}
	}
};

/**
 * A CryptoKeyStore uses an underlying instance of {@link module:api.KeyValueStore} implementation
 * to persist crypto keys.
 *
 * @param {function} KVSImplClass Optional. The built-in key store saves private keys.
 *    The key store may be backed by different {@link KeyValueStore} implementations.
 *    If specified, the value of the argument must point to a module implementing the
 *    KeyValueStore interface.
 * @param {Object} opts Implementation-specific option object used in the constructor
 *
 * @class
 */
var CryptoKeyStore = function (KVSImplClass, opts) {
	var superClass;

	if (typeof KVSImplClass !== 'function') {
		let impl_class = utils.getConfigSetting('crypto-value-store');
		if (!impl_class) impl_class = utils.getConfigSetting('key-value-store');
		superClass = require(impl_class);
	} else {
		superClass = KVSImplClass;
	}

	if (KVSImplClass !== null && typeof opts === 'undefined') {
		// the function is called with only one argument for the 'opts'
		opts = KVSImplClass;
	}

	var MyClass = class extends CryptoKeyStoreMixin(superClass) { };
	return new MyClass(opts);
};

function _getKeyIndex(ski, isPrivateKey) {
	if (isPrivateKey)
		return ski + '-priv';
	else
		return ski + '-pub';
}
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function getHexFromPEM(sPEM, sHead) {
	var s = sPEM;
	if (s.indexOf("-----BEGIN ") == -1) {
		throw "can't find PEM header: " + sHead;
	}
	if (typeof sHead == "string" && sHead != "") {
		s = s.replace("-----BEGIN " + sHead + "-----", "");
		s = s.replace("-----END " + sHead + "-----", "");
	} else {
		s = s.replace(/-----BEGIN [^-]+-----/, '');
		s = s.replace(/-----END [^-]+-----/, '');
	}
	var sB64 = s.replace(/\s+/g, '');
	var dataHex = b64tohex(sB64);
	return dataHex;
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
// convert a base64 string to hex
function b64tohex(s) {
	var ret = ""
	var i;
	var k = 0; // b64 state, 0-3
	var slop;
	var v;
	for (i = 0; i < s.length; ++i) {
		if (s.charAt(i) == b64pad) break;
		v = b64map.indexOf(s.charAt(i));
		if (v < 0) continue;
		if (k == 0) {
			ret += int2char(v >> 2);
			slop = v & 3;
			k = 1;
		}
		else if (k == 1) {
			ret += int2char((slop << 2) | (v >> 4));
			slop = v & 0xf;
			k = 2;
		}
		else if (k == 2) {
			ret += int2char(slop);
			ret += int2char(v >> 2);
			slop = v & 3;
			k = 3;
		}
		else {
			ret += int2char((slop << 2) | (v >> 4));
			ret += int2char(v & 0xf);
			k = 0;
		}
	}
	if (k == 1)
		ret += int2char(slop << 2);
	return ret;
}
function int2char(n) { return BI_RM.charAt(n); }

module.exports = CryptoKeyStore;
