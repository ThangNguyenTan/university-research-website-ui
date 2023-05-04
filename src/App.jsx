import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from './components';

// Pages
import {
  HomePage,
  AboutPage,
  ContactPage,
  JoinUsPage,
  NewsPage,
  PublicationsPage,
  PeoplePage,
  ContentSinglePage,
  LoginPage,
  ArticlesListPage,
  ArticlesCreatePage,
  ArticlesUpdatePage,
  PeopleListPage,
  PeopleCreatePage,
  PeopleUpdatePage,
  LogoutPage,
  PeopleSinglePage,
  JobListPage,
} from './pages';
import RequireAuth from './components/RequireAuth/RequireAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="App">
        <Router>
          <ScrollToTop />

          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join-us" element={<JoinUsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/content/:title" element={<ContentSinglePage />} />
            <Route path="/team/:name" element={<PeopleSinglePage />} />

            <Route element={<RequireAuth />}>
              <Route path="/logout" element={<LogoutPage />} />

              <Route path="/manage/articles" exact element={<ArticlesListPage />} />
              <Route path="/manage/articles/create" exact element={<ArticlesCreatePage />} />
              <Route path="/manage/articles/edit/:title" exact element={<ArticlesUpdatePage />} />

              <Route path="/manage/people" exact element={<PeopleListPage />} />
              <Route path="/manage/people/create" exact element={<PeopleCreatePage />} />
              <Route path="/manage/people/edit/:name" exact element={<PeopleUpdatePage />} />

              <Route path="/manage/jobs" exact element={<JobListPage />} />
            </Route>

            <Route path="*" element={<></>} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
