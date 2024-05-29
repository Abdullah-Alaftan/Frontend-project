import React from 'react';

export default function Footer() {
  return (

    <footer  id="Footer" className="footer footer-center p-10 bg-white text-primary-content ">
    <aside>
      <img
        src="/LOGO2.png"
        alt="Company Logo"
        width="200"
        height="200"
        className="inline-block"
      />
      <p className="font-bold">
        FOOTWEAR <br />
        Elevate every step.
      </p>
      <p>Copyright © 2024 - All right reserved</p>
    </aside>
    <nav className="flex justify-center">
      <div className="grid grid-flow-col gap-4">
        <a href="https://github.com/Abdullah-Alaftan" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.204.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.606-2.665-.305-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.237-3.221-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.047.137 3.004.403 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.806 5.624-5.478 5.921.43.371.815 1.104.815 2.227 0 1.607-.015 2.903-.015 3.293 0 .319.217.694.825.576C20.565 21.797 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/abdullah-alaftan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M4.983 3.998c0 1.379-1.11 2.5-2.484 2.5C1.12 6.498.01 5.377.01 3.998 0 2.618 1.118 1.5 2.498 1.5c1.373 0 2.484 1.12 2.484 2.498zM.101 24h4.396V7.979H.101V24zM8.1 7.979v16.02H12.5V15.35c0-2.284 1.717-2.762 1.761-2.762.978-.004 2.239.576 2.239 2.76v8.672H20.6V15.124c0-3.748-2.033-5.486-4.743-5.486-2.035 0-3.047 1.137-3.586 1.948V7.979H8.1z" />
          </svg>
        </a>
      </div>
    </nav>
  </footer>
  );
}