import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <table><thead><tr>
                        <td className="Link">
                            <Link to="/"> Home </Link>
                        </td>
                        <td className="Link">
                            <Link to="/create"> Create Exercise </Link>
                        </td>
                    </tr></thead></table>
                </nav>
            </header>
        </div>
    );
  }
export default Navigation;