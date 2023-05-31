import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Main from "./pages/Main";
import Motivation from "./pages/Motivation";
import Result from "./pages/Result";
import Check from "./pages/Check";
import CovidPrevention from "./pages/CovidPrevention";
import CovidAdvice from "./pages/CovidAdvice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path='/motivation' element={<Motivation />} />
      <Route path='/test' element={<Check />} />
      <Route path='/result' element={<Result />} />
      <Route path='/covid-prevention' element={<CovidPrevention />} />
      <Route path='/covid-advice' element={<CovidAdvice />} />
    </Route>
  )
);


function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;