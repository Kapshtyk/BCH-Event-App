export default interface Name {
    fi?: string;
    se?: string;
    en?: string;
}

export default interface Image {
    id: number;
    license?: string;
    name?: Name | string;
    publisher?: string;
    created_time: string;
    last_modified_time?: string;
    created_by?: string;
    last_modified_by?: string;
    url: string;
    cropping?: string;
    photographer_name?: string;
    alt_text?: string;
    data_source?: string;
    "@id": string;
    "@context": string;
    "@type": string;
}