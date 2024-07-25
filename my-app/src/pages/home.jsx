import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Home() {
    return (
        <div className="w-screen h-screen  pt-20 px-20 flex flex-col bg-davy-gray">
            <div className='text-snow text-6xl flex flex-row items-center'>
                <Typewriter
                    options={{
                        strings: ['Merge', 'Quick', 'Bubble', 'Sleep', 'Miracle'],
                        autoStart: true,
                        loop: true,
                    }}
                />
                <span>Sort Visualizer</span>
            </div>
            <div className='text-snow flex flex-row items-center mt-60 text-lg space-x-4'>
                <Link to="/merge-sort" className='options text-center'>Merge</Link>
                <Link to="/quick-sort" className='options text-center'>Quick</Link>
                <Link className='options text-center'>Bubble</Link>
                <Link className='options text-center'>Miracle</Link>
            </div>
        </div>
    )
}