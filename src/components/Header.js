import React from "react";
import PropTypes from "prop-types";
// Difference between PropTypes and Typescript is basically that PropTypes validates at runtime while Typescript checks at compile time (static type checking)
// They are not the same thing and both can have their uses - e.g. PropTypes can be useful when getting external data from an API, which can only be received (and checked) at runtime.

const Header = ({tagline}) => (
        <header className="top">
            <h1>Catch
                <span className="ofThe">
                    <span className="of">Of</span>
                    <span className="the">The</span>
                    </span>
                    Day</h1>
            <h3 className="tagline">
                <span>{tagline}</span>
            </h3>
        </header>
    );

Header.propTypes = {
    tagline: PropTypes.string.isRequired,
}

export default Header;
