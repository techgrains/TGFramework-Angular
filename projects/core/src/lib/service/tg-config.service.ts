import { Injectable } from '@angular/core';

@Injectable()
export class TGConfig {
    public baseAPI = '';
    public errorClass;
    public applyMock = false;
    public mockMapping = [];
}
