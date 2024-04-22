const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleSheet = (e, onSheetAdded) =>{
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#CharName').value;
    const playbook = e.target.querySelector('#CharPlaybook').value;
    const description = e.target.querySelector("#CharDescription").value;

    if(!name || !playbook || !description){
        helper.handleError('All fields required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, playbook, description}, onSheetAdded);
    return false;
};

const handleChar = (e) =>{
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#CharName').value;
    const playbook = e.target.querySelector('#CharPlaybook').value;
    const description = e.target.querySelector("#CharDescription").value;

    
}

const SheetForm = (props) =>{
    return (
        <form id='sheetForm'
            onSubmit={(e)=>handleSheet(e, props.triggerReload)}
            name='sheetForm'
            action='/makeSheet'
            method='POST'
            className='sheetForm'
        >
            <label htmlFor='name'>Name: </label>
            <input id='CharName' type='text' name='name' placeholder='Character Name'/>
            <label htmlFor='playbook'>Playbook: </label>
            <input id='CharPlaybook' type='text' name='playbook' placeholder='Character Playbook'/>
            <label htmlFor='description'>Description: </label>
            <input id='CharDescription' type='text' name='description' placeholder='Character Description'/>
            <input className='makeCharSubmit' type='submit' value='Make Character'/>
        </form>
    );
};

const CharList = (props) =>{
    const [chars, setChars] = useState(props.chars);
    useEffect(()=>{
        const loadSheetsFromServer = async () =>{
            const response = await fetch('/getSheets');
            const data = await response.json();
            // console.log(data);
            setChars(data.sheets);
        };
        loadSheetsFromServer();
    }, [props.reloadChars]);

    if(chars.length === 0){
        return (
            <div className='sheetList'>
                <h3 className='emptyChar'>No Characters yet.</h3>
            </div>
        );
    }

    const characterNodes = chars.map(char =>{
        return(
            <form id='charForm'
                onSubmit= {(e)=>handleChar(e)}
                name='charForm'
                action='/sheetList'
                method='POST'
                className='charForm'
            >
                <div key={char.id} className='char'>
                    <h3 id='charName' className='charName'>Name: {char.name}</h3>
                    <h3 id='charPlaybook' className='charPlaybook'>Playbook: {char.playbook}</h3>
                    <h3 id='charDescription' className='charDescription'>Description: {char.description}</h3>
                    <input id='charFull' type='submit' value='Show Full Character Sheet'/>
                </div>
            </form>
        );
    });

    return (
        <div className='charList'>
            {characterNodes}
        </div>
    );
};

const App = () =>{
    const [reloadChars, setReloadChars] = useState(false);

    return (
        <div>
            <div id='makeChar'>
                <SheetForm triggerReload={() => setReloadChars(!reloadChars)}/>
            </div>
            <div id='Chars'>
                <CharList chars = {[]} reloadChars={reloadChars}/>
            </div>
        </div>
    );
};

const init = () =>{
    //this sounds backwards because this is the sheet.jsx package but it handles the storage page (poor planning)
    const root = createRoot(document.getElementById('storageApp'));
    root.render(<App/>);
}

window.onload = init;