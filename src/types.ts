type Session = {
  userId: string;
};

type SessionSubscription = {
  userId: string | null;
  unsubscribe: (() => void) | null;
};
