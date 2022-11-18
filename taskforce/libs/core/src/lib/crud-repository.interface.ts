export interface CRUDRepositoryInterface<T, U, V> {
  create(item: T): Promise<V>;
  findById(id: U): Promise<V | null>;
  update(id: U, item: T): Promise<V>;
  delete(id: U): Promise<void>;
}
