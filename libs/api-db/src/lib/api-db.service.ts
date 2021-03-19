import { Inject, Injectable } from '@nestjs/common';
import { AnyObject, API_ENVIRONMENT, ApiEnvironment, DBCollection } from '@wise-guy/data';
import { ChangeStream, ChangeStreamOptions, DeleteWriteOpResultObject, ObjectId } from 'mongodb';
import { Subject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

const MongoClient = require('mongodb').MongoClient;

@Injectable()
export class ApiDbService {
  private _connected$: Subject<boolean> = new Subject<boolean>();
  public connected: Promise<boolean> = this._connected$.pipe(
    first(),
    shareReplay({bufferSize: 1, refCount: true})
  ).toPromise();

  private client = new MongoClient(
    `mongodb+srv://${this.environment.MONGODB_USERNAME}:${this.environment.MONGODB_PASSWORD}@${this.environment.MONGODB_URL}/${this.environment.MONGODB_DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  constructor(@Inject(API_ENVIRONMENT) private environment: ApiEnvironment) {
    this.client.connect(async (err) => {
      if (err) {
        console.error('Error connecting to Mongo DB: ', err);
      } else {
        this._connected$.next();
      }
    });
  }

  async findOne(collection: DBCollection, query: AnyObject = {}): Promise<AnyObject> {
    return await this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .findOne(query)
  }

  async findAll(collection: DBCollection, query: AnyObject = {}): Promise<AnyObject[]> {
    return await this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .find(query)
      .toArray();
  }

  async insertOne(collection: DBCollection, document: AnyObject): Promise<AnyObject> {
    return await this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .insertOne(document)
  }

  async replaceOne(collection: DBCollection, _id: string, document: AnyObject = {}) {
    return await this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .replaceOne({_id: new ObjectId(_id)}, document, {})
  }

  deleteOne(collection: DBCollection, _id: string): Promise<DeleteWriteOpResultObject>{
    return this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .deleteOne({_id: new ObjectId(_id)})
  }

  watch(collection: DBCollection, options?: ChangeStreamOptions): ChangeStream {
    return this.client.db(this.environment.MONGODB_DBNAME)
      .collection(collection)
      .watch(options);
  }
}
