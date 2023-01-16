import { createDomain, sample, restore } from "effector";

type Session = {
  userId: string;
};

type SessionSubscription = {
  userId: string | null;
  unsubscribe: (() => void) | null;
};

export const domain = createDomain("app");

const app = {
  session: domain.createDomain("session"),
};

const subscribeSessionFx = app.session.createEffect<
  SessionSubscription,
  SessionSubscription["unsubscribe"]
>();

export const Service = {
  Firestore: () => {
    const subs = new Map<string, (session: Session | null) => void>();
    const sessions: Session[] = []

    return {
      Session: {
        create: (session: Session) => {
          sessions.push(session);

          subs.forEach((sub) => sub(session));
        },
        subscribe: (
          id: { userId: string },
          callback: (session: Session | null) => void
        ) => {
          subs.set(id.userId, callback);

          const session = sessions.find((session) => session.userId === id.userId)

          callback(session || null);

          return () => {
            subs.delete(id.userId);
          };
        },
      },
    };
  },
};

const updateSession = app.session.createEvent<Session | null>();

updateSession.watch((session) => {
  console.log("updateSession", session);
});

const $session = app.session.createStore<Session | null>(null);

$session.watch((session) => {
  console.log("$session", session);
});

export const setUserId = app.session.createEvent<string | null>();

const $userId = app.session.createStore<string | null>(null).on(setUserId, (_, userId) => userId);

$userId.watch((userId) => {
  console.log("$userId", userId);
});

subscribeSessionFx.use(async ({ userId, unsubscribe }) => {
  if (unsubscribe) unsubscribe();

  if (!userId) return null;

  const { Session } = Service.Firestore();

  return Session.subscribe({ userId }, (session) => {
    updateSession(session);
  });
});

subscribeSessionFx.finally.watch((result) => {
  console.log("subscribeSessionFx.finally", result);
});

export const $isSubscribed = app.session.createStore<boolean>(false).on(updateSession, () => true);

$isSubscribed.watch((isSubscribed) => {
  console.log("$isSubscribed", isSubscribed);
});

sample({
  source: restore(subscribeSessionFx.doneData, null),
  clock: $userId,
  fn: (unsubscribe, userId) => ({ unsubscribe, userId }),
  target: subscribeSessionFx,
});