import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class FireService {

    constructor(private db: AngularFirestore) {
    }

    getCollection(path) {
        return this.db.collection<any>(path);
    }

    valueChanges(collection, changeTypes?) {
        /*
            .valueChanges() is simple. It just returns the
            JSON data without metadata. If you need the
            doc.id() in the value you must persist it your self
            or use .snapshotChanges() instead. See the addItem()
            method below for how to persist the id with
            valueChanges()
        */

        // Deafult DocumentChangeTypes ['added', 'removed','modified']
        const documentChangeTypes = changeTypes ? changeTypes : ['added', 'removed', 'modified'];
        return collection.valueChanges(documentChangeTypes);
    }

    snapshotChanges(collection, changeTypes?) {
        /*
                .snapshotChanges() returns a DocumentChangeAction[], which contains
                a lot of information about "what happened" with each change. If you want to
                get the data and the id use the map operator.
        */

        // Deafult DocumentChangeTypes ['added', 'removed','modified']
        const documentChangeTypes = changeTypes ? changeTypes : ['added', 'removed', 'modified'];
        return collection.snapshotChanges(documentChangeTypes)
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            });
    }

    stateChanges(collection, changeTypes?) {
        /*
            Returns an Observable of the most recent changes as a DocumentChangeAction[]
            stateChanges() emits changes as they occur rather than syncing the query order.
            This works well for ngrx integrations as you can build your own
            data structure in your reducer methods.
        */

        // Deafult DocumentChangeTypes ['added', 'removed','modified']
        const documentChangeTypes = changeTypes ? changeTypes : ['added', 'removed', 'modified'];
        return collection.stateChanges(documentChangeTypes)
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            });
    }

    auditTrail(collection, changeTypes?) {
        /*
            It collects each change in an array as they occur.
            This is useful for ngrx integrations where you need to
            replay the entire state of an application. This also
            works as a great debugging tool for all applications.
            You can simple write afs.collection('items').auditTrail().subscribe(console.log)
            and check the events in the console as they occur.
        */

        // Deafult DocumentChangeTypes ['added', 'removed','modified']
        const documentChangeTypes = changeTypes ? changeTypes : ['added', 'removed', 'modified'];
        return collection.auditTrail(documentChangeTypes)
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            });
    }

    getElement(element: any): any {
        const id = this.db.createId();
        return {id: id, ...element};
    }
}
