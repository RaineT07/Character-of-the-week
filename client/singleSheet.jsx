const helper = require('./helper.js');
const React = require('react');
const {useState,useEffect} = React;
const {createRoot} = require('react-dom/client');
const {useParams} = require('react-router-dom');

let character_id = '';

const handleRatings = (e) =>{
    e.preventDefault();
    helper.hideError();
    const ratings = e.target.querySelectorAll('.ratingClass');
    let ratingValues = [];
    for(let i=0; i<5;i++){
        console.log(ratings[i].value)
        if(ratings[i].value==''){ratingValues.push('0');}
        else{ ratingValues.push(ratings[i].value);}
    }
    helper.sendPost(e.target.action, {ratingValues, character_id});
}

const CharSheet = (props) =>{
    const [char, setChar] = useState(props.char);
    const [reloadChar, setReloadChar] = useState(props.reloadChar);

    useEffect(()=>{
        const loadCharFromServer = async () =>{
            // console.log(character_id);
            const response = await fetch('/getCharacter',
            {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({character_id}),
            });
            const data = await response.json();
            console.log(data.char[0]);
            setChar(data.char[0]);
        };
        loadCharFromServer();
    }, [props.reloadChar]);
    console.log('ratings:');
    console.log(char.ratings);

    let displayedRatings = [];
    if(char.ratings==undefined){
        displayedRatings=['0','0','0','0','0'];
    }else{
        displayedRatings=char.ratings;
    }

    return(
        <div id='singleChar'>
            <div id='col1'>
                <h3>Character name: {char.name}</h3>
                <h3>Playbook: {char.playbook}</h3>
                <h3>Ratings:</h3>
                <form id='ratingForm'
                onSubmit={(e)=>handleRatings(e, props.triggerReload)}
                action='/updateChar'
                method='POST'
                className='ratingForm'
                >
                <div class='singleRating'>
                    <label htmlFor='charmRating' >Charm:</label>
                    <input id='charmRating' class='ratingClass' type='text' name='Charm' placeholder={displayedRatings[0]}/>
                </div>
                <div class='singleRating'>
                    <label htmlFor='coolRating'>Cool:</label>
                    <input id='coolRating' class='ratingClass' type='text' name='Cool' placeholder={displayedRatings[0]}/>
                </div>
                <div class='singleRating'>
                    <label htmlFor='sharpRating'>Sharp:</label>
                    <input id='sharpRating' class='ratingClass' type='text' name='Sharp' placeholder={displayedRatings[2]}/>
                </div>
                <div class='singleRating'>
                    <label htmlFor='toughRating'>Tough:</label>
                    <input id='toughRating' class='ratingClass' type='text' name='Tough' placeholder={displayedRatings[3]}/>
                </div>
                <div class='singleRating'>
                    <label htmlFor='weirdRating'>Weird:</label>
                    <input id='weirdRating' class='ratingClass' type='text' name='Weird' placeholder={displayedRatings[4]}/>
                </div>
                <input className='updateRatings' type='submit' value='Update ratings'/>
                </form>
            </div>
            <div id='col2'>
                <h3>Description: {char.description}</h3>
            </div>
        </div>
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
    const [reloadChar, setReloadChar] = useState(false);
    const [reloadMoves, setReloadMoves] = useState(false);
    const [reloadImage, setReloadImage] = useState(false);
    // const params = useParams();
    return (
        <div>
            <div id='fullCharacter'>
                <CharSheet char = {[]} reloadChar={reloadChar}/>
            </div>
            <div id='characterImage'>
                <div id='imgForm'>
                    {/* <ImageForm triggerReload={() => setReloadImage(!reloadImage)}/> */}
                </div>
                <div id='image'>
                    {/* <ImageNode image = {[]} reloadImage={reloadImage}/> */}
                </div>
            </div>
            <div id='moveForm'>
                {/* <MoveForm triggerReload={() => setReloadMoves(!reloadMoves)}/> */}
            </div>
            <div id='Moves'>
                {/* <MoveList moves = {[]} reloadMoves={reloadMoves}/> */}
            </div>
        </div>
    );
};

const init = async () =>{

    console.log(window.location.href);
    let charStringIndex = window.location.href.lastIndexOf('Sheet/') + 6;
    let charString = window.location.href.substring(charStringIndex, window.location.href.length);
    character_id = charString;
    console.log('storage bundle reached');
    const root = createRoot(document.getElementById('sheetApp'));
    root.render(<App/>);
}

window.onload = init;