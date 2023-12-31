import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bd-footer py-4 py-md-5 mt-5 " style={{backgroundColor: '#032440'}}>
      <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <Link
              className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
              to="/"
              aria-label="Bootstrap"
            >
              <span className="fs-5 text-light">Bootstrap</span>
            </Link>
            <ul className="list-unstyled small">
              <li className="mb-2 text-light">
                Designed and built by Yash Khatpe
              </li>
              <li className="mb-2 text-light">
                Code uploaded on my github 
                <Link
                  to="https://github.com/YashKhatpe/YIMDb/tree/main"
                  target="_blank"
                >
                  <i className="fa-brands fa-github mx-2"></i>
                </Link>
                .
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 offset-lg-1 mb-3">
            <h5 className="text-light">Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/popular">Popular</Link>
              </li>
              <li className="mb-2">
                <Link to="/top_rated">Top Rated</Link>
              </li>
              <li className="mb-2">
                <Link to="/upcoming">Upcoming</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="text-light">Guides</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/docs/5.3/getting-started/">Getting started</Link>
              </li>
              <li className="mb-2">
                <Link to="/docs/5.3/examples/starter-template/">
                  Starter template
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/docs/5.3/getting-started/webpack/">Webpack</Link>
              </li>
              <li className="mb-2">
                <Link to="/docs/5.3/getting-started/parcel/">Parcel</Link>
              </li>
              <li className="mb-2">
                <Link to="/docs/5.3/getting-started/vite/">Vite</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="text-light">Projects</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/bootstrap"
                  target="_blank"
                  rel="noopener"
                >
                  Bootstrap 5
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/bootstrap/tree/v4-dev"
                  target="_blank"
                  rel="noopener"
                >
                  Bootstrap 4
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/icons"
                  target="_blank"
                  rel="noopener"
                >
                  Icons
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/rfs"
                  target="_blank"
                  rel="noopener"
                >
                  RFS
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/examples/"
                  target="_blank"
                  rel="noopener"
                >
                  Examples repo
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="text-light">Community</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/bootstrap/issues"
                  target="_blank"
                  rel="noopener"
                >
                  Issues
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/twbs/bootstrap/discussions"
                  target="_blank"
                  rel="noopener"
                >
                  Discussions
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://github.com/sponsors/twbs"
                  target="_blank"
                  rel="noopener"
                >
                  Corporate sponsors
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://opencollective.com/bootstrap"
                  target="_blank"
                  rel="noopener"
                >
                  Open Collective
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://stackoverflow.com/questions/tagged/bootstrap-5"
                  target="_blank"
                  rel="noopener"
                >
                  Stack Overflow
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
