const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleSheet = (e, onSheetAdded) =>{
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#CharName').value;
    const playbookOptions = e.target.querySelector('#defaultPlaybooks').value;
    const description = e.target.querySelector("#CharDescription").value;
    
    let playbook = '';

    if(playbookOptions=='Custom Playbook'){
        playbook = e.target.querySelector('#CustomPlaybook').value;
    }else{
        playbook = playbookOptions;
    }


    if(!name || !description || !playbook){
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
            <select name='playbooks' id='defaultPlaybooks' form='sheetForm' onChange={(e) =>
            {
                if(e.target.value=='Custom Playbook'){
                    document.querySelector('#CustomPlaybook').style.display = 'inline';

                }else{
                    document.querySelector('#CustomPlaybook').style.display = 'none';
                }
            }}>
                <option value="The Chosen">The Chosen</option>
                <option value="The Crooked">The Crooked</option>
                <option value="The Divine">The Divine</option>
                <option value="The Expert">The Expert</option>
                <option value="The Flake">The Flake</option>
                <option value="The Initiate">The Initiate</option>
                <option value="The Monstrous">The Monstrous</option>
                <option value="The Mundane">The Mundane</option>
                <option value="The Professional">The Professional</option>
                <option value="The spell-slinger">The Spell-Slinger</option>
                <option value="The spooky">The Spooky</option>
                <option value="The wronged">The Wronged</option>
                <option value="Custom Playbook">Custom</option>
            </select>
            <input id='CustomPlaybook' type='text' name='playbook' style={{display: 'none'}} placeholder='Character Playbook'/>
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