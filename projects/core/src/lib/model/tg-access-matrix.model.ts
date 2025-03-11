
/**
 * TG Access Matrix Value Object Class
 *
 * @class TGAccessMatrixVO
 */
export class TGAccessMatrixVO {
    key!: string;
    roleId!: number;
    module!: string;
    access!: string;
    create!: boolean;
    update!: boolean;
    read!: boolean;
    delete!: boolean;

    static fromJson(json: any) {
        const vo: TGAccessMatrixVO = new TGAccessMatrixVO();
        vo.key = json.key;
        vo.roleId = json.roleId;
        vo.module = json.module;
        vo.access = json.access;
        vo.create = json.create;
        vo.update = json.update;
        vo.read = json.read;
        vo.delete = json.delete;
        return vo;
    }

    toJson() {
        return {
            key: this.key,
            roleId: this.roleId,
            module: this.module,
            access: this.access,
            create: this.create,
            update: this.update,
            read: this.read,
            delete: this.delete
        };
    }
}
