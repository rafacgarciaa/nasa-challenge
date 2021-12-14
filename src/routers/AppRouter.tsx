import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ChallengeScreen } from "../components/screens/challenge";
import { MainScreen } from "../components/screens/main";
import { NotFoundScreen } from "../components/screens/not-found";
import { Header, Footer } from "../components/shared/ui";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/challenge" element={<ChallengeScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}