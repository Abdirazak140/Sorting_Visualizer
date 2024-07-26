import { useEffect, useState } from "react"
import Bar from "../../components/bar"

export default function MergeSort() {
    const [newSampleSize, setNewSampleSize] = useState(100)
    const [currentSampleSize, setCurrentSampleSize] = useState(100)
    const [samples, setSamples] = useState(Array.from(Array(100).keys()).map((value) => value + 1))
    const [isSorting, setIsSorting] = useState(false);
    const [stack, setStack] = useState([])

    async function generateSamples() {
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

        return merge(leftSortedArray, rightSortedArray);
    }

    async function merge(leftArray, rightArray) {
        let sortedArray = [];
        let unsortedArray = [];

        setStack((prevStack) => {
            if (prevStack.length > 0) {
                for (let i = 0; i < prevStack.length; i++) {
                    if (prevStack[i].includes(leftArray[0]) || prevStack[i].includes(rightArray[0])) {
                        prevStack.splice(i, 1); 
                        i--;
                    }
                }
            }
            return prevStack;
        });

        while (leftArray.length && rightArray.length) {
            if (leftArray[0] < rightArray[0]) {
                sortedArray.push(leftArray.shift());
            } else {
                sortedArray.push(rightArray.shift());
            }

            unsortedArray = samples
            unsortedArray = unsortedArray.filter(element => ![...sortedArray, ...leftArray, ...rightArray].includes(element))
            setSamples([...sortedArray, ...leftArray, ...rightArray, ...unsortedArray]);

            await sleep(10);
        }

        setStack((prevStack) => [...prevStack, [...sortedArray, ...leftArray, ...rightArray]])

        await sleep(10);
        return [...sortedArray, ...leftArray, ...rightArray];
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // useEffect(() => {
    //     console.log(stack)
    // }, [stack])

    async function start() {
        setStack([])
        setIsSorting(true);
        console.log(samples)
        const sortedArray = await mergeSort();
        setSamples(sortedArray);
        setStack([])
        setIsSorting(false);
    }

    return (
        <div className="w-screen h-screen pt-10 flex flex-col bg-davy-gray">
            <div className='ml-10 text-snow text-4xl flex flex-row items-center'>
                <span>Merge Sort</span>
            </div>
            <div id="root" className="pl-2 pr-6 bg-davy-gray w-full h-100 mt-6 flex flex-row items-end ">
                {stack.map((array, arrayIndex) => (
                    array.map((value, index) => (
                        <Bar height={(value / currentSampleSize) * 100} />
                    ))
                ))}
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