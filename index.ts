enum NotificationType {
  release = "release",
  integrationtest = "integration-test",
}

const sendTelegramNotification = async () => {
  const notificationType = process.argv[2] as NotificationType;
  const isSuccess = process.argv[3] === "success";

  const message = getNotificationMessage(notificationType, isSuccess);
  const botToken = "7093173788:AAHjWqdXBHHrrwJLSwXBMBtkKJH_dolSdW8";
  const chatIds = [1377337356];

  try {
    await Promise.allSettled(
      chatIds.map(async (chatId) => {
        const response = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to send message to chat ID: ${chatId}, Status: ${response.status}`
          );
        }

        console.info(`Message sent to chat ID: ${chatId}`);
      })
    );
  } catch (error) {
    console.error("Failed to send some messages.", error);
  }
};

const getNotificationMessage = (
  notificationType: NotificationType,
  isSuccess
) => {
  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let message = "";

  switch (notificationType) {
    case NotificationType.release:
      message = `🚀 <b>Release Notification</b>:\n`;
      message += isSuccess
        ? "✅ The release was successful!\n"
        : "❌ The release failed. Please check the logs.\n";
      break;
    case NotificationType.integrationtest:
      message = `<b>🛠️️ Integration Test Notification:\n<b>`;
      message += isSuccess
        ? "✅ All integration tests passed successfully!\n"
        : "❌ Some integration tests failed. Please investigate.\n";
      break;
  }

  message += `<b>Enviroment:</b> Backend\n\n<i>Timestamp: ${currentDate}</i>`;

  return message;
};

if (process.argv[2] && process.argv[3]) {
  sendTelegramNotification();
}
