const rankResModal = (res) => {
	return {
		view : {
			"title": "천하제일 사내 랭킹",
			"accept": "확인",
			"decline": "취소",
			"value": "{request_modal의 응답으로 전송한 value 값}",
			"blocks": [
				{
					"type": "label",
					"text": res,
					"markdown": true
				}
			]
		}
	};
}

module.exports = { rankResModal };