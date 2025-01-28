declare enum NotificationType {
    release = "release",
    integrationtest = "integration-test"
}
declare const sendTelegramNotification: () => Promise<void>;
declare const getNotificationMessage: (notificationType: NotificationType, isSuccess: any) => string;
