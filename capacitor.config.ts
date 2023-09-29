import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gmail.matejpesl1.companion',
  appName: 'companion',
  webDir: 'out', // Default Next.JS static build output dir.
  /*server: {
    androidScheme: 'http',
    cleartext: true,
    // The LAN URL of your web app (e.g. http://192.168.x.xx:3000)
    // On MAC: ipconfig getifaddr en0
    // On Windows: Run ipconfig in cmd and look for IPv4 Address of your network adapter.
    url: 'http://192.168.137.1:3000'
  }*/
};

export default config;
