import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TGLoaderService, TGHttpClient, TGConfig } from './service';
import { TGError } from './model';


@NgModule({ declarations: [],
    exports: [], imports: [FormsModule], providers: [
        TGLoaderService,
        TGHttpClient,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class TGCoreModule {
  static forRoot(config: TGConfig): ModuleWithProviders<TGCoreModule> {
    return {
      ngModule: TGCoreModule,
      providers: [
        { provide: TGConfig, useValue: config },
        { provide: TGError, useClass: config.errorClass },
        TGLoaderService,
        TGHttpClient,
      ]
    };
  }
 }
