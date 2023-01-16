
export const Service = {
  Firestore: () => {
    const subs = new Map<string, (session: Session | null) => void>();
    const sessions: Session[] = []

    return {
      Session: {
        create: (session: Session) => {
          sessions.push(session);
          subs.forEach((sub) => sub(session));
          console.log("Session.create", session);
        },
        subscribe: (
          id: { userId: string },
          callback: (session: Session | null) => void
        ) => {
          subs.set(id.userId, callback);
          const session = sessions.find((session) => session.userId === id.userId)
          callback(session || null);
          console.log("Session.subscribe", id, session);
          return () => { subs.delete(id.userId); };
        },
      },
    };
  },
};
