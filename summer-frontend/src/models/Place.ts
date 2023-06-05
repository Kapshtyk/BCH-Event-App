import Position from "./Position";
import Image from "./Image";

interface InfoUrl {
    fi?: string;
    se?: string;
    en?: string;
}

interface PlaceDescription {
    fi?: string;
    se?: string;
    en?: string;
}

interface Telephone {
    fi?: string;
    se?: string;
    en?: string;
}

interface StreetAddress {
    fi?: string;
    se?: string;
    en?: string;
}

interface AddressLocality {
    fi?: string;
    se?: string;
    en?: string;
}

interface PlaceName {
    fi?: string;
    se?: string;
    en?: string;
}

export default interface Place {
    id?: string;
    data_source?: string;
    publisher?: string;
    divisions?: Object;
    created_time?: string;
    last_modified_time?: string;
    custom_data?: string;
    email?: string;
    contact_type?: string;
    address_region?: string;
    postal_code?: string;
    post_office_box_num?: string;
    address_country?: string;
    deleted?: boolean;
    has_upcoming_events?: boolean;
    n_events?: number;
    image?: number;
    linkedImage?: Image;
    parent?: Object;
    replaced_by?: Object;
    position?: Position;
    description?: string;
    name?: PlaceName;
    telephone?: Telephone;
    street_address?: StreetAddress;
    info_url?: InfoUrl;
    address_locality?: AddressLocality;
    "@id": string;
    "@context"?: string;
    "@type"?: string;
}