const Tabs = ({setView}) => (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
            <a className="navbar-brand" href="#">Upstox</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setView('overview')}>Overview</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setView('liveview')}>Live View</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Tabs;