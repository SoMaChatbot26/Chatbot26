const rankResModal = (res) => {
	return {
		view : {
			"title": "천하제일 사내 랭킹",
			"accept": "확인",
			"decline": "취소",
			"value": "check_rank_detail",
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

const lottoModal = {
	view: {
		   "title":"천하제일 로또 추첨",
		   "accept":"추첨하기",
		   "decline":"취소",
		   "value":"lotto",
		   "blocks":[
			  {
				 "type":"select",
				 "name":"lotto_choice1",
				 "options":[
					{
					   "text":"1",
					   "value":"1"
					},
					{
					   "text":"2",
					   "value":"2"
					},
					{
					   "text":"3",
					   "value":"3"
					},
					{
					   "text":"4",
					   "value":"4"
					},
					{
					   "text":"5",
					   "value":"5"
					}
				 ],
				 "required":true,
				 "placeholder":"(1) 로또 번호를 선택해주세요 (중복O)"
			  },
			  {
				 "type":"select",
				 "name":"lotto_choice2",
				 "options":[
					{
					   "text":"1",
					   "value":"1"
					},
					{
					   "text":"2",
					   "value":"2"
					},
					{
					   "text":"3",
					   "value":"3"
					},
					{
					   "text":"4",
					   "value":"4"
					},
					{
					   "text":"5",
					   "value":"5"
					}
				 ],
				 "required":true,
				 "placeholder":"(2) 로또 번호를 선택해주세요 (중복O)"
			  },
			  {
				 "type":"select",
				 "name":"lotto_choice3",
				 "options":[
					{
					   "text":"1",
					   "value":"1"
					},
					{
					   "text":"2",
					   "value":"2"
					},
					{
					   "text":"3",
					   "value":"3"
					},
					{
					   "text":"4",
					   "value":"4"
					},
					{
					   "text":"5",
					   "value":"5"
					}
				 ],
				 "required":true,
				 "placeholder":"(3) 로또 번호를 선택해주세요 (중복O)"
			  }
		   ]
	}
};


// const lottoModal = {
// 			view: {
// 					  "title": "천하제일 로또 추첨",
// 					  "accept": "추첨하기",
// 					  "decline": "취소",
// 					  "value": "lotto",
// 					  "blocks": [
// 						  {
// 							   "type": "label",
// 							  "text": "당신의 행운을 시험해보세요."
							  
// 						  },
// 						{
// 						  "type": "select",
// 						  "name": "lotto_choice1",
// 						  "options": [
// 							{
// 							  "text": "1",
// 							  "value": "1"
// 							},
// 							{
// 							  "text": "2",
// 							  "value": "2"
// 							},
// 							{
// 							  "text": "3",
// 							  "value": "3"
// 							},
// 							{
// 							  "text": "4",
// 							  "value": "4"
// 							},
// 							{
// 							  "text": "5",
// 							  "value": "5"
// 							}
// 						  ],
// 						  "required": false,
// 						  "placeholder": "(1) 로또 번호를 선택해주세요 (중복O)"
// 						},
// 						{
// 						  "type": "select",
// 						  "name": "lotto_choice2",
// 						  "options": [
// 							{
// 							  "text": "1",
// 							  "value": "1"
// 							},
// 							{
// 							  "text": "2",
// 							  "value": "2"
// 							},
// 							{
// 							  "text": "3",
// 							  "value": "3"
// 							},
// 							{
// 							  "text": "4",
// 							  "value": "4"
// 							},
// 							{
// 							  "text": "5",
// 							  "value": "5"
// 							}
// 						  ],
// 						  "required": false,
// 						  "placeholder": "(2) 로또 번호를 선택해주세요 (중복O)"
// 						},
// 						{
// 						  "type": "select",
// 						  "name": "lotto_choice3",
// 						  "options": [
// 							{
// 							  "text": "1",
// 							  "value": "1"
// 							},
// 							{
// 							  "text": "2",
// 							  "value": "2"
// 							},
// 							{
// 							  "text": "3",
// 							  "value": "3"
// 							},
// 							{
// 							  "text": "4",
// 							  "value": "4"
// 							},
// 							{
// 							  "text": "5",
// 							  "value": "5"
// 							}
// 						  ],
// 						  "required": false,
// 						  "placeholder": "(3) 로또 번호를 선택해주세요 (중복O)"
// 						}
// 					  ]
// 				} 
// 		    }

module.exports = { rankResModal, lottoModal };