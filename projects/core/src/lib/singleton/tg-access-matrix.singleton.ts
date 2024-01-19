import { TGAccessMatrixVO } from '../model';

/**
 * TGFramework's Access Matrix implementation
 *
 * @export
 * @class TGAccessMatrix
 */
export class TGAccessMatrix {
  /** Singleton instance */
  private static instance: TGAccessMatrix;

  /** Flag Types */
  static READ = 1;
  static UPDATE = 2;
  static DELETE = 4;
  static CREATE = 8;

  /** Holds all Access Matrix as List */
  list: TGAccessMatrixVO[] = [];
  flags!: Map<string, Map<number, boolean>>; // String: key~roleId, int: Flag Type, bool: flag
  roleIds: number[] = [];

  /** Created At timestamp */
  private createdAt!: Date;

  /**
   * Gets TGAccessMatrix's instance reference
   *
   * @static
   * @returns {TGAccessMatrix}
   * @memberof TGAccessMatrix
   */
  public static getInstance(): TGAccessMatrix {
    if (this.instance == null) {
      this.instance = new TGAccessMatrix();
    }
    return this.instance;
  }

  /** Initialize */
  private init(): void {
    this.list = [];
    this.flags = new Map<string, Map<number, boolean>>();
    this.roleIds = [];
    this.createdAt = new Date();
  }

  /**
   * Map key and Role
   *
   * @private
   * @param {string} key
   * @param {number} roleId
   * @returns
   * @memberof TGAccessMatrix
   */
  private mapKey(key: string, roleId: number) {
    return `${key}~${roleId}`;
  }

  /**
   * Map Value and Access Matrix
   *
   * @private
   * @param {TGAccessMatrixVO} accessMatrixVO
   * @returns {Map<number, boolean>}
   * @memberof TGAccessMatrix
   */
  private mapValue(accessMatrixVO: TGAccessMatrixVO): Map<number, boolean> {
    const map = new Map<number, boolean>();
    map.set(TGAccessMatrix.READ, accessMatrixVO.read);
    map.set(TGAccessMatrix.UPDATE, accessMatrixVO.update);
    map.set(TGAccessMatrix.DELETE, accessMatrixVO.delete);
    map.set(TGAccessMatrix.CREATE, accessMatrixVO.create);
    return map;
  }

  /**
   * Gets flag for given key, roles and flag type
   *
   * @private
   * @param {string} key
   * @param {number[]} roleIds
   * @param {number} flagType
   * @returns {boolean}
   * @memberof TGAccessMatrix
   */
  private has(key: string, roleIds: number[], flagType: number): boolean {
    const checkRoles: number[] = roleIds != null ? roleIds : this.roleIds;
    if (checkRoles.length === 0) {
      return false;
    }

    let result = false;
    // checkRoles.forEach(roleId => {
    //   const mapKey = this.mapKey(key, roleId);
    //   if (this.flags.has(mapKey)) {
    //     if (this.flags.get(mapKey).get(flagType)) {
    //       result = true;
    //       return true;
    //     }
    //   }
    // });

    result = checkRoles.some(roleId => {
      const mapKey = this.mapKey(key, roleId);
      return this.flags.get(mapKey)?.get(flagType) ?? false;
    });
    
    return result;
  }

  /**
   * Add to Access Matrix list
   *
   * @param {TGAccessMatrixVO[]} list
   * @memberof TGAccessMatrix
   */
  addAll(list: TGAccessMatrixVO[]): void {
    list.forEach((element) => {
      this.add(element);
    });
  }

  /**
   * Add individual Access Matrix
   *
   * @param {TGAccessMatrixVO} accessMatrixVO
   * @memberof TGAccessMatrix
   */
  add(accessMatrixVO: TGAccessMatrixVO): void {
    this.list.push(accessMatrixVO);
    const mapKey: string = this.mapKey(accessMatrixVO.key, accessMatrixVO.roleId);
    if (this.flags.has(mapKey)) {
      this.flags.delete(mapKey);
    }
    this.flags.set(mapKey, this.mapValue(accessMatrixVO));
  }

  /**
   * Removes value for given key & role
   *
   * @param {string} key
   * @param {number} roleId
   * @memberof TGAccessMatrix
   */
  remove(key: string, roleId: number): void {
    this.list = this.list.filter(element => !(element.key === key && element.roleId === roleId));
    const mapKey: string = this.mapKey(key, roleId);
    this.flags.delete(mapKey);
  }


  /**
   * Apply Roles
   *
   * @param {number[]} roleIds
   * @memberof TGAccessMatrix
   */
  applyRoles(roleIds: number[]): void {
    if (roleIds == null) {
      this.roleIds = [];
    }
    this.roleIds = roleIds;
  }

  /**
   * Gets Read flag for given key and roles
   *
   * @param {string} key
   * @param {number[]} roleIds
   * @returns {boolean}
   * @memberof TGAccessMatrix
   */
  hasRead(key: string, roleIds: number[]): boolean {
    return this.has(key, roleIds, TGAccessMatrix.READ);
  }

  /**
   * Gets Update flag for given key and roles
   *
   * @param {string} key
   * @param {number[]} roleIds
   * @returns {boolean}
   * @memberof TGAccessMatrix
   */
  hasUpdate(key: string, roleIds: number[]): boolean {
    return this.has(key, roleIds, TGAccessMatrix.UPDATE);
  }

  /**
   * Gets Delete flag for given key and roles
   *
   * @param {string} key
   * @param {number[]} roleIds
   * @returns {boolean}
   * @memberof TGAccessMatrix
   */
  hasDelete(key: string, roleIds: number[]): boolean {
    return this.has(key, roleIds, TGAccessMatrix.DELETE);
  }

  /**
   * Gets Create flag for given key and roles
   *
   * @param {string} key
   * @param {number[]} roleIds
   * @returns {boolean}
   * @memberof TGAccessMatrix
   */
  hasCreate(key: string, roleIds: number[]): boolean {
    return this.has(key, roleIds, TGAccessMatrix.CREATE);
  }

  /**
   * Size of access matrix
   *
   * @returns {number}
   * @memberof TGAccessMatrix
   */
  size(): number {
    return this.list.length;
  }

  /**
   * Invalidate access matrix
   *
   * @memberof TGAccessMatrix
   */
  invalidate(): void {
    this.init();
  }

  /**
   * TGAccessMatrix created at
   *
   * @returns {Date}
   * @memberof TGAccessMatrix
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }


  /**
   * Number of milliseconds passed since valid TGAccessMatrix has been created
   *
   * @returns {number}
   * @memberof TGAccessMatrix
   */
  validSince(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }
}
