import React, {FC} from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return ( 
        <div className='lost'>
            <h3>{title}</h3>
            {figures.map(figure => 
                <div key={figure.id}>
                    {figure.name} {figure.img && <img width={30} height={30} src={figure.img}/>}
                </div>    
            )}
        </div>
     );
}
 
export default LostFigures;