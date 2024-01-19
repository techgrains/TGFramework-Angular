import { TGAccessMatrix } from '../../lib/singleton';
import { TGAccessMatrixVO } from '../../lib/model';
import { tick, fakeAsync } from '@angular/core/testing';

describe('TGAccessMatrix', () => {

  beforeEach(() => {
    TGAccessMatrix.getInstance().invalidate();
  });

  it('should create', () => {
    expect(TGAccessMatrix.getInstance()).toBeDefined();
  });

  it('has on empty ', () => {
    expect(TGAccessMatrix.getInstance().hasCreate('key1', [1])).toBeFalsy();
  });

  it('CRUD check for 1 role', () => {
    TGAccessMatrix.getInstance().add(createMatrix('1', 1, true, true, false, false));
    expect(TGAccessMatrix.getInstance().hasCreate('1', [1])).toBeTruthy();
    expect(TGAccessMatrix.getInstance().hasRead('1', [1])).toBeTruthy();
    expect(TGAccessMatrix.getInstance().hasUpdate('1', [1])).toBeFalsy();
    expect(TGAccessMatrix.getInstance().hasDelete('1', [1])).toBeFalsy();

    expect(TGAccessMatrix.getInstance().hasRead('0', [0])).toBeFalsy();
    expect(TGAccessMatrix.getInstance().hasUpdate('0', [0])).toBeFalsy();
    expect(TGAccessMatrix.getInstance().hasDelete('0', [0])).toBeFalsy();
    expect(TGAccessMatrix.getInstance().hasCreate('0', [0])).toBeFalsy();
  });

  it('CRUD check for multiple roles', () => {
    TGAccessMatrix.getInstance().add(createMatrix('1', 1, true, true, false, false));
    TGAccessMatrix.getInstance().add(createMatrix('1', 2, true, false, true, false));
    expect(TGAccessMatrix.getInstance().hasCreate('1', [1, 2])).toBeTruthy();
    expect(TGAccessMatrix.getInstance().hasRead('1', [1, 2])).toBeTruthy();
    expect(TGAccessMatrix.getInstance().hasUpdate('1', [1, 2])).toBeTruthy();
    expect(TGAccessMatrix.getInstance().hasDelete('1', [1, 2])).toBeFalsy();
  });

  it('remove', () => {
    TGAccessMatrix.getInstance().add(createMatrix('1', 1, true, true, false, false));
    expect(TGAccessMatrix.getInstance().size()).toEqual(1);
    TGAccessMatrix.getInstance().remove('1', 0);
    expect(TGAccessMatrix.getInstance().size()).toEqual(1);
    TGAccessMatrix.getInstance().remove('0', 1);
    expect(TGAccessMatrix.getInstance().size()).toEqual(1);
    TGAccessMatrix.getInstance().remove('1', 1);
    expect(TGAccessMatrix.getInstance().size()).toEqual(0);
  });

  it('invalidate', () => {
    expect(TGAccessMatrix.getInstance().size()).toEqual(0);
    TGAccessMatrix.getInstance().add(new TGAccessMatrixVO());
    expect(TGAccessMatrix.getInstance().size()).toEqual(1);
    TGAccessMatrix.getInstance().invalidate();
    expect(TGAccessMatrix.getInstance().size()).toEqual(0);
  });

  it('timestamp', fakeAsync(() => {
    console.log('createdAt = ' + TGAccessMatrix.getInstance().getCreatedAt().toString());
    console.log('validSince = ' + TGAccessMatrix.getInstance().validSince().toString());
    tick(1000);
    console.log('validSince = ' + TGAccessMatrix.getInstance().validSince().toString());
    expect(TGAccessMatrix.getInstance().validSince()).toBeGreaterThanOrEqual(1000);
  }));
});

function createMatrix(key: string, roleId: number, create: boolean, read: boolean, update: boolean, deletee: boolean): TGAccessMatrixVO {
  const tgAccessMatrixVO: TGAccessMatrixVO = new TGAccessMatrixVO();
  tgAccessMatrixVO.key = key;
  tgAccessMatrixVO.roleId = roleId;
  tgAccessMatrixVO.read = read;
  tgAccessMatrixVO.update = update;
  tgAccessMatrixVO.delete = deletee;
  tgAccessMatrixVO.create = create;
  return tgAccessMatrixVO;
}
