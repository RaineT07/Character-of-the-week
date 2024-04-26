const helper = require('./helper.js');
const React = require('react');
const {useState,useEffect} = React;
const {createRoot} = require('react-dom/client');

const CharSheet = (props) =>{
    return(
        <h3>welcome to the sheet.</h3>
    );
}

const imageNode = (props) =>{
    const [image, setImage] = useState(props.image);
    useEffect(()=>{
        const loadImageFromServer = async () =>{
            const response = await fetch('/retrieve');
        }
    })
}

const ImageForm = (props) =>{
    return(
        <form id='imageForm'
            onSubmit={()=>handleImage(e,props.triggerReload)}
            name='imageForm'
            action='/upload'
            method='POST'
            className='imageForm'
        >

        </form>
    )
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
    const [reloadMoves, setReloadMoves] = useState(false);
    const [reloadImage, setReloadImage] = useState(false);
    return (
        <div>
            <div id='fullCharacter'>
                <CharSheet/>
            </div>
            <div id='characterImage'>
                <div id='imgForm'>
                    <ImageForm triggerReload={() => setReloadImage(!reloadImage)}/>
                </div>
                <div id='image'>
                    <ImageNode image = {[]} reloadImage={reloadImage}/>
                </div>
            </div>
            <div id='moveForm'>
                <MoveForm triggerReload={() => setReloadMoves(!reloadMoves)}/>
            </div>
            <div id='Moves'>
                <MoveList moves = {[]} reloadMoves={reloadMoves}/>
            </div>
        </div>
    );
};

const init = () =>{
    const root = createRoot(document.getElementById('sheetApp'));
    root.render(<App/>);
}

window.onload = init;