avatar_img_src = '/images/person1_avatar.png';
watson_img_src = '/images/watson_avatar.png';

function button_send() {
  var user_message = user_retrieve_message();
  if (user_message.length > 0) {
    user_display_message(user_message);
  }
  watson_message('Watson\'s message goes here');
  return user_message;
}

function user_retrieve_message() {
  var userInputText = document.getElementById("user_input").value;
  console.log("message sent: " + userInputText);
  document.getElementById("user_input").value = "";
  return userInputText;
}

function user_display_message(userInputText) {
  // create new div for chat message
  var newDiv = document.createElement('div');
  newDiv.className = "container darker";

  // create the avatar img
  var newImg = document.createElement('img');
  newImg.setAttribute("src", avatar_img_src);
  newImg.setAttribute("alt", "Avatar");
  newImg.setAttribute("class", "right");
  newImg.setAttribute("style", "width:100%");
  newDiv.appendChild(newImg);
  
  // create the paragraph
  var newP = document.createElement('p')
  newP.setAttribute("margin", "10px 0");
  newP.appendChild(document.createTextNode(userInputText));
  newDiv.appendChild(newP);

  // put up the user's new message
  var body = document.getElementsByClassName('chatMsgs')[0];
  body.appendChild(newDiv);
}

function watson_message(watsonText) {
  // create div for Watson's message
  var responseDiv = document.createElement('div');
  responseDiv.className = "container";

  // create Watson's avatar img
  var responseImg = document.createElement('img');
  responseImg.setAttribute("src", watson_img_src);
  responseImg.setAttribute("alt", "Avatar");
  responseImg.setAttribute("class", "left");
  responseImg.setAttribute("style", "width:100%");
  responseDiv.appendChild(responseImg);
  
  // create Watson's paragraph
  var responseP = document.createElement('p')
  responseP.setAttribute("margin", "10px 0");
  responseP.appendChild(document.createTextNode(watsonText));
  responseDiv.appendChild(responseP);

  // put up Watson's new message
  var body = document.getElementsByClassName('chatMsgs')[0];
  body.appendChild(responseDiv);

}


