import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ComponentData, ComponentType, isImageComponentData, isWeatherComponentData } from './app.types';
import './app.css';

import Weather from './components/Weather/Weather';
import Image from './components/Image/Image';

const App = () => {
    const { id } = useParams<{ id: string }>();
    const [components, setComponents] = useState([]);

    const fetchPageData = useCallback(async () => {
        const unparsedResult = await fetch(`http://localhost:3030/page/${id}`);
        const parsedResult = await unparsedResult.json();

        setComponents(parsedResult.data.components.filter((component: ComponentData) => {
            return component.type !== ComponentType.condition;
        }));
    }, [id]);

    useEffect(() => {
        fetchPageData();
    }, [fetchPageData])

    return (
        <div className='phone-container'>
            {components.map((component: ComponentData) => {
                if (isWeatherComponentData(component)) {
                    return <Weather 
                        key={component.id} 
                        lat={component.options.lat} 
                        lon={component.options.lon} />;
                }
                if (isImageComponentData(component)) {
                    return <Image 
                        key={component.id} 
                        src={component.options.src} 
                        alt={component.options.alt} />;
                }
                return '<div>Component type not found.</div>';
            })}
        </div>
    );
};

export default App;
