const mainMsg = (conversationId) => {
	return {
		conversationId,
		text : "26팀 천하제일 사내대회",
		blocks : [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/banner_main.png"
			},
			{
			  "type": "text",
			  "text": "*우리 회사 가위바위보 짱이 되어보세요!*\n\n(1) 가위바위보 랭킹 1등에게는 *커피 기프티콘*을 드립니다.\n(2) 최초의 로또 1등 당첨자에게도 *커피 기프티콘*을 드립니다\n",
			  "markdown": true
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "participate_rsp",
			  "value": "rsp",
			  "text": "천하제일 가위바위보",
			  "style": "primary"
			},
			{
			  "type": "button",
			  "action_type": "call_modal",
			  "action_name": "participate_lotto",
			  "value": "lotto",
			  "text": "천하제일 로또 추첨",
			  "style": "primary"
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_rank_info",
			  "value": "rank",
			  "text": "랭킹 확인",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_rule_info",
			  "value": "rule",
			  "text": "게임 설명",
			  "style": "default"
			},
		]
	};
}

const rspMsg = (conversationId) => {
	return {
		conversationId,
		text: "천하제일 사내 가위바위보",
		blocks: [
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "0",
			  "text": "가위 ✌",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "1",
			  "text": "바위 ✊",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "2",
			  "text": "보 🖐",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "cancel",
			  "text": "포기하기 👻",
			  "style": "danger"
			}
		]
	};
}

const winMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "승리",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_win_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "0",
			  "text": "가위 ✌",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "1",
			  "text": "바위 ✊",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "2",
			  "text": "보 🖐",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "cancel",
			  "text": "포기하기 👻",
			  "style": "danger"
			}
		]
	};
}

const drawMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "무승부",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_draw_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "0",
			  "text": "가위 ✌",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "1",
			  "text": "바위 ✊",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "2",
			  "text": "보 🖐",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "cancel",
			  "text": "포기하기 👻",
			  "style": "danger"
			}
		]
	};
}

const loseMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "패배",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_lose_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "최종점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "retry",
			  "text": "메인으로",
			  "style": "default"
			}
		]
	};
}

const rankResMsg = (conversationId , res) => {
	return {
		conversationId,
		text: "랭킹 확인",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/banner_rank.png"
			},
			{
				"type": "text",
				"text": res,
				"markdown": true
			},
			{
			  "type": "action",
			  "elements": [
				{
					"type": "button",
					"text": "메인 페이지로",
					"action_type": "submit_action",
					"action_name": "show_main",
					"value": "main",
					"style": "default"
				},
				{
					"type": "button",
					"text": "랭킹 더보기",
					"action_type": "call_modal",
					"value": "rank_detail",
					"style": "primary"
				}
			  ]
			},
		]
	};
}

const ruleMsg = (conversationId, rspGameCount, lottoGameCount) => {
	return {
		conversationId,
		text: "게임 설명",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/banner_rule.png"
			},
			{
    			"type": "text",
    			"text": "*가위바위보*\n(1) 가위, 바위, 보를 골라 패배할 때까지 계속할 수 있어요.\n(2) 승리는 2점, 무승부는 1점을 받고 최종 점수가 랭킹에 등록됩니다.\n(3) 최종 1등을 하신분께는 커피 기프티콘을 드려요 :)(평가기간 내의 시도만 유효합니다)",
    		"markdown": true
    		},
    		{
    			"type": "divider"
			},
			{
    			"type": "text",
    			"text": "*로또 추첨*\n(1) 1~5의 숫자 3개를 고르고 추첨해주세요.\n(2) 처음으로 당첨된 분께는 커피 기프티콘을 드려요 :)(평가기간 내의 시도만 유효합니다)",
    		"markdown": true
    		},
    		{
    			"type": "divider"
			},
    		{
    			"type": "text",
    			"text": "*랭킹 확인*\n(1) 우리 회사 가위바위보 짱이 누구인지 확인해보세요!\n(2) 랭킹 더보기를 누르면 전체 목록을 확인할 수 있어요.",
    			"markdown": true
			},
    		{
      			"type": "divider"
    		},
			{
    			"type": "text",
    			"text": `*누적 참여수*\n가위바위보 - *${rspGameCount}회*\n로또 추첨 - *${lottoGameCount}회*`,
    		"markdown": true
    		},
    		{
    			"type": "context",
    			"content": {
					"type": "text",
        			"text": "[GitHub에서 ReadMe 읽어보기](https://github.com/SomaChatbot26/Chatbot26)",
        			"markdown": true
    			},
      			"image": {
        			"type": "image_link",
        			"url": "https://swm-chatbot-maoezt-okflk2.run.goorm.io/ic_github2.png"
      			}
    		},
    		{
      			"type": "divider"
    		},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "main",
			  "text": "메인 페이지로",
			  "style": "default"
			},
		]
	};
}



module.exports = { mainMsg, rspMsg, winMsg, drawMsg, loseMsg, rankResMsg, ruleMsg };