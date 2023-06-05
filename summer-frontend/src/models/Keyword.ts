import Image from "./Image";

interface Name {
    fi?: string;
    se?: string;
    en?: string;
}

export default interface Keyword {
    id: string;
    name: Name;
    image?: Image;
    images?: Image[];
    origin_id?: string;
    publisher?: string;
    created_time?: string;
    last_modified_time?: string;
    aggregate?: boolean;
    data_source: string;
    created_by?: string;
    last_modified_by?: string;
    alt_labels?: string[];
    deprecated?: boolean;
    replaced_by?: Object;
    "@id": string;
    "@context": string;
    "@type": string;
}