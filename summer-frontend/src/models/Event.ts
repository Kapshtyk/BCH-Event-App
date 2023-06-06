import Image from "./Image";


interface Description {
    fi?: string;
    en?: string;
}

export interface Name {
    fi?: string;
    en?: string;
}

interface InfoUrl {
    fi?: string;
    en?: string;
}

interface InLanguageName {
    fi?: string;
    en?: string;
}

interface InLanguage {
    id?: string;
    name?: InLanguageName;
}


export default interface Event {
    event: {};
    id?: string;
    in_language?: InLanguage;
    name?: Name;
    images?: Image[];
    info_url?: InfoUrl;
    start_time: string;
    end_time: string;
    description?: Description;
    created_by?: string;
    last_modified_by?: string;
    "@id": string;
    "@context"?: string;
    "@type"?: string;
}