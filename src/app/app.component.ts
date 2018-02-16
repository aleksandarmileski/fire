import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from './models';
import {FireService} from './fire-service.service';

@Component({
    selector: 'er-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    users: Observable<User[]>;
    search: Observable<User[]>;
    usersCollection: AngularFirestoreCollection<User>;
    usersSearch: AngularFirestoreCollection<User>;

    constructor(private db: AngularFirestore, private fs: FireService) {
        this.usersCollection = this.fs.getCollection('users');
        // this.setValueChanges();
        this.setSnapshotChanges();
        // this.setStateChanges();
        // this.setAuditTrail();

        this.usersSearch = this.db.collection('users', ref => ref.where('username', '==', 'macko'));
        this.usersSearch.valueChanges().subscribe(res => this.search = res);
    }

    setValueChanges() {
        this.users = this.fs.valueChanges(this.usersCollection);
    }

    setSnapshotChanges() {
        this.users = this.fs.snapshotChanges(this.usersCollection);
    }

    setStateChanges() {
        this.users = this.fs.stateChanges(this.usersCollection);
    }

    setAuditTrail() {
        this.users = this.fs.auditTrail(this.usersCollection);
    }

    addUser() {
        this.usersCollection.add(
            this.fs.getElement({name: 'Cacko', username: 'macko'})
        );
    }

}
