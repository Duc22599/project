import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ArticlesPage } from "./components/page/Articles";
import { Login } from "./components/page/Login";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SlugArticle } from "./components/page/SlugArticle";
import { SignUp } from "./components/page/SignUp";
import { NewArt } from "./components/page/NewArt";
import { ProfileUser } from "./components/page/ProfileUser";
import { Settings } from "./components/page/Settings";
import { EditArt } from "./components/page/EditArt";
import { Private } from "./components/PrivatePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ArticlesPage />,
    children: [
      {
        path: "article/:slug",
        element: <SlugArticle />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "setting",
    element: (
      <Private>
        <Settings />
      </Private>
    ),
  },

  {
    path: "register",
    element: <SignUp />,
  },

  {
    path: "editor",
    element: (
      <Private>
        <NewArt />
      </Private>
    ),
  },

  {
    path: ":username",
    element: <ProfileUser />,
  },

  {
    path: "edit/:slug",
    element: (
      <Private>
        <EditArt />
      </Private>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
  );
}

export default App;
