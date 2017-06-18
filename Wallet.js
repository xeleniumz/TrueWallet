/**
 * @version 1.0
 * @author Xeleniumz Fx
 * @type require  ES5 ,ES6
 * @module convert from https://github.com/exzajung/class.truewallet.php
 */

import requestPromise from 'request-promise-native'
import moment from 'moment'
import sha1 from 'sha1'


const api_signin = "https://api-ewm.truemoney.com/api/v1/signin?&";
const api_profile = "https://api-ewm.truemoney.com/api/v1/profile/";
const api_topup = "https://api-ewm.truemoney.com/api/api/v1/topup/mobile/";
const device_os = "android";
const device_id = "d520d0d12d0d48cb89394905168c6ed5";
const device_type = "CPH1611";
const device_version = "6.0.1";
const app_name = "wallet";
const app_version = "2.9.14";
const deviceToken = "fUUbZJ9nwBk:APA91bHHgBBHhP9rqBEon_BtUNz3rLHQ-sYXnezA10PRSWQTwFpMvC9QiFzh-CqPsbWEd6x409ATC5RVsHAfk_-14cSqVdGzhn8iX2K_DiNHvpYfMMIzvFx_YWpYj5OaEzMyIPh3mgtx";
const mobileTracking = "dJyFzn\/GIq7lrjv2RCsZbphpp0L\/W2+PsOTtOpg352mgWrt4XAEAAA==";



const Wallet = {

    async getToken(req, res) {
        let data = {
            "username": req.body.username,
            "password": sha1(req.body.password),
            "type": login_type,
            "deviceToken": deviceToken,
            "mobileTracking": mobileTracking,
        }

        let uri = api_signin + 'device_os=' + device_os + '&device_id=' +
            +device_id + '&device_type=' + device_type + '&device_version=' + device_version + '&app_name=' + app_name + '&app_version=' + app_version

        let headers = {
            "Host": "api-ewm.truemoney.com",
            "Content-Type": "application/json"
        }


        return await wallet_request(headers, uri, data)



    },

    async Profile(req, res, token) {
        let uri = api_profile + token + '?&device_os=android&device_id=' + device_id + '&device_type=' + device_type + '&device_version=' +
            device_version + '&app_name=' + app_name + '&app_version=' + app_version
        let headers = {
            "Host": "api-ewm.truemoney.com"
        }
        return await wallet_request(headers, uri,false)
    },

    async Topup(req, res, token) {
        let uri = api_topup + moment().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss') + "/" + token + "/cashcard/" + req.body.cashcard;
        let headers = {
            "Host": "api-ewm.truemoney.com"
        }
        return await wallet_request(headers,uri,false);
    },

    async wallet_request(headers, uri, data) {
        if (!data) {
            var options = {
                header: headers,
                method: 'GET',
                uri: uri,
                json: true
            }
        } else {
            var options = {
                header: headers,
                method: 'POST',
                uri: uri,
                body: data,
                json: true
            }
        }


        return requestPromise(options)
            .then(function(parsedBody) {
                return parsedBody
            })
            .catch(function(err) {
                return err
            });
    },



}


export default Wallet
