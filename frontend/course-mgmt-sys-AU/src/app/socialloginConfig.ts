import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
  
export function getAuthServiceConfigs(): AuthServiceConfig {
    let config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('756912224686-pk07b4bk66ne8l8mohb7ajjma7i1i0cf.apps.googleusercontent.com'),
    }
    ]);
  
    return config;
}
