import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, NotFound, Projects } from "./views";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
