import "./css/HeadingTextBlock.css";

const HeadingTextBlock = ({heading, text}) => {
    return (
        <div>
            <h3>{heading}</h3>
            <p className="block-text">{text}</p>
        </div>
    );
}

export default HeadingTextBlock;