import logo from "./logo.svg";

export const Header = () =>  {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
          Agent Application for Flight Booking
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Flights</a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#">
              <span className="glyphicon glyphicon-user"></span> Vaibhao Falode
            </a>
          </li>
          <li>
            <a href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

