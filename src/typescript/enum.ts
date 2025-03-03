export enum APP_ROUTES {
  HOME = "/",
  ABOUT = "/about",
  REVIEWS = "/reviews",
  SIGN_IN = "/sign-in",
  DASHBOARD_TRAVEL_QUIZ = "/dashboard/travel-quiz",
  PLAN_JOURNEY = "/dashboard/plan-journey",
  FAVORITES = "/dashboard/favorites",
  FAVORITE_DETAIL = "/dashboard/favorite-detail",
  ACCOUNT = "/dashboard/account",
  QUIZ_STEP_1 = "/dashboard/travel-quiz/process/step-1",
  QUIZ_STEP_2 = "/dashboard/travel-quiz/process/step-2",
  QUIZ_STEP_3 = "/dashboard/travel-quiz/process/step-3",
  QUIZ_COMPLETED = "/dashboard/travel-quiz/process/completed",
  REVIEW_TRIP = "/dashboard/review-trip",
  REVIEW_MAP_WITH_AI = "/dashboard/review-map-with-ai",
  SETTINGS = "/dashboard/settings",
}

export enum FIREBASE_COLLECTION {
  USERS = "users",
  TRIPS = "trips",
  QUIZ = "quiz",
  FAV_RESTAURANTS = "favouriteRestaurants",
}

export enum BACKEND_ROUTES {
  UPDATE_USER = "http://localhost:3005/api/auth/update-user-details",
}
// https://travel-ai-backend.onrender.com
