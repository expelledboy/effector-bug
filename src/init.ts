import { restore, sample } from "effector";
import { $session, $userId, subscribeSessionFx, updateSession } from "./model";
import { Service } from "./service";

subscribeSessionFx.use(async ({ userId, unsubscribe }) => {
  if (unsubscribe) unsubscribe();

  if (!userId) return null;

  const { Session } = Service.Firestore();

  return Session.subscribe({ userId }, (session) => {
    updateSession(session);
  });
});

sample({
  source: restore(subscribeSessionFx.doneData, null),
  clock: $userId,
  fn: (unsubscribe, userId) => ({ unsubscribe, userId }),
  target: subscribeSessionFx,
});

$session.on(updateSession, (_, session) => session);