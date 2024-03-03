declare global {
    interface Window {
       user: {
         accessToken: string,
         ip: string,
         country,
       }
    }
 }