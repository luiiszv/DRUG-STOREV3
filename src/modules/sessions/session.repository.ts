import { SessionModel } from "./session.model";
import { ISession } from "./session.model";

export class SessionRepository {
    async createSession(sessionData: Partial<ISession>) {
        return SessionModel.create(sessionData);
    }

    async findSessionByToken(token: string) {
        return SessionModel.findOne({ token });
    }

    async findActiveSessionsByUser(userId: string) {
        return SessionModel.find({ userId, isActive: true });
    }

    async deactivateSession(token: string, reason: "logout" | "expired" | "revoked" = "logout") {
        return SessionModel.findOneAndUpdate(
            { token, isActive: true },
            { isActive: false, endedAt: new Date(), logoutReason: reason },
            { new: true }
        );
    }

    async deleteExpiredSessions() {
        return SessionModel.deleteMany({ expiresAt: { $lt: new Date() } });
    }

    async deactivateAllSessionsByUser(userId: string) {
        return SessionModel.updateMany(
            { userId, isActive: true },
            { isActive: false, endedAt: new Date(), logoutReason: "logout" }
        );
    }
}