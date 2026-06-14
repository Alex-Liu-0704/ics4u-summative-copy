import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from "@/views";
import { SummaryView } from "./views/movies/SummaryView";
import { ProtectedRoutes } from "./views/ProtectedRoutes";
import { FavoritesView } from "./views/user/FavoritesView";
import { SettingsView } from "./views/user/SettingsView";
import { SignInView } from "./views/user/SignInView";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<SignInView />} path="/sign-in" />
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route element={<MoviesView />} path="/movies/category/:category" />
          <Route element={<TelevisionView />} path="/tv/category/:category" />
          <Route element={<TrendingView />} path="/trending/:category" />
          <Route element={<GenreView />} path="/genre/:category/:genre" />
          <Route element={<SearchView />} path="/search" />
          <Route element={<MovieView />} path="/:category/:id">
            <Route element={<SummaryView />} path="summary" />
            <Route element={<SeasonsView />} path="seasons" />
            <Route element={<EpisodeView />} path="season/:season" />
            <Route element={<CreditsView />} path="credits" />
            <Route element={<TrailersView />} path="trailers" />
            <Route element={<ReviewsView />} path="reviews" />
          </Route>
          <Route element={<PersonView />} path="/person/:id">
            <Route element={<CareerView />} path="career" />
            <Route element={<ImagesView />} path="images" />
          </Route>
          <Route element={<FavoritesView />} path="/favorites" />
          <Route element={<CartView />} path="/cart" />
          <Route element={<SettingsView />} path="/settings" />
        </Route>
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
