import {FC, useState, useRef, useEffect} from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
import '../App.css';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
};

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [whiteTime, setWhiteTime] = useState(300);
    const [blackTime, setBlackTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current);
        };
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    };

    function decrementBlackTimer() {
        setBlackTime( previous => previous - 1);
    };

    function decrementWhiteTimer() {
        setWhiteTime( previous => previous - 1);
    };

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        restart();
    };

    return (
        <div>
            <div>
                <button onClick={handleRestart} className='def__button'>Рестарт</button>
            </div>
            <h2 className='def__text'>Черные - {blackTime}</h2>
            <h2 className='def__text'>Белые -  {whiteTime}</h2>
        </div>
    );
};

export default Timer;