export default function Output({srcDoc}) {
    return (
        <iframe
            sandbox="allow-scripts"
            width="100%"
            height="250px"
            srcDoc={srcDoc}
            title="output"
        />
    );
}