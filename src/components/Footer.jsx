import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer>
        <div className="info">
            <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 000800 040 1966</p>
            <img src="/logo.svg" alt="" />
        </div>
        <hr />
        <div className="links">
            <p>
                Copyrights &copy; 2024 Apple Inc. All rights reserved. Website made by Ayoub Igoulalene <br />
            </p>
            <ul>
                {footerLinks.map(({ name, link }) => (
                    <li key={name}>
                        <a href={link}>{name}</a>
                    </li>
                ))}
            </ul>
        </div>
    </footer>
  )
}

export default Footer