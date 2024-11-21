import Login from "./components/Login";
import Workspace from "./components/workspace/Workspace";

const app = document.querySelector(".app");
const user = JSON.parse(localStorage.getItem("user"));

if (user && user.id) {
  const workspace = new Workspace(app, user);

  workspace.init();
} else {
  const login = new Login(app);

  login.init();
}
