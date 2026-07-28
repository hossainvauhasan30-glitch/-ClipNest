import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  increment, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ScenePack, Comment, ScenePackRequest } from '../types';
import { INITIAL_SCENE_PACKS } from '../data/mockData';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId.length > 0 
    ? firebaseConfig.firestoreDatabaseId 
    : undefined
);

const SCENE_PACKS_COLLECTION = 'scenepacks';
const COMMENTS_COLLECTION = 'comments';
const REQUESTS_COLLECTION = 'requests';

export async function fetchScenePacksFromFirebase(): Promise<ScenePack[]> {
  try {
    const colRef = collection(db, SCENE_PACKS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Seed Firestore with initial packs
      console.log('Seeding initial scene packs to Firestore...');
      for (const pack of INITIAL_SCENE_PACKS) {
        await setDoc(doc(db, SCENE_PACKS_COLLECTION, pack.id), pack);
      }
      return INITIAL_SCENE_PACKS;
    }

    const packs: ScenePack[] = [];
    snapshot.forEach((docSnap) => {
      packs.push({ id: docSnap.id, ...docSnap.data() } as ScenePack);
    });
    return packs;
  } catch (error) {
    console.warn('Firestore fetch failed, falling back to local initial data:', error);
    return INITIAL_SCENE_PACKS;
  }
}

export async function addScenePackToFirebase(
  packData: Omit<ScenePack, 'id' | 'createdAt' | 'downloadCount' | 'totalViews' | 'rating' | 'ratingCount'>
): Promise<ScenePack> {
  const newId = 'pack-' + Date.now();
  const newPack: ScenePack = {
    ...packData,
    id: newId,
    createdAt: new Date().toISOString(),
    downloadCount: 0,
    totalViews: 1,
    rating: 5.0,
    ratingCount: 1,
  };

  try {
    await setDoc(doc(db, SCENE_PACKS_COLLECTION, newId), newPack);
  } catch (err) {
    console.error('Failed to add pack to Firestore:', err);
  }

  return newPack;
}

export async function updateScenePackInFirebase(id: string, updates: Partial<ScenePack>): Promise<void> {
  try {
    const docRef = doc(db, SCENE_PACKS_COLLECTION, id);
    await updateDoc(docRef, updates);
  } catch (err) {
    console.error('Failed to update scene pack in Firestore:', err);
  }
}

export async function deleteScenePackFromFirebase(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, SCENE_PACKS_COLLECTION, id));
  } catch (err) {
    console.error('Failed to delete scene pack from Firestore:', err);
  }
}

export async function incrementDownloadCountFirebase(id: string): Promise<void> {
  try {
    const docRef = doc(db, SCENE_PACKS_COLLECTION, id);
    await updateDoc(docRef, { downloadCount: increment(1) });
  } catch (err) {
    console.warn('Failed to increment download count in Firestore:', err);
  }
}

export async function incrementViewCountFirebase(id: string): Promise<void> {
  try {
    const docRef = doc(db, SCENE_PACKS_COLLECTION, id);
    await updateDoc(docRef, { totalViews: increment(1) });
  } catch (err) {
    console.warn('Failed to increment view count in Firestore:', err);
  }
}

export async function fetchCommentsFromFirebase(scenePackId: string): Promise<Comment[]> {
  try {
    const colRef = collection(db, COMMENTS_COLLECTION);
    const q = query(colRef, where('scenePackId', '==', scenePackId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const comments: Comment[] = [];
    snapshot.forEach((docSnap) => {
      comments.push({ id: docSnap.id, ...docSnap.data() } as Comment);
    });
    return comments;
  } catch (err) {
    console.warn('Failed to fetch comments from Firestore:', err);
    return [
      {
        id: 'c1',
        scenePackId,
        author: 'K-Editor_Alex',
        text: 'The quality on this 60fps render is insane! Smooth twixor cuts. Thanks for uploading!',
        rating: 5,
        createdAt: '2026-07-21T11:00:00Z'
      },
      {
        id: 'c2',
        scenePackId,
        author: 'MinAh_Edits',
        text: 'Clean audio without bg music is super helpful for my reels edit. 10/10.',
        rating: 5,
        createdAt: '2026-07-23T14:20:00Z'
      }
    ];
  }
}

export async function addCommentToFirebase(commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  const newComment: Comment = {
    ...commentData,
    id: 'comment-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, COMMENTS_COLLECTION, newComment.id), newComment);
  } catch (err) {
    console.error('Failed to add comment to Firestore:', err);
  }

  return newComment;
}

export async function fetchRequestsFromFirebase(): Promise<ScenePackRequest[]> {
  try {
    const colRef = collection(db, REQUESTS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(20));
    const snapshot = await getDocs(q);

    const requests: ScenePackRequest[] = [];
    snapshot.forEach((docSnap) => {
      requests.push({ id: docSnap.id, ...docSnap.data() } as ScenePackRequest);
    });
    return requests;
  } catch (err) {
    console.warn('Failed to fetch requests from Firestore:', err);
    return [
      { id: 'r1', dramaName: 'Marry My Husband', notes: 'Episode 10 revenge party scene pack in 4K 60fps', requestedBy: 'SooYoung', status: 'completed', createdAt: '2026-07-19T08:00:00Z' },
      { id: 'r2', dramaName: 'Tax Driver Season 2', notes: 'Taxi car chase action scene pack', requestedBy: 'ActionFanatic', status: 'pending', createdAt: '2026-07-24T10:30:00Z' }
    ];
  }
}

export async function addRequestToFirebase(reqData: Omit<ScenePackRequest, 'id' | 'createdAt' | 'status'>): Promise<ScenePackRequest> {
  const newReq: ScenePackRequest = {
    ...reqData,
    id: 'req-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, REQUESTS_COLLECTION, newReq.id), newReq);
  } catch (err) {
    console.error('Failed to add request to Firestore:', err);
  }

  return newReq;
}
