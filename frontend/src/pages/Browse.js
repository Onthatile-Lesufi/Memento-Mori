import { useEffect, useState } from "react";
import BrowseCard from "../components/BrowseCard";
import { Link, useParams } from "react-router-dom";
import "./css/Browse.css";
import { Container, Row, Col } from "react-bootstrap";
import LinkCard from "../components/LinkCard";
import axios from "axios";

const Browse = () => {
    const PageFocus = Object.freeze({
        GRAVE: "grave",
        GRAVEYARD: "graveyard",
        NONE: "none"
    });

    const [ graves, setGraves ] = useState([]);
    const [ graveyards, setGraveyards ] = useState([]);
    const [ gravesCards, setGravesCards ] = useState([]);
    const [ graveyardsCards, setGraveyardsCards ] = useState([]);
    const { browseQuery } = useParams();
    const [ pageFocus, setPageFocus ] = useState(PageFocus.NONE);

    function ShowAllGraves () {
        setPageFocus(PageFocus.GRAVE);
    }

    function ShowAllGraveyards () {
        setPageFocus(PageFocus.GRAVEYARD);
    }

    async function GetDefaultCards() {
        if (!browseQuery) return;
        let _graveCards = [];
        let _graveyardCards = [];
        try {
            const _gravesRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/name=${browseQuery}`);
            const _graveyardsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/name=${browseQuery}`);
            
            let _graves = _gravesRes.data;
            if (_graves.length > 10) {
                let _length = _graves.length - 10;
                _graves.slice(10,_length);
            }

            let _n = 0;
            _graves.forEach(_i => {
                _graveCards.push(<LinkCard name={_i.grave_name} link={`/grave/${_i.id_number}`} image={_i.grave_image}/>);
                if (_n === 9) {
                    setGravesCards(_graveCards);
                }
                _n++;
            });
            
            setGraves(_graveCards);

            let _graveyards = _graveyardsRes.data;
            if (_graveyards.length > 10) {
                let _length = _graveyards.length - 10;
                _graveyards.slice(10,_length);
            }
            _n = 0;
            _graveyards.forEach(_i => {
                _graveyardCards.push(<LinkCard name={_i.graveyard_name} link={`/graveyard/${_i.graveyard_id}`}/>);
                if (_n === 9) {
                    setGraveyardsCards(_graveyardCards);
                }
                _n++;
            });
            setGraveyards(_graveyardCards);
        } catch (error) {
            console.error("error:", error);
        }
    }

    useEffect(() => {
        setPageFocus(PageFocus.NONE);
        GetDefaultCards();
    },[])

    return (
        <div className="browse-container">
            <h2 id="result-title">Search results for: {browseQuery ? browseQuery : null}</h2>
            {pageFocus !== PageFocus.GRAVEYARD ? 
                <>
                    <h3 className="browse-heading">Graves {pageFocus !== PageFocus.GRAVE ? <p className="browse-view-all" onClick={ShowAllGraves}>View All{'>>'}</p> : null}</h3>
                    <div className={pageFocus !== PageFocus.GRAVE ? "browse-link-card-row" : "browse-link-card-grid"}>
                        {pageFocus === PageFocus.GRAVE ? graves : gravesCards}
                    </div>
                </>
            : 
                null
            }
            {pageFocus !== PageFocus.GRAVE ? 
                <>
                    <h3 className="browse-heading">Graveyards {pageFocus !== PageFocus.GRAVEYARD ? <p className="browse-view-all" onClick={ShowAllGraveyards}>View All{'>>'}</p> : null}</h3>
                    <div className={pageFocus !== PageFocus.GRAVEYARD ? "browse-link-card-row" : "browse-link-card-grid"}>
                        {pageFocus === PageFocus.GRAVEYARD ? graveyards : graveyardsCards}
                    </div>
                </>
            : 
                null
            }
        </div>
    )
}

export default Browse;