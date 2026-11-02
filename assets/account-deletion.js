/* The marker fences off stale/offline clients before deleting this UID's work. */
'use strict';
(()=>{
 const markerId='_accountDeletion';
 async function run({db,account,timestamp,assertIdentity,onMarked,beforeAuthDelete}){
  const collection=db.collection('users').doc(account.uid).collection('learning');
  assertIdentity();const marker=collection.doc(markerId);await db.runTransaction(async tx=>{const previous=await tx.get(marker);if(!previous.exists)tx.set(marker,{deleting:true,updatedAt:timestamp()});});
  await onMarked();
  for(;;){
   assertIdentity();
   const snapshot=await collection.limit(200).get({source:'server'}),documents=snapshot.docs.filter(doc=>doc.id!==markerId);
   if(!documents.length)break;
   const batch=db.batch();for(const document of documents)batch.delete(document.ref);await batch.commit();
  }
  assertIdentity();await beforeAuthDelete();assertIdentity();await account.delete();
 }
 globalThis.LearningAccountDeletion={markerId,run};
})();
