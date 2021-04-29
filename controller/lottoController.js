exports.lotto_game = (conversationId, choice1, choice2, choice3) => {
	
	// 1 ~ 5 난수 생성
	let random_choice = [];
	
	for(i = 0; i < 3; i++)
	{
		random_choice.push(Math.floor(Math.random()*5 + 1));
	}
	
	console.log(choice1, choice2, choice3);
	
	if(choice1 == random_choice[0] && choice2 == random_choice[1] && choice3 == random_choice[2])
	{
		const msg = {
		  conversationId,	
		  "text": "축하드립니다. 당첨되셨습니다!",
		  "blocks": [
			{
			  "type": "text",
			  "text": "축하드립니다. 당첨되셨습니다!\n최초 담청자에 한해 *커피 기프티콘*을 드려요!\n본 메시지를 스크린샷 찍고 아래 링크에 정보를 입력해주세요",
			  "markdown": true
			},
			{
			  "type": "text",
			  "markdown": true
			},
			{
			  "type": "context",
			  "content": {
				"type": "text",
				"text": "[경품 발송 정보 입력하기](https://docs.google.com/forms/d/e/1FAIpQLSdMkOAJa78S3FfXZoc4j4IKPVhGUGp7Ji5-b-NRlsoXMHar1g/viewform)",
				"markdown": true
			  },
			  "image": {
				"type": "image_link",
				"url": "https://swm-chatbot-maoezt-okflk2.run.goorm.io/img_coffee.png"
			  }
			},
			{
			  "type": "button",
			  "text": "메인 화면으로 돌아가기",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "main",
			  "style": "default"
			}
		  ]
		}
		
		msg.blocks[1].text = `당첨 번호는 ${choice1}, ${choice2}, ${choice3} 입니다.`;
		
		return msg;
	} else {
		
		let msg = {
		  conversationId,
		  "text": "아쉽지만, 당첨되지 못헀습니다 ㅜㅜ",
		  "blocks": [
			{
			  "type": "text",
			  "text": "아쉽지만, 당첨되지 못헀습니다 ㅜㅜ",
			  "markdown": true
			},
			{
			  "type": "text",
			  "markdown": true
			},
			{
			  "type": "text",
			  "markdown": true
			},  
			{
			  "type": "button",
			  "text": "메인 화면으로 돌아가기",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "main",
			  "style": "default"
			}
		  ]
		}
		
		msg.blocks[1].text = `뽑은 번호는 ${choice1}, ${choice2}, ${choice3} 입니다.`;
		msg.blocks[2].text = `당첨 번호는 ${random_choice[0]}, ${random_choice[1]}, ${random_choice[2]} 입니다.`;
		
		return msg;
	}
}