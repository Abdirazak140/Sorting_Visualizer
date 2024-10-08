import { useState } from "react"
import Bar from "../../components/bar"

export default function BubbleSort() {
    const [newSampleSize, setNewSampleSize] = useState(100)
    const [currentSampleSize, setCurrentSampleSize] = useState(100)
    const [samples, setSamples] = useState(Array.from(Array(100).keys()).map((value) => value + 1))
    const [isSorting, setIsSorting] = useState(false);
    const [stack, setStack] = useState([])

    function generateSamples() {
        const samples = Array.from(Array(newSampleSize).keys()).map((value) => value + 1)
        setCurrentSampleSize(newSampleSize)
        setSamples(samples)
    }

    function handleSampleSizeChange(e) {
        setNewSampleSize(Number(e.target.value))
    }

    function shuffle() {
        const shuffledSample = [...samples].sort((a, b) => 0.5 - Math.random())
        setSamples(shuffledSample)
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function bubbleSort(array = samples) {
        let swapped;
        let sortedArray = [...array];

        do {
            swapped = false;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    setSamples([...array]); 
                    await sleep(10); 
                }
            }
        } while (swapped);
      
        return array;
      };

    async function start() {
        setIsSorting(true);
        const sortedArray = await bubbleSort();
        setSamples(sortedArray);
        setIsSorting(false);
    }

    return (
        <div className="w-screen h-screen pt-10 flex flex-col bg-davy-gray">
            <div className='ml-10 text-snow text-4xl flex flex-row items-center'>
                <span>Bubble Sort</span>
            </div>
            <div id="root" className="pl-2 pr-6 bg-davy-gray w-full h-100 mt-6 flex flex-row items-end ">
                {samples.map((value, index) => (
                    <Bar height={(value / currentSampleSize) * 100} />
                ))}
            </div>
            <div className="ml-10 mt-4 mb-20 flex flex-row space-x-4">
                <div className={isSorting ? 'hidden' : ''}>     
                    <div className="flex flex-row space-x-4">
                        <input type="number" id="samples" name="samples" value={newSampleSize} onChange={handleSampleSizeChange} />
                        <button className={`options text-center `} onClick={generateSamples}>Generate</button>
                        <button className={`options text-center`} onClick={shuffle}>Shuffle</button>
                        <button id="play-btn" className={`options text-center`} onClick={start}>start</button>
                    </div>
                </div>
                <div className={isSorting ? '' : 'hidden'}>
                    <div className="space-x-4">
                        <button id="stop-btn" className={`options text-center`}>Pause</button>
                        <button id="reset-btn" className={`options text-center`}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}