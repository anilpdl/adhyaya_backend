const BASE_URL = "https://bec23d0b.ngrok.io";
const FACEBOOK_CALLBACK_URL = `${BASE_URL}/auth/facebook/callback`;
const GOOGLE_CALLBACK_URL = `${BASE_URL}/auth/google/callback`;
// const TWITTER_CALLBACK_URL = `${BASE_URL}/auth/twitter/callback`;
const TWITTER_CALLBACK_URL = "http://127.0.0.1:3000/auth/twitter/callback"

export const facebook = {
  clientID: "2135349786709852",
  clientSecret: "836097349afbd31c9fc1168142be7631",
  callbackURL: FACEBOOK_CALLBACK_URL,
  profileFields: ["id", "name", "displayName", "picture", "email"]
};

export const google = {
  clientID: "1045886850347-v5905vrrnq5ilj54da9h2abjuicc07kc.apps.googleusercontent.com",
  clientSecret: "n8tBGd3VkJKQwDea3b8DF4Rn",
  callbackURL: GOOGLE_CALLBACK_URL
};

export const twitter = {
  consumerKey: "L8GZND6f22RKniWNtIibrQHLa",
  consumerSecret: "SAB5rBEiHi2wbmDJPSA8WiQvHLEijnBhr67EXv1cNgl1qKm1My",
  callbackURL: TWITTER_CALLBACK_URL,
};
