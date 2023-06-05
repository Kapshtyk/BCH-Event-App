import ExternalLink from "./ExternalLink";
import Image from "./Image";
import Keyword from "./Keyword";
import Offer from "./Offer";
import Place from "./Place";

interface KeywordResource {
    "@id": string;
}

interface Description {
    fi?: string;
    se?: string;
    en?: string;
}

export interface Name {
    fi?: string;
    se?: string;
    en?: string;
}

interface InfoUrl {
    fi?: string;
    se?: string;
    en?: string;
}

interface InLanguageName {
    fi?: string;
    se?: string;
    en?: string;
}

interface InLanguage {
    id?: string;
    name?: InLanguageName;
}

interface ExtensionCourse {
    enrolment_start_time?: string;
    enrolment_end_time?: string;
    maximum_attendee_capacity?: number;
    minimum_attendee_capacity?: number;
    remaining_attendee_capacity?: number;
}

interface PlaceResource {
    "@id": string
}

interface Provider {
    fi?: string;
    en?: string;
}

export default interface Event {
    event: {};
    id?: string;
    location: PlaceResource;
    linkedLocation?: Place;
    keywords?: KeywordResource[];
    linkedKeywords?: Keyword[];
    in_language?: InLanguage;
    super_event?: string;
    super_event_type?: string;
    event_status?: string;
    publication_status?: string;
    name?: Name;
    images?: Image[];
    info_url?: InfoUrl;
    start_time: string;
    end_time: string;
    description?: Description;
    short_description?: Description;
    audience?: KeywordResource[];
    data_source?: string;
    created_by?: string;
    last_modified_by?: string;
    publisher?: string;
    deleted?: boolean;
    replaced_by?: Object;
    extension_course?: ExtensionCourse;
    offers?: Offer[];
    external_links?: ExternalLink[];
    provider?: Provider;
    "@id": string;
    "@context"?: string;
    "@type"?: string;
}