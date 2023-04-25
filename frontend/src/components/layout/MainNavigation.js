
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}> Test A Pre-Trained Image Recognition Model</div>
      </Link>
    </header>
  );
}
export default MainNavigation;
