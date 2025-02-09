<div  class="message">
  <div class="messageInfo">
    <img src="/images/avatar/robot.png" alt="">
    <span>just now</span>
  </div>
  <div class="messageContent">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, qui!</p>
    <img src="/images/avatar/robot.png" alt="">
  </div>
</div>

<div  class="message owner">
  <div class="messageInfo">
    <img src="/images/avatar/avatar-3.png" alt="">
    <span>just now</span>
  </div>
  <div class="messageContent">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, qui!</p>
    <img src="/images/avatar/robot.png" alt="">
  </div>
</div>

<style>
  .message {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
  }

  .messageInfo img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .messageContent p{
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
  }

  .messageContent img {
    width: 50%;
  }

  .message.owner {
    flex-direction: row-reverse;
  }

  .message.owner .messageContent {
    align-items: flex-end;
  }

  .message.owner .messageContent p{
    background-color: #8da4f1;
    color: white;
    border-radius: 10px 0px 10px 10px;
  }
</style>