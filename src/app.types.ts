import { ReactNode } from "react";

export enum ComponentType {
    weather = 'weather',
    image = 'image',
    button = 'button',
    condition = 'condition',
}

export type ComponentData = WeatherComponentData 
    | ImageComponentData
    | ButtonComponentData;

interface BaseComponentData {
    id: string;
    type: ComponentType;
}

export interface WeatherComponentData extends BaseComponentData {
    options: WeatherComponentOptions,
}

export interface WeatherComponentOptions {
    lat: string,
    lon: string,
}

export interface ImageComponentData extends BaseComponentData {
    options: ImageComponentOptions,
}

export interface ImageComponentOptions {
    src: string,
    alt: string,
}

export interface ButtonComponentData extends BaseComponentData {
    options: ButtonComponentOptions,
}

export interface ButtonComponentOptions {
    text: string,
    value: string,
    variable: string,
}

export function isWeatherComponentData (componentData: ComponentData): componentData is WeatherComponentData {
    return componentData.type === ComponentType.weather;
}

export function isImageComponentData (componentData: ComponentData): componentData is ImageComponentData {
    return componentData.type === ComponentType.image;
}

export function isButtonComponentData (componentData: ComponentData): componentData is ButtonComponentData {
    return componentData.type === ComponentType.button;
}

export type BaseProps = { 
    children?: ReactNode | undefined 
}