import "./css/GraveInfoDisplayPanel.css";

const GraveInfoDisplayPanel = ({label, info}) => {
    return(
        <div className="grave-info-panel">
            <p className="grave-info-heading"><b>{label}</b><br/>{info}</p>
        </div>
    )
}

export default GraveInfoDisplayPanel;