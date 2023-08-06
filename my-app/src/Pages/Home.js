import JsIde from "../Components/Ide"
import '../styles/Home.css'
import Gpt from "../Components/Gpt"
export default function Home() {
    return (
        <>
            <div className="homeContainer">
                <JsIde></JsIde>
                <Gpt></Gpt>
            </div>
        </>
    )
}
