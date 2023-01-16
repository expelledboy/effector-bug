import { allSettled, fork } from "effector"
import { $isSubscribed, setUserId, domain, Service } from "./index";

const scope = fork(domain)

describe("session subscription", () => {
  it("should NOT be subscribed to session", () => {
    expect(scope.getState($isSubscribed)).toBe(false)
  })

  it("should subscribe to session after getting a user id", async () => {
    setUserId("user-id")
    expect(scope.getState($isSubscribed)).toBe(true)
  })
});