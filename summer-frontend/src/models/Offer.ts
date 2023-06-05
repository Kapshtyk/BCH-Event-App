interface Description {
    fi?: string;
    en?: string;
}

interface Price {
    fi?: string;
    en?: string; 
}

interface InfoUrl {
    fi?: string;
    en?: string;
}

export default interface Offer {
    is_free?: boolean;
    price?: Price;
    info_url?: InfoUrl;
    description: Description;
}