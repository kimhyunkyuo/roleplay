const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fetch = require("node-fetch");


// Slack Bot Token (여기에 당신의 Slack 봇 토큰을 입력하세요)
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;


// Function to send notification to Slack
exports.sendToSlack = functions.https.onRequest((req, res) => {
  // Use the CORS middleware
  cors(req, res, async () => {
    // Handle preflight requests (OPTIONS)
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(204).send(""); // Return an empty response for OPTIONS requests
    }

    // Handle POST requests
    if (req.method !== "POST") {
      res.set("Access-Control-Allow-Origin", "*"); // Ensure this header is always set
      return res.status(405).send("Method Not Allowed");
    }

    const { email, timestamp } = req.body;

      // 클라이언트에서 받은 ISO 형식의 timestamp를 Date 객체로 변환
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString("ko-KR", { timeZone: 'Asia/Seoul' });
      const formattedTime = date.toLocaleTimeString("ko-KR", { 
        hour: 'numeric', 
        minute: 'numeric', 
        timeZone: 'Asia/Seoul'
      });

    const message = `(role-play)\n 1.신청날짜: ${formattedDate} ${formattedTime}\n 2.이메일: ${email} `;

    try {
      const slackResponse = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        },
        body: JSON.stringify({
          channel: SLACK_CHANNEL_ID,
          text: message,
        }),
      });

      const slackData = await slackResponse.json();
      if (slackData.ok) {
        res.set("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        res.status(200).send("Notification sent to Slack");
      } else {
        console.error("Error from Slack API:", slackData.error);
        res.set("Access-Control-Allow-Origin", "*");
        res.status(500).send("Failed to send notification to Slack");
      }
    } catch (error) {
      console.error("Error sending notification to Slack:", error);
      res.set("Access-Control-Allow-Origin", "*"); // Ensure header is set on error as well
      res.status(500).send("Error sending notification to Slack");
    }
  });
});
