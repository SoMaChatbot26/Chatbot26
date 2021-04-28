const datas = {}
const rank = []
const libKakaoWork = require('../libs/kakaoWork');
const message = require('../data/messages');


const get_rsp_from_int = (choice) => {
  switch (choice) {
    case 0:
      return '바위 ✊';
    case 1:
      return '가위 ✌';
    default:
      return '보 🖐';

  }
}


// input : Int (ROCK : 0, SCISSOR : 1, PAPER : 2)
// output : Int (이겼을 때 1, 비겼을때 : 0, 졌을때 : -1)
const do_rsp_and_get_winner = (user_choice, computer_choice) => {

  // input 범위 체크
  if (user_choice < 0 || user_choice > 2) {
    throw new Error();
  }


  if ((user_choice - computer_choice == -1) || (user_choice - computer_choice == 2)) {
    return 1
  }
  if (user_choice == computer_choice) {
    return 0
  }
  return -1
}

// 새로운 랭킹 기록
const record_rank = (user_id) => {

  const score = datas[user_id];

  rank.sort(function (a, b) {
    if (a.score > b.score) {
      return 1;
    }
    if (a.score < b.score) {
      return -1;
    }
    return 0;
  });
  if (rank.length < RANK_SIZE) {
    rank.push({ user_id, score });
    return
  }
}

//
const play_game = async (user_id, conversation_id, user_choice) => {

  const computer_choice = Math.floor(Math.random() * 3);
  const rsp_result = do_rsp_and_get_winner(user_choice, computer_choice);


  if (!(user_id in datas)) {
    datas[user_id] = 0;
  }
  const msg = `나는 ${get_rsp_from_int(user_choice)}를 냈습니다\n컴퓨터는 ${get_rsp_from_int(computer_choice)}를 냈습니다\n\n`

  if (rsp_result == 1) { // 이겼을 때
    datas[user_id] += 1
    await libKakaoWork.sendMessage(message.getRSP(msg + `*이겼습니다*. 지금까지 ${datas[user_id]}회 연속승리하였습니다`, conversation_id));

  } else if (rsp_result == -1) { // 졌을 때
    record_rank(user_id)
    await libKakaoWork.sendMessage(message.showRank(msg + `*졌습니다*\n\n*현재스코어*: ${datas[user_id]} \n*현재랭킹* \n` + parseRank(user_id), conversation_id));
    datas[user_id] = 0
  } else {
    await libKakaoWork.sendMessage(message.getRSP(msg + `*비겼습니다* 지금까지 ${datas[user_id]}회 연속승리하였습니다`, conversation_id));
  }


}

module.exports = {
  play_game,
}