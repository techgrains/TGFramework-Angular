import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TGError } from './model';
import { TGConfig, TGHttpClient, TGLoaderService } from './service';


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
