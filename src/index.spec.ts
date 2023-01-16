import { allSettled, fork } from "effector"
import { domain, $isSubscribed, setUserId, $session, updateSession } from "./model";
import { Service } from "./service";

import "./init"
import "./logging"

const scope = fork(domain)

describe("session subscription", () => {
  it("should NOT be subscribed to session", () => {
    expect(scope.getState($isSubscribed)).toBe(false)
  })

  it("should subscribe to session after getting a user id", async () => {
    setUserId("user-id")
    expect(scope.getState($isSubscribed)).toBe(true)
    expect(scope.getState($session)).toBe(null)
  })

  it("session should be updated on create", async () => {
    const { Session } = Service.Firestore()
    Session.create({ userId: "user-id" })
    expect(scope.getState($session)).not.toBe(null)
    expect(scope.getState($session)).toMatchObject({ userId: "user-id" })
  })

  it("update session works directly", async () => {
    await allSettled(updateSession, { scope, params: { userId: "user-id" } })
    expect(scope.getState($session)).not.toBe(null)
  })
});