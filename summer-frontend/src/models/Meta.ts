export default interface Meta {
    count: number;
    next?: string;
    previous?: string;
    // Property not part of the API model,
    // but added to hold the url for current page of events
    current?: string;
}