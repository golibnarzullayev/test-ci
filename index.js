var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var NotificationType;
(function (NotificationType) {
    NotificationType["release"] = "release";
    NotificationType["integrationtest"] = "integration-test";
})(NotificationType || (NotificationType = {}));
var sendTelegramNotification = function () { return __awaiter(_this, void 0, void 0, function () {
    var notificationType, isSuccess, link, message, botToken, chatIds, error_1;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notificationType = process.argv[2];
                isSuccess = process.argv[3] === "success";
                link = process.argv[4];
                message = getNotificationMessage(notificationType, isSuccess, link);
                botToken = "7093173788:AAHzSqAERzruN8xcUSlZGjZNooiWjYWklb4";
                chatIds = [1377337356];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.allSettled(chatIds.map(function (chatId) { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch("https://api.telegram.org/bot".concat(botToken, "/sendMessage"), {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            chat_id: chatId,
                                            text: message,
                                            parse_mode: "HTML",
                                        }),
                                    })];
                                case 1:
                                    response = _a.sent();
                                    console.log(response);
                                    if (!response.ok) {
                                        throw new Error("Failed to send message to chat ID: ".concat(chatId, ", Status: ").concat(response.status));
                                    }
                                    console.info("Message sent to chat ID: ".concat(chatId));
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Failed to send some messages.", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getNotificationMessage = function (notificationType, isSuccess, link) {
    var currentDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    var message = "";
    switch (notificationType) {
        case NotificationType.release:
            message = "<b>\uD83D\uDE80 New Release Deployed</b>:\n\n";
            message += isSuccess
                ? "✅ The release was successful!\n"
                : "❌ The release failed. Please check the logs.\n";
            break;
        case NotificationType.integrationtest:
            message = "<b>\uD83D\uDD0D Integration Test Notification:\n<b>";
            message += isSuccess
                ? "✅ All integration tests passed successfully!\n"
                : "🚨 Oops! Some integration tests have failed.\n";
            break;
    }
    message += "<b>\uD83D\uDCCC Link:</b> ".concat(link, "\n");
    message += "<b>\uD83D\uDD27 Enviroment:</b> Backend\n\n<i>Timestamp: ".concat(currentDate, "</i>");
    return message;
};
sendTelegramNotification();
