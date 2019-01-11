/*
 Copyright 2016, 2018 IBM All Rights Reserved.

 SPDX-License-Identifier: Apache-2.0

*/

'use strict';

const sm2 = require('sm2');
var SM2 = sm2.SM2;
const KEYUTIL = sm2.KEYUTIL;

const utils = require('../utils.js');
var SM2_KEY = require('./sm2/key.js');
var ASN1 = require('./asn1/ASN1')
var Hex = require('./asn1/hex')

/*
 * The mixin enforces the special indexing mechanism with private and public
 * keys on top of a standard implementation of the KeyValueStore interface
 * with the getKey() and putKey() methods
 */
const CryptoKeyStoreMixin = (KeyValueStore) => class extends KeyValueStore {
	getKey(ski) {
		const self = this;

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
		const idx = _getKeyIndex(key.getSKI(), key.isPrivate());
		const pem = key.toBytes();
		return this.setValue(idx, pem)
			.then(() => {
				return key;
			});
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
const CryptoKeyStore = function (KVSImplClass, opts) {
	let superClass;

	if (typeof KVSImplClass !== 'function') {
		let impl_class = utils.getConfigSetting('crypto-value-store');
		if (!impl_class) {
			impl_class = utils.getConfigSetting('key-value-store');
		}
		superClass = require(impl_class);
	} else {
		superClass = KVSImplClass;
	}

	if (KVSImplClass !== null && typeof opts === 'undefined') {
		// the function is called with only one argument for the 'opts'
		opts = KVSImplClass;
	}

	const MyClass = class extends CryptoKeyStoreMixin(superClass) { };
	return new MyClass(opts);
};

function _getKeyIndex(ski, isPrivateKey) {
	if (isPrivateKey) {
		return ski + '-priv';
	} else {
		return ski + '-pub';
	}
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
