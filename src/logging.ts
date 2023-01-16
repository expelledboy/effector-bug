import { $isSubscribed, $session, $userId, setUserId, subscribeSessionFx, updateSession } from "./model";

updateSession.watch(console.log.bind(console, "updateSession"));
$session.watch(console.log.bind(console, "$session"));
setUserId.watch(console.log.bind(console, "setUserId"));
$userId.watch(console.log.bind(console, "$userId"));
subscribeSessionFx.finally.watch(console.log.bind(console, "subscribeSessionFx.finally"));
$isSubscribed.watch(console.log.bind(console, "$isSubscribed"));
