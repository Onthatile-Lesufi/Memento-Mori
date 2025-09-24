import "./css/HeadingTextBlock.css";

const HeadingTextBlock = ({heading, text}) => {
    return (
        <div>
            <h3>{heading}</h3>
            <pre className="block-text">{text}</pre>
        </div>
    );
}

export default HeadingTextBlock;