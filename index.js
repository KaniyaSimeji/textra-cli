'use strict';

const url = '';
const key = '';
const secret = '';
const name = '';

const api_name = 'mt';
const api_param = 'c-1610_ja_en';

let access_token = null;

const request = require('request');

const call_api = function (text) {
	const params = {
		access_token : access_token,
		key : key,
		api_name : api_name,
		api_param: api_param,
		name: name,
		type : 'json',
		text: `${text}`
	};

	request.post(url + '/api/', { form: params }, function (err, res) {
		if (err) {
			console.log("error:", err)
			return;
		}

		if (res) {
		 	const body = JSON.parse(res.body);
			console.log(body.resultset.result.text)
			return;
		}
	})
};
if (require.main === module) {
	main({argv:process.argv})
}

function main(options) {
	const text  = options.argv[2];

	request.post(url + '/oauth2/token.php', {
    	form: {
        	grant_type: 'client_credentials',
        	client_id: key,                             // API Key
        	client_secret: secret,                      // API secret
        	urlAccessToken: url + '/oauth2/token.php'   // アクセストークン取得URI
    	}
	}, function (err, res) {

    if (err) {
        console.log("error:", err);
        return;
    }

    if (res) {
        try{
            access_token = JSON.parse(res.body).access_token;   // アクセストークン

        } catch (e) {
            console.log(e);
            return;
        }
    
        if (!access_token) {
            console.log("response:", res.body);
            return;
        }

        call_api(text);

    }
})};
