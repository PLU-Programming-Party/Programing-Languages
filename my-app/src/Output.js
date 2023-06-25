export default function Output({srcDoc}) {
    return (
        <div className="output">
            <iframe
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            title="output"
            />
        </div>
        
    );
}