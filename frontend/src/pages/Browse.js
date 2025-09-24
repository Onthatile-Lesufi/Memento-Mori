import { useEffect, useState } from "react";
import BrowseCard from "../components/BrowseCard";
import { useParams } from "react-router-dom";
import "./css/Browse.css";
import { Container, Row, Col } from "react-bootstrap";

const Browse = () => {
    const [ graves, setGraves ] = useState([]);
    const [ graveyards, setGraveyards ] = useState([]);
    const { browseQuery } = useParams();

    function GetLocation () {
        // const successCallback = (position) => {
        //   console.log(position);
        // };
        // 
        // const errorCallback = (error) => {
        //   console.log(error);
        // };
        // 
        // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    useEffect(() => {
        GetLocation();
    },[])

    return (
        <Container className="browse-container">
            <h2 id="result-title">Search results for: {browseQuery}</h2>
            <h3 className="browse-heading">Graves</h3>
            <Row></Row>
            <h3 className="browse-heading">Graveyards</h3>
            <Row></Row>
        </Container>
    )
}

export default Browse;