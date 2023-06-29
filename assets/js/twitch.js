// PLAYER TWITCH
var embed = new Twitch.Embed("twitch-embed", {
  width: 854,
  height: 480,
  channel: "caploltwitch",
  layout: "video-with-chat",
  autoplay: true,
  chat: "default"
});

embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  var player = embed.getPlayer();
  player.play();
});