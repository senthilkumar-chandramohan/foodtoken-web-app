declare global {
    interface Window {
       user: {
         accessToken: string,
         ip: string,
         country: string,
         displayName: string,
         email: string,
         photoURL: string
       }
    }
 }