import { useState } from "react"
import ReactDOM from "react-dom"

export default function MergeSort() {
    const [sampleSize, setSampleSize] = useState(100)
    const [samples, setSamples] = useState(null)

    function generateSamples(){
        console.log("Size:", sampleSize)

        const samples = Array.from({length: sampleSize}, () => Math.floor(Math.random() * sampleSize))
        setSamples(samples)
        
        console.log(samples)
    }

    function handleSampleSizeChange(event) {
        setSampleSize(Number(event.target.value))
    }

    return (
        <div className="w-screen h-screen pt-10 px-20 flex flex-col bg-davy-gray">
            <div className='text-snow text-4xl flex flex-row items-center'>
                <span>Merge Sort</span>
            </div>
            <div id="root" className="bg-snow w-6/8 h-100 mt-6">

            </div>
            <div className="flex flex-row mt-4 space-x-4 mb-20">
                <input type="number" id="samples" name="samples" min={1} max={1000} value={sampleSize} onChange={handleSampleSizeChange}/>
                <button className='options text-center' onClick={generateSamples}>Generate</button>
                <button className='options text-center'>Shuffle</button>
            </div>
        </div>
    )
}