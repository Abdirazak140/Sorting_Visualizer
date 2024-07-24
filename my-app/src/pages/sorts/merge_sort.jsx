import { useState } from "react"
import Bar from "../../components/bar"

export default function MergeSort() {
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

    async function mergeSort(array = samples) {
        if (array.length <= 1) {
            return array;
        }

        const middleIndex = Math.floor(array.length / 2);
        const leftArray = array.slice(0, middleIndex);
        const rightArray = array.slice(middleIndex);

        const leftSortedArray = await mergeSort(leftArray);
        const rightSortedArray = await mergeSort(rightArray);

        return await merge(leftSortedArray, rightSortedArray);
    }

    async function merge(leftArray, rightArray) {
        let sortedArray = [];

        while (leftArray.length && rightArray.length) {
            if (leftArray[0] < rightArray[0]) {
                sortedArray.push(leftArray.shift());
            } else {
                sortedArray.push(rightArray.shift());
            }

            setSamples([...sortedArray, ...leftArray, ...rightArray]);
            await sleep(50);
        }

        return [...sortedArray, ...leftArray, ...rightArray];
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function start() {
        setIsSorting(true);
        const sortedArray = await mergeSort(samples);
        setSamples(sortedArray);
        setIsSorting(false);
    }

    return (
        <div className="w-screen h-screen pt-10 flex flex-col bg-davy-gray">
            <div className='ml-10 text-snow text-4xl flex flex-row items-center'>
                <span>Merge Sort</span>
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
                </div>
            </div>
        </div>
    )
}