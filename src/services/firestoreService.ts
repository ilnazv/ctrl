import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const addListItem = (id: string, name: string) => {
    return db.collection('list')
        .add({ id, name });
};

export const getList = () => {
    return db.collection('list')
        .orderBy('id', 'desc')
        .get();
};

export const subscribeToList = (processData: (docs: { id: string, name: string }[]) => void) => {
    return db.collection('list')
        .orderBy('id', 'desc').onSnapshot((snapshot) => {
            processData(snapshot.docs.map(d => d.data() as { id: string, name: string }));
        });
}

export const clearList = async () => {
    const batch = db.batch();
    const collection = await db.collection('list').get();
    collection.forEach(x => {
        batch.delete(x.ref);
    });
    await batch.commit();
};
