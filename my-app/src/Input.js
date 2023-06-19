import {useState} from 'react'
export default function Input() {
    const [text, setText] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div className="input">
            <textarea value={text} onChange={handleChange} />
            <p>You typed: {text}</p>
            <button onClick={() => setText('')}>
                Reset
            </button>
        </div>
    );
}