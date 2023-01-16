import { createDomain, sample, restore } from "effector";

export const domain = createDomain("app");
export const sessionDomain = domain.createDomain("session");

export const subscribeSessionFx = sessionDomain.createEffect<
  SessionSubscription,
  SessionSubscription["unsubscribe"]
>();

export const updateSession = sessionDomain.createEvent<Session | null>();
export const $session = sessionDomain.createStore<Session | null>(null);
export const setUserId = sessionDomain.createEvent<string | null>();
export const $userId = sessionDomain.createStore<string | null>(null).on(setUserId, (_, userId) => userId);
export const $isSubscribed = sessionDomain.createStore<boolean>(false).on(updateSession, () => true);