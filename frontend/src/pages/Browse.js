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
    const { browseQuery } = useParams();
    const [ pageFocus, setPageFocus ] = useState(PageFocus.NONE);

    function ShowAllGraves () {
        setPageFocus(PageFocus.GRAVE);
    }

    function ShowAllGraveyards () {
        setPageFocus(PageFocus.GRAVEYARD);
    }

    async function GetDefaultCards() {
        let _graveCards = [];
        let _graveyardCards = [];
        try {
            const _gravesRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graves/name=${browseQuery}`);
            const _graveyardsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/graveyards/name=${browseQuery}`);
            console.log(_gravesRes);
            console.log(_graveyardsRes);
            let _graves = _gravesRes.data;
            if (_graves.length > 10) {
                let _length = _graves.length - 10;
                _graves.slice(10,_length);
            }
            _graves.forEach(_i => {
                _graveCards.push(<LinkCard name={_i.grave_name} link={`/grave/${_i.id_number}`} image={_i.grave_image}/>);
            });
            setGraves(_graveCards);

            let _graveyards = _graveyardsRes.data;
            if (_graveyards.length > 10) {
                let _length = _graveyards.length - 10;
                _graveyards.slice(10,_length);
            }
            _graveyards.forEach(_i => {
                _graveyardCards.push(<LinkCard name={_i.graveyard_name} link={`/graveyard/${_i.graveyard_id}`}/>);
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
            <h2 id="result-title">Search results for: {browseQuery}</h2>
            {pageFocus !== PageFocus.GRAVEYARD ? 
                <>
                    <h3 className="browse-heading">Graves {pageFocus !== PageFocus.GRAVE ? <p className="browse-view-all" onClick={ShowAllGraves}>View All{'>>'}</p> : null}</h3>
                    <div className={pageFocus !== PageFocus.GRAVE ? "browse-link-card-row" : "browse-link-card-grid"}>
                        {graves}
                    </div>
                </>
            : 
                null
            }
            {pageFocus !== PageFocus.GRAVE ? 
                <>
                    <h3 className="browse-heading">Graveyards {pageFocus !== PageFocus.GRAVEYARD ? <p className="browse-view-all" onClick={ShowAllGraveyards}>View All{'>>'}</p> : null}</h3>
                    <div className={pageFocus !== PageFocus.GRAVEYARD ? "browse-link-card-row" : "browse-link-card-grid"}>
                        {graveyards}
                    </div>
                </>
            : 
                null
            }
        </div>
    )
}

export default Browse;