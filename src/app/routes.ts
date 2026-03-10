import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Certifications } from "./components/Certifications";
import Experiences from "./components/Experiences";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/projects",
    Component: Projects,
  },
  {
    path: "/skills",
    Component: Skills,
  },
  {
    path: "/certifications",
    Component: Certifications,
  },
  {
    path: "/experiences",
    Component: Experiences,
  },
]);