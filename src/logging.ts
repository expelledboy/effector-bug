import { $isSubscribed, $session, $userId, setUserId, subscribeSessionFx, updateSession } from "./model";

updateSession.watch((session) => {
    console.log("updateSession", session);
});

$session.watch((session) => {
    console.log("$session", session);
});

setUserId.watch((userId) => {
    console.log("setUserId", userId);
});

$userId.watch((userId) => {
    console.log("$userId", userId);
});

subscribeSessionFx.finally.watch((result) => {
    console.log("subscribeSessionFx.finally", result);
});

$isSubscribed.watch((isSubscribed) => {
    console.log("$isSubscribed", isSubscribed);
});
