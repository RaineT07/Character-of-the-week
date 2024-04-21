const helper = require('./helper.js');
const React = require('react');
const {useState,useEffect} = React;
const {createRoot} = require('react-dom/client');

const CharForm = (props) =>{
    return(
        <h3>welcome to the sheet.</h3>
    );
}

const App = () =>{
    return (
        <div>
            <CharForm></CharForm>
        </div>
    );
};

const init = () =>{
    const root = createRoot(document.getElementById('app'));
    root.render(<App/>);
}

window.onload = init;