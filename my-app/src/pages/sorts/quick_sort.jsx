import { useState } from "react"
import Bar from "../../components/bar"

export default function QuickSort() {
    const [newSampleSize, setNewSampleSize] = useState(100)
    const [currentSampleSize, setCurrentSampleSize] = useState(100)
    const [samples, setSamples] = useState(Array.from(Array(100).keys()).map((value) => value + 1))
    const [isSorting, setIsSorting] = useState(false);

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

    async function quickSort(array = samples) {
        if (array.length <= 1) {
            return array;
        }

        let pivot = array[0];
        let leftArray = [];
        let rightArray = [];

        for (let i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                leftArray.push(array[i]);
            } else {
                rightArray.push(array[i]);
            }

            setSamples([...leftArray, pivot, ...rightArray])
            await sleep(50);
        }

        leftArray =  await quickSort(leftArray)
        rightArray = await quickSort(rightArray)

        return [...leftArray, pivot, ...rightArray];
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function start() {
        setIsSorting(true);
        // const sortedArray = await quickSort(samples);
        await quickSort(samples);
        // setSamples(sortedArray);
        setIsSorting(false);
    }

    return (
        <div className="w-screen h-screen pt-10 flex flex-col bg-davy-gray">
            <div className='ml-10 text-snow text-4xl flex flex-row items-center'>
                <span>Quick Sort</span>
            </div>
            <div id="root" className="pl-2 pr-6 bg-davy-gray w-full h-100 mt-6 flex flex-row items-end ">
                {samples.map((value, index) => (
                    <Bar height={(value / currentSampleSize) * 100} />
                ))}
            </div>
            <div className="ml-10 mt-4 mb-20 flex flex-row space-x-4">
                <div className="flex flex-row space-x-4">
                    <input type="number" id="samples" name="samples" className={isSorting ? 'invisible' : ''} value={newSampleSize} onChange={handleSampleSizeChange} />
                    <button className={`options text-center ${isSorting ? 'invisible' : ''}`} onClick={generateSamples}>Generate</button>
                    <button className={`options text-center ${isSorting ? 'invisible' : ''}`} onClick={shuffle}>Shuffle</button>
                </div>
                <div>
                    <button id="play-btn" className={`options text-center ${isSorting ? 'invisible' : ''}`} onClick={start}>start</button>
                    <button id="stop-btn" className={`options text-center ${isSorting ? '' : 'invisible'}`}>Stop</button>
                </div>
            </div>
        </div>
    )
}