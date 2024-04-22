const helper = require('./helper.js');
const React = require('react');
const {useState,useEffect} = React;
const {createRoot} = require('react-dom/client');

const CharSheet = (props) =>{
    return(
        <h3>welcome to the sheet.</h3>
    );
}

const MoveForm = (props) =>{
    return(
    <form id='moveForm'
                onSubmit={(e)=>handleMove(e, props.triggerReload)}
                name='moveForm'
                action='/makeMove'
                method='POST'
                className='MoveForm'
            >
                <label htmlFor='name'>Name: </label>
                <input id='MoveName' type='text' name='name' placeholder='Move Name'/>
                <label htmlFor='description'>description: </label>
                <input id='CharDescription' type='text' name='description' placeholder='Move Description'/>
                <input className='makeMoveSubmit' type='submit' value='Make Move'/>
            </form>
    )
};

const App = () =>{
    return (
        <div>
            <div id='fullCharacter'>
                <CharSheet/>
            </div>
            <div id='moveForm'>
                <MoveForm triggerReload={() => setReloadMoves(!reloadMoves)}/>
            </div>
        </div>
    );
};

const init = () =>{
    const root = createRoot(document.getElementById('sheetApp'));
    root.render(<App/>);
}

window.onload = init;