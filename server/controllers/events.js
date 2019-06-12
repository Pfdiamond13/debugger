exports.logEvents = (req, res) => {
  console.log('controller fired')
  res.send([{ type: "track", messageId: "ajs-67c7e4d7-1430-48ca-a716-5f6d1cfd85d7", context: { ip: "39.197.248.177", library: { name: "analytics.js", version: "3.0.0" } }, integrations: {}, receivedAt: "2019-06-12T04:00:06.295Z", sentAt: 1560312001295, userId: "592c2a67-18e1-407e-b542-e0b85c59345b", anonymousId: "b9961406-3e3d-4957-b9d2-acbf3c24a294", event: "Experiment Viewed" }, { type: "page", messageId: "ajs-8198cfa0-2991-4418-ab4e-21d8f6f8cec6", context: { ip: "177.233.251.132", library: { name: "analytics.js", version: "3.0.0" } }, integrations: {}, receivedAt: "2019-06-12T04:00:06.296Z", sentAt: 1560312001296, userId: "23c046cf-6955-490e-a4cb-6507bcffeafb", anonymousId: "12592b9c-0d12-413c-849d-393807d764d2", properties: { path: "/", "referrer": "", search: "", title: "ut accusantium ducimus", url: "https://alexa.name" } }]);
};

// app.get('/api', (req, res) => {
//   redis.subscribe('events', function () {
//     console.log('Redis: subscribed');
//   });
//   redis.on('message', function (channel, message) {
//     // Receive message Hello world! from channel news
//     // Receive message Hello again! from channel music
//     console.log('Receive message %s from channel %s', message, channel);
//   });
//   res.send('hey');
// });
