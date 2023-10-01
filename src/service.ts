import { mongoConnection } from "./dbconfig"
export class Service {
    helloFromService() {
        return 'Hello Buddy!'
    }

    async dumpData(userFeedback: Record<string, string>) {
        try {
            const db = mongoConnection.getDb();
            const response = await db.collection('feedback').insertOne(userFeedback);
            return response;
        } catch (error) {
            console.log('Error while invoking dumpData');
            console.log(error);
            return error;
        }
    }
}
