import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../assets/logo.svg';
import logoUfsc from '../assets/logoUfsc.png'
import camera from '../assets/camera.svg';

export default function Header() {
    return (
        <header id="main-header">
            <div className="header-content">
                {/* <Link to="/"> */}
                <img id="logoUfsc" src={logoUfsc} alt="InstaRocket" />
                <p id="titulo">SISTEMA DE GERENCIAMENTO UFSC - CAMPUS ARARANGUÁ</p>
                {/* </Link> */}
                {/* <Link to="/new">
                <img src={camera} alt="Enviar publicação" />
                </Link> */}
            </div>
        </header>
    );
}
